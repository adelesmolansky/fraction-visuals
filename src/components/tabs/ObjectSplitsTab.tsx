import React from 'react';
import ObjectSplit from '../ObjectSplit';
import type { ObjectCategoryEnum } from '../ObjectSplit';
import { getObjectCount } from '../../utils/helpers';

interface ObjectSplitsTabProps {
  isDarkMode: boolean;
}

const ObjectSplitsTab: React.FC<ObjectSplitsTabProps> = ({ isDarkMode }) => {
  const [objectCategory, setObjectCategory] = React.useState<ObjectCategoryEnum>('pizza');
  const [objectNum, setObjectNum] = React.useState(0);
  const [objectTotalParts, setObjectTotalParts] = React.useState<2 | 3 | 4>(2);

  const cardBgColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#444' : '#ddd';

  // Get max object number
  const getMaxObjectNum = () => {
    return getObjectCount(objectCategory);
  };

  const handleObjectCategoryChange = (newCategory: ObjectCategoryEnum) => {
    setObjectCategory(newCategory);
    setObjectNum(0);
  };

  return (
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
          backgroundColor: isDarkMode ? '#3a3a3a' : '#e8e8e8', 
          borderRadius: '8px',
          fontSize: '12px',
          color: isDarkMode ? '#fff' : '#333',
          border: `1px solid ${borderColor}`
        }}>
          <strong style={{ color: isDarkMode ? '#fff' : '#333' }}>Available objects:</strong> {getMaxObjectNum()}
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
  );
};

export default ObjectSplitsTab;