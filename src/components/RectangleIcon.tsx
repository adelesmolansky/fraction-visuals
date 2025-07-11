import React, { useEffect, useState } from 'react';

export type GameColors = string;

interface RectangleIconProps {
  shapeName: 'rectangle';
  totalParts: 2 | 3 | 4;
  shapeNum: number;
  isEqualSplit?: boolean;
  color?: GameColors;
}

const svgModules = import.meta.glob('/src/assets/rectangle/**/*.svg', {
  as: 'raw',
  eager: false
});

const RectangleIcon: React.FC<RectangleIconProps> = ({
  shapeName,
  totalParts,
  shapeNum,
  isEqualSplit = true,
  color = '#5FAC4B'
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const splitType = isEqualSplit ? 'equal' : 'not_equal';
  const fractionPath = `1:${totalParts}`;
  const svgPath = `/src/assets/${shapeName}/${splitType}/${fractionPath}/${shapeNum}.svg`;

  useEffect(() => {
    const loadSvg = async () => {
      setLoading(true);
      setError(false);
      
      const loader = svgModules[svgPath];
      
      if (!loader) {
        console.error(`SVG not found: ${svgPath}`);
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const rawSvg = await loader() as string;
        const coloredSvg = rawSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
        setSvgContent(coloredSvg);
      } catch (err) {
        console.error('Error loading SVG:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSvg();
  }, [svgPath, color]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>SVG not found</div>;
  if (!svgContent) return null;

  return (
    <div 
      className="rectangle-icon"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default RectangleIcon;