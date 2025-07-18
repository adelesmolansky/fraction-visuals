import React from "react";
import { useDynamicSVG } from "../hooks/useDynamicSVG";
import SvgPart from "./SvgPart";
import SvgErrorBoundary from "./SvgErrorBoundary";
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
  isDarkMode?: boolean;
}

const ShapeParts: React.FC<ShapePartsProps> = ({
  shapeName,
  totalParts,
  partsShaded,
  color = "#5FAC4B",
  isDarkMode = false,
}) => {
  const { svgContents, isLoading, error } = useDynamicSVG(
    shapeName,
    partsShaded,
    totalParts
  );

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        color: isDarkMode ? '#999' : '#666'
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
        color: isDarkMode ? '#999' : '#666',
        textAlign: 'center'
      }}>
        <div>
          <p style={{ margin: '0 0 10px 0' }}>No shape parts available for:</p>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {shapeName} - {partsShaded}/{totalParts}
          </p>
          {error && (
            <p style={{ margin: '10px 0 0 0', fontSize: '0.9em', color: '#e74c3c' }}>
              {error.message}
            </p>
          )}
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
        {svgContents.map((svgContent, index) => (
          <SvgErrorBoundary
            key={index}
            fallback={
              <div style={{
                width: '150px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                borderRadius: '8px',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                color: isDarkMode ? '#999' : '#666',
                padding: '15px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0 }}>⚠️</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.8em' }}>
                    Display Error
                  </p>
                </div>
              </div>
            }
          >
            <SvgPart
              rawSvg={svgContent}
              color={color}
              darkMode={isDarkMode}
              title={`Part ${index + 1} of ${partsShaded}/${totalParts} ${shapeName}`}
              description={`Visual representation of fraction ${partsShaded}/${totalParts} using a ${shapeName} shape`}
              index={index}
            />
          </SvgErrorBoundary>
        ))}
      </div>
    </>
  );
};

export default ShapeParts;