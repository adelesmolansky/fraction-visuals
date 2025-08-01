import React from 'react';
import ShapeParts from '../ShapeParts';
import type { ShapePartType } from '../ShapeParts';
import type { GameColors } from '../ShapeIcon';
import { getAvailableFractions } from '../../utils/helpers';

interface ShapePartsTabProps {
  isDarkMode: boolean;
}

const ShapePartsTab: React.FC<ShapePartsTabProps> = ({ isDarkMode }) => {
  const [shapePartName, setShapePartName] = React.useState<ShapePartType>('circle');
  const [shapePartTotal, setShapePartTotal] = React.useState(2);
  const [shapePartShaded, setShapePartShaded] = React.useState(1);
  const [shapePartColor, setShapePartColor] = React.useState<GameColors>('#5FAC4B');

  const cardBgColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#444' : '#ddd';

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <h2>Shape Parts Editor</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Shape:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(['circle', 'diamond', 'hexagon', 'rectangle', 'rhombus', 'square', 'triangle'] as ShapePartType[]).map((shape) => {
              const isSelected = shapePartName === shape;
              const shapeEmoji = shape === 'circle' ? '○' :
                                shape === 'diamond' ? '◇' :
                                shape === 'hexagon' ? '⬡' :
                                shape === 'rectangle' ? '▭' :
                                shape === 'rhombus' ? '◊' :
                                shape === 'square' ? '□' :
                                shape === 'triangle' ? '△' : '';
              
              return (
                <button
                  key={shape}
                  onClick={() => setShapePartName(shape)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? shapePartColor : borderColor}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    minWidth: '100px',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#3a3a3a' : '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = cardBgColor;
                    }
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '2px' }}>
                    {shapeEmoji}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    {shape}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Fraction:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {getAvailableFractions(shapePartName).map(({ numerator, denominator }) => {
              const isSelected = shapePartShaded === numerator && shapePartTotal === denominator;
              const fractionLabel = numerator === 1 && denominator === 2 ? 'Half' :
                                   numerator === 1 && denominator === 3 ? 'One Third' :
                                   numerator === 2 && denominator === 3 ? 'Two Thirds' :
                                   numerator === 1 && denominator === 4 ? 'One Quarter' :
                                   numerator === 2 && denominator === 4 ? 'Half' :
                                   numerator === 3 && denominator === 4 ? 'Three Quarters' :
                                   numerator === denominator ? 'Whole' :
                                   `${numerator} out of ${denominator}`;
              
              return (
                <button
                  key={`${numerator}:${denominator}`}
                  onClick={() => {
                    setShapePartShaded(numerator);
                    setShapePartTotal(denominator);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? shapePartColor : borderColor}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    minWidth: '100px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#3a3a3a' : '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = cardBgColor;
                    }
                  }}
                >
                  <div style={{ fontSize: '16px', marginBottom: '2px' }}>
                    {numerator}/{denominator}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {fractionLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Color:
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              value={shapePartColor}
              onChange={(e) => setShapePartColor(e.target.value)}
              style={{ width: '50px', height: '40px' }}
            />
            <input 
              type="text" 
              value={shapePartColor}
              onChange={(e) => setShapePartColor(e.target.value)}
              style={{ padding: '8px', flex: 1, backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
            />
          </div>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#2d2d2d', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#ffffff'
        }}>
          <strong style={{ color: '#ffffff' }}>Props:</strong>
          <pre style={{ margin: '10px 0 0 0', color: '#ffffff' }}>{JSON.stringify({
            shapeName: shapePartName,
            totalParts: shapePartTotal,
            partsShaded: shapePartShaded,
            color: shapePartColor
          }, null, 2)}</pre>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Preview</h2>
        <div style={{ 
          border: `2px dashed ${borderColor}`, 
          borderRadius: '8px',
          padding: '40px',
          minHeight: '300px',
          backgroundColor: isDarkMode ? '#2a2a2a' : '#fafafa'
        }}>
          <ShapeParts
            shapeName={shapePartName}
            totalParts={shapePartTotal}
            partsShaded={shapePartShaded}
            color={shapePartColor}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ShapePartsTab;