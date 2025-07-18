import React, { useEffect, useState } from "react";

export type ObjectCategoryEnum = "pizza" | "fruit" | "donut" | "pie";

export interface ObjectPartsProps {
  objectCategory: ObjectCategoryEnum;
  objectNum: number;
  totalParts: 2 | 3 | 4;
  partsShaded: number;
  isDarkMode?: boolean;
}

// Helper functions for SVG path generation
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const describePieSlice = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  const d = [
    "M", x, y,           // Move to center
    "L", start.x, start.y,   // Line to start of arc
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,  // Arc
    "Z"                  // Close path back to center
  ].join(" ");
  
  return d;
};

// Generate paths for fractions dynamically
const generateFractionPaths = (totalParts: number) => {
  const paths: string[] = [];
  const anglePerSlice = 360 / totalParts;
  
  for (let i = 0; i < totalParts; i++) {
    const startAngle = i * anglePerSlice;
    const endAngle = (i + 1) * anglePerSlice;
    paths.push(describePieSlice(52, 52, 48, startAngle, endAngle));
  }
  
  return paths;
};

// Import PNG files as URLs
const objectImages = import.meta.glob("/src/assets/fraction_objects/**/*.png", {
  query: '?url',
  import: 'default',
  eager: false,
});

const ObjectParts: React.FC<ObjectPartsProps> = ({
  objectCategory,
  objectNum,
  totalParts,
  partsShaded,
  isDarkMode = false,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(false);

      const imagePath = `/src/assets/fraction_objects/${objectCategory}/${objectNum}.png`;
      const loader = objectImages[imagePath];

      if (!loader) {
        console.error(`Image not found: ${imagePath}`);
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const url = await loader() as string;
        setImageUrl(url);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [objectCategory, objectNum]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        color: isDarkMode ? '#999' : '#666'
      }}>
        Loading object...
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        color: isDarkMode ? '#999' : '#666',
        textAlign: 'center'
      }}>
        <div>
          <p style={{ margin: '0 0 10px 0' }}>Object not found:</p>
          <p style={{ margin: 0, fontSize: '0.9em' }}>
            {objectCategory} - Object {objectNum}
          </p>
        </div>
      </div>
    );
  }

  // Generate unique IDs for this instance
  const clipPathId = `object-clip-${objectCategory}-${objectNum}-${totalParts}-${partsShaded}`;
  const paths = generateFractionPaths(totalParts);
  const bgColor = isDarkMode ? '#1a1a1a' : '#ffffff';

  // Generate division lines
  const renderDivisionLines = () => {
    const lines = [];
    const anglePerSlice = 360 / totalParts;
    
    for (let i = 0; i < totalParts; i++) {
      const angle = i * anglePerSlice;
      const point = polarToCartesian(52, 52, 48, angle);
      lines.push(
        <line
          key={`line-${i}`}
          x1="52"
          y1="52"
          x2={point.x}
          y2={point.y}
          stroke={isDarkMode ? '#ffffff' : '#000000'}
          strokeWidth="3"
          opacity="1"
        />
      );
    }
    
    return lines;
  };

  return (
    <div
      className="object-parts-container"
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <svg viewBox="0 0 104 104" width="100%" height="100%">
        <defs>
          {/* Define circular clip for the entire shape */}
          <clipPath id={`${clipPathId}-circle`}>
            <circle cx="52" cy="52" r="48" />
          </clipPath>
          
          {/* Define the clip path with selected segments */}
          <clipPath id={clipPathId}>
            {paths.slice(0, partsShaded).map((pathData, index) => (
              <path key={index} d={pathData} />
            ))}
          </clipPath>
        </defs>

        {/* Background circle matching the page background */}
        <circle
          cx="52"
          cy="52"
          r="48"
          fill={bgColor}
        />

        {/* Shaded parts with the object image */}
        <image
          href={imageUrl}
          x="4"
          y="4"
          width="96"
          height="96"
          clipPath={`url(#${clipPathId})`}
        />

        {/* Division lines */}
        <g style={{ pointerEvents: 'none' }}>
          {renderDivisionLines()}
        </g>

        {/* Outer circle border */}
        <circle
          cx="52"
          cy="52"
          r="48"
          fill="none"
          stroke={isDarkMode ? '#ffffff' : '#000000'}
          strokeWidth="3"
          opacity="1"
        />
      </svg>
    </div>
  );
};

export default ObjectParts;