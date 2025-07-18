import { useState, useEffect } from 'react';

// Import SVG files as raw content
const svgModules = import.meta.glob("/src/assets/shape_parts/**/*.svg", {
  query: '?raw',
  import: 'default',
  eager: false,
});

interface UseDynamicSVGReturn {
  svgContents: string[];
  isLoading: boolean;
  error: Error | null;
}

export function useDynamicSVG(
  shapeName: string,
  numerator: number,
  denominator: number
): UseDynamicSVGReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [svgContents, setSvgContents] = useState<string[]>([]);

  useEffect(() => {
    let isCancelled = false;
    
    const loadSVGs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const fractionPath = `${numerator}:${denominator}`;
        const basePath = `/src/assets/shape_parts/${shapeName}/${fractionPath}/`;
        
        // Find all SVG files in this directory
        const matchingPaths = Object.keys(svgModules)
          .filter(path => path.startsWith(basePath) && path.endsWith(".svg"))
          .sort(); // Sort for consistent ordering
        
        if (matchingPaths.length === 0) {
          throw new Error(`No SVG files found for ${shapeName} ${numerator}/${denominator}`);
        }
        
        // Load all SVGs for this fraction
        const loadedSVGs = await Promise.all(
          matchingPaths.map(async (path) => {
            const loader = svgModules[path];
            if (!loader) {
              throw new Error(`SVG loader not found for path: ${path}`);
            }
            
            try {
              const rawContent = await loader();
              
              // Ensure content is a string
              if (typeof rawContent !== 'string') {
                console.error('SVG content is not a string:', typeof rawContent, rawContent);
                throw new Error(`Invalid SVG content type for ${path}`);
              }
              
              return rawContent;
            } catch (err) {
              console.error(`Error loading SVG at ${path}:`, err);
              throw new Error(`Failed to load SVG: ${path}`);
            }
          })
        );
        
        if (!isCancelled) {
          setSvgContents(loadedSVGs);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setSvgContents([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSVGs();

    return () => {
      isCancelled = true;
    };
  }, [shapeName, numerator, denominator]);

  return { svgContents, isLoading, error };
}