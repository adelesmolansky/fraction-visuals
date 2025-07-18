import React from 'react';
import ShapeIcon from '../ShapeIcon';
import type { ShapeType, GameColors } from '../ShapeIcon';
import { getShapeCount } from '../../utils/helpers';

interface ShapeVisualsTabProps {
  isDarkMode: boolean;
}

const ShapeVisualsTab: React.FC<ShapeVisualsTabProps> = ({ isDarkMode }) => {
  const [shapeName, setShapeName] = React.useState<ShapeType>('rectangle');
  const [totalParts, setTotalParts] = React.useState<2 | 3 | 4 | 5>(2);
  const [shapeNum, setShapeNum] = React.useState(1);
  const [isEqualSplit, setIsEqualSplit] = React.useState(true);
  const [color, setColor] = React.useState<GameColors>('#5FAC4B');

  const cardBgColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#444' : '#ddd';

  // Get available totalParts options for current shape
  const getAvailableParts = (): number[] => {
    switch (shapeName) {
      case 'rhombus':
        return [2, 5];
      case 'hexagon':
        return [2]; // Only halves available for hexagon
      default:
        return [2, 3, 4];
    }
  };

  // Get max shape number based on actual files
  const getMaxShapeNum = () => {
    return getShapeCount(shapeName, totalParts, isEqualSplit);
  };

  // Reset shape number when changing other props
  const handleShapeChange = (newShape: ShapeType) => {
    setShapeName(newShape);
    let availableParts: number[];
    switch (newShape) {
      case 'rhombus':
        availableParts = [2, 5];
        break;
      case 'hexagon':
        availableParts = [2];
        break;
      default:
        availableParts = [2, 3, 4];
    }
    if (!availableParts.includes(totalParts)) {
      setTotalParts(availableParts[0] as 2 | 3 | 4 | 5);
    }
    setShapeNum(1);
  };

  const handleTotalPartsChange = (newParts: number) => {
    setTotalParts(newParts as 2 | 3 | 4 | 5);
    setShapeNum(1);
  };

  const handleSplitChange = (newSplit: boolean) => {
    setIsEqualSplit(newSplit);
    setShapeNum(1);
  };

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <h2>Props Editor</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Shape:
          </label>
          <select 
            value={shapeName} 
            onChange={(e) => handleShapeChange(e.target.value as ShapeType)}
            style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
          >
            <option value="circle">Circle</option>
            <option value="hexagon">Hexagon</option>
            <option value="rectangle">Rectangle</option>
            <option value="rhombus">Rhombus</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Total Parts (Denominator):
          </label>
          <select 
            value={totalParts} 
            onChange={(e) => handleTotalPartsChange(Number(e.target.value))}
            style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
          >
            {getAvailableParts().map(parts => (
              <option key={parts} value={parts}>
                {parts === 2 ? 'Halves' : parts === 3 ? 'Thirds' : parts === 4 ? 'Quarters' : 'Fifths'} ({parts})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Equal Split:
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={isEqualSplit}
              onChange={(e) => handleSplitChange(e.target.checked)}
            />
            {isEqualSplit ? 'Equal' : 'Not Equal'}
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Shape Number (Index): {getMaxShapeNum() === 0 ? '(No shapes available)' : ''}
          </label>
          <select 
            value={shapeNum} 
            onChange={(e) => setShapeNum(Number(e.target.value))}
            style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
            disabled={getMaxShapeNum() === 0}
          >
            {getMaxShapeNum() === 0 ? (
              <option value={1}>No shapes available</option>
            ) : (
              Array.from({ length: getMaxShapeNum() }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>Shape {num}</option>
              ))
            )}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Color:
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '50px', height: '40px' }}
            />
            <input 
              type="text" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
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
            shapeName,
            totalParts,
            shapeNum,
            isEqualSplit,
            color
          }, null, 2)}</pre>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Preview</h2>
        <div style={{ 
          border: `2px dashed ${borderColor}`, 
          borderRadius: '8px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
          backgroundColor: isDarkMode ? '#2a2a2a' : '#fafafa'
        }}>
          {getMaxShapeNum() > 0 ? (
            <ShapeIcon
              shapeName={shapeName}
              totalParts={totalParts}
              shapeNum={shapeNum}
              isEqualSplit={isEqualSplit}
              color={color}
            />
          ) : (
            <div style={{ color: '#666', textAlign: 'center' }}>
              No shapes available for this combination
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShapeVisualsTab;