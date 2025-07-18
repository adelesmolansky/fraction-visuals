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
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Shape:
          </label>
          <select 
            value={shapePartName} 
            onChange={(e) => setShapePartName(e.target.value as ShapePartType)}
            style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
          >
            <option value="circle">Circle</option>
            <option value="diamond">Diamond</option>
            <option value="hexagon">Hexagon</option>
            <option value="rectangle">Rectangle</option>
            <option value="rhombus">Rhombus</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Fraction:
          </label>
          <select 
            value={`${shapePartShaded}:${shapePartTotal}`} 
            onChange={(e) => {
              const [num, den] = e.target.value.split(':').map(Number);
              setShapePartShaded(num);
              setShapePartTotal(den);
            }}
            style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
          >
            {getAvailableFractions(shapePartName).map(({ numerator, denominator }) => (
              <option key={`${numerator}:${denominator}`} value={`${numerator}:${denominator}`}>
                {numerator}/{denominator} - 
                {numerator === 1 && denominator === 2 ? ' Half' :
                 numerator === 1 && denominator === 3 ? ' One Third' :
                 numerator === 2 && denominator === 3 ? ' Two Thirds' :
                 numerator === 1 && denominator === 4 ? ' One Quarter' :
                 numerator === 2 && denominator === 4 ? ' Half' :
                 numerator === 3 && denominator === 4 ? ' Three Quarters' :
                 numerator === denominator ? ' Whole' :
                 ` ${numerator} out of ${denominator}`}
              </option>
            ))}
          </select>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ShapePartsTab;