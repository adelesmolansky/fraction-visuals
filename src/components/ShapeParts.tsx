import React, { useEffect, useState } from "react";
import type { GameColors } from "./ShapeIcon";

export type ShapePartType = 
  | "circle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "rhombus"
  | "square"
  | "triangle";

export interface ShapePartsProps {
  shapeName: ShapePartType;
  totalParts: number; // denominators: halves, thirds, quarters
  partsShaded: number; // numerator
  color?: GameColors;
}

// Import SVG files as raw content
const svgModules = import.meta.glob("/src/assets/shape_parts/**/*.svg", {
  query: '?raw',
  import: 'default',
  eager: false,
});

const ShapeParts: React.FC<ShapePartsProps> = ({
  shapeName,
  totalParts,
  partsShaded,
  color = "#5FAC4B",
}) => {
  const [svgContents, setSvgContents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSVGs = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const fractionPath = `${partsShaded}:${totalParts}`;
        const basePath = `/src/assets/shape_parts/${shapeName}/${fractionPath}/`;
        
        // Find all SVG files in this directory
        const matchingPaths = Object.keys(svgModules)
          .filter(path => path.startsWith(basePath) && path.endsWith(".svg"))
          .sort(); // Sort for consistent ordering
        
        if (matchingPaths.length === 0) {
          setError(true);
          setSvgContents([]);
          return;
        }
        
        // Load all SVGs for this fraction
        const loadedSVGs = await Promise.all(
          matchingPaths.map(async (path) => {
            const loader = svgModules[path];
            if (loader) {
              const rawContent = await loader();
              
              // Cast to string since we know it's imported as raw
              let content = rawContent as string;
              
              // Ensure content is actually a string
              if (typeof content !== 'string') {
                console.error('SVG content is not a string:', typeof content, content);
                return "";
              }
              
              // Replace the fill color in the SVG - handle both single and double quotes
              // Only replace hex colors, not "none" or "black" (for outlines)
              content = content.replace(/fill=["']#[0-9A-Fa-f]{6}["']/gi, `fill="${color}"`);
              
              // Also handle fill with spaces around equals sign
              content = content.replace(/fill\s*=\s*["']#[0-9A-Fa-f]{6}["']/gi, `fill="${color}"`);
              
              // Normalize SVG size by removing width/height and keeping only viewBox
              // This allows CSS to control the size uniformly
              content = content.replace(/width="[^"]*"/g, '');
              content = content.replace(/height="[^"]*"/g, '');
              
              // Ensure viewBox is present for proper scaling
              if (!content.includes('viewBox')) {
                // If no viewBox, try to extract from width/height (shouldn't happen with these files)
                const widthMatch = content.match(/width="(\d+)"/);
                const heightMatch = content.match(/height="(\d+)"/);
                if (widthMatch && heightMatch) {
                  content = content.replace('<svg', `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`);
                }
              }
              
              return content;
            }
            return "";
          })
        );
        
        setSvgContents(loadedSVGs.filter(svg => svg !== ""));
      } catch (err) {
        console.error("Error loading SVGs:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSVGs();
  }, [shapeName, totalParts, partsShaded, color]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        color: '#666'
      }}>
        Loading shape parts...
      </div>
    );
  }

  if (error || svgContents.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        color: '#666',
        textAlign: 'center'
      }}>
        <div>
          <p>No shape parts available for:</p>
          <p>{shapeName} - {partsShaded}/{totalParts}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          .shape-part-container svg {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
      {svgContents.map((svgContent, index) => {
        // Add preserveAspectRatio to maintain shape proportions while fitting in container
        let styledSvg = svgContent.replace(
          '<svg',
          '<svg preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; display: block; max-width: 100%; max-height: 100%;"'
        );
        
        // Also ensure viewBox attribute exists (should already be there)
        if (!styledSvg.includes('preserveAspectRatio')) {
          styledSvg = styledSvg.replace(
            'viewBox=',
            'preserveAspectRatio="xMidYMid meet" viewBox='
          );
        }
        
        return (
          <div
            key={index}
            style={{
              width: '150px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              padding: '15px',
              position: 'relative',
              boxSizing: 'border-box'
            }}
          >
            <div
              className="shape-part-container"
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              dangerouslySetInnerHTML={{ __html: styledSvg }}
            />
          </div>
        );
      })}
    </div>
    </>
  );
};

export default ShapeParts;