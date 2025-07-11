import { useState } from 'react'
import './App.css'
import ShapeIcon, { getShapeCount } from './components/ShapeIcon'
import type { ShapeType } from './components/ShapeIcon'
import ObjectSplit, { getObjectCount } from './components/ObjectSplit'
import type { ObjectCategoryEnum } from './components/ObjectSplit'

type TabType = 'shapes' | 'objects';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('shapes');
  
  // Shape state
  const [shapeName, setShapeName] = useState<ShapeType>('rectangle')
  const [totalParts, setTotalParts] = useState<2 | 3 | 4 | 5>(2)
  const [shapeNum, setShapeNum] = useState(1)
  const [isEqualSplit, setIsEqualSplit] = useState(true)
  const [color, setColor] = useState('#5FAC4B')
  
  // Object state
  const [objectCategory, setObjectCategory] = useState<ObjectCategoryEnum>('pizza')
  const [objectNum, setObjectNum] = useState(0)
  const [objectTotalParts, setObjectTotalParts] = useState<2 | 3 | 4>(2)

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

  // Get max object number
  const getMaxObjectNum = () => {
    return getObjectCount(objectCategory);
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

  const handleObjectCategoryChange = (newCategory: ObjectCategoryEnum) => {
    setObjectCategory(newCategory);
    setObjectNum(0);
  };

  const bgColor = isDarkMode ? '#1a1a1a' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardBgColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const borderColor = isDarkMode ? '#444' : '#ddd';

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui',
      backgroundColor: bgColor,
      color: textColor,
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Fraction Visuals</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            backgroundColor: cardBgColor,
            color: textColor,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('shapes')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            borderRadius: '8px 8px 0 0',
            border: `1px solid ${borderColor}`,
            borderBottom: activeTab === 'shapes' ? 'none' : `1px solid ${borderColor}`,
            backgroundColor: activeTab === 'shapes' ? cardBgColor : 'transparent',
            color: textColor,
            cursor: 'pointer',
            fontWeight: activeTab === 'shapes' ? 'bold' : 'normal'
          }}
        >
          Shape Visuals
        </button>
        <button
          onClick={() => setActiveTab('objects')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px 8px 0 0',
            border: `1px solid ${borderColor}`,
            borderBottom: activeTab === 'objects' ? 'none' : `1px solid ${borderColor}`,
            backgroundColor: activeTab === 'objects' ? cardBgColor : 'transparent',
            color: textColor,
            cursor: 'pointer',
            fontWeight: activeTab === 'objects' ? 'bold' : 'normal'
          }}
        >
          Object Splits
        </button>
      </div>
      
      {activeTab === 'shapes' ? (
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
      ) : (
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <h2>Object Split Editor</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Object Category:
              </label>
              <select 
                value={objectCategory} 
                onChange={(e) => handleObjectCategoryChange(e.target.value as ObjectCategoryEnum)}
                style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
              >
                <option value="pizza">Pizza</option>
                <option value="fruit">Fruit</option>
                <option value="donut">Donut</option>
                <option value="pie">Pie</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Object Number:
              </label>
              <select 
                value={objectNum} 
                onChange={(e) => setObjectNum(Number(e.target.value))}
                style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
              >
                {Array.from({ length: getMaxObjectNum() }, (_, i) => i).map(num => (
                  <option key={num} value={num}>Object {num}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Total Parts:
              </label>
              <select 
                value={objectTotalParts} 
                onChange={(e) => setObjectTotalParts(Number(e.target.value) as 2 | 3 | 4)}
                style={{ padding: '8px', width: '100%', backgroundColor: cardBgColor, color: textColor, border: `1px solid ${borderColor}` }}
              >
                <option value={2}>Halves (2)</option>
                <option value={3}>Thirds (3)</option>
                <option value={4}>Quarters (4)</option>
              </select>
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
                objectCategory,
                objectNum,
                totalParts: objectTotalParts
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
              <strong style={{ color: '#333' }}>Available objects:</strong> {getMaxObjectNum()}
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
              <ObjectSplit
                objectCategory={objectCategory}
                objectNum={objectNum}
                totalParts={objectTotalParts}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App