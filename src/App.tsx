import { useState } from 'react'
import './App.css'
import ShapeIcon, { getShapeCount } from './components/ShapeIcon'
import type { ShapeType } from './components/ShapeIcon'

function App() {
  const [shapeName, setShapeName] = useState<ShapeType>('rectangle')
  const [totalParts, setTotalParts] = useState<2 | 3 | 4 | 5>(2)
  const [shapeNum, setShapeNum] = useState(1)
  const [isEqualSplit, setIsEqualSplit] = useState(true)
  const [color, setColor] = useState('#5FAC4B')

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
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Shape Icon Visualizer</h1>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Props Editor</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Shape:
            </label>
            <select 
              value={shapeName} 
              onChange={(e) => handleShapeChange(e.target.value as ShapeType)}
              style={{ padding: '8px', width: '100%' }}
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
              style={{ padding: '8px', width: '100%' }}
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
              style={{ padding: '8px', width: '100%' }}
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
                style={{ padding: '8px', flex: 1 }}
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

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#e8e8e8', 
            borderRadius: '8px',
            fontSize: '12px',
            color: '#333',
            border: '1px solid #ccc'
          }}>
            <strong style={{ color: '#333' }}>Available shapes for current selection:</strong> {getMaxShapeNum()}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Preview</h2>
          <div style={{ 
            border: '2px dashed #ccc', 
            borderRadius: '8px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            backgroundColor: '#fafafa'
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
    </div>
  )
}

export default App