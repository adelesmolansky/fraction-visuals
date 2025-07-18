import React from 'react';
import ObjectParts from '../ObjectParts';
import type { ObjectCategoryEnum } from '../ObjectParts';
import { getObjectCount } from '../../utils/helpers';

interface ObjectPartsTabProps {
  isDarkMode: boolean;
}

const ObjectPartsTab: React.FC<ObjectPartsTabProps> = ({ isDarkMode }) => {
  const [objectCategory, setObjectCategory] = React.useState<ObjectCategoryEnum>('pizza');
  const [objectNum, setObjectNum] = React.useState(0);
  const [partsShaded, setPartsShaded] = React.useState(1);
  const [totalParts, setTotalParts] = React.useState<2 | 3 | 4>(2);

  const cardBgColor = isDarkMode ? '#2d2d2d' : '#f5f5f5';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#444' : '#ddd';

  // Get max object number for current category
  const maxObjectNum = getObjectCount(objectCategory);

  // Ensure objectNum is valid when category changes
  React.useEffect(() => {
    if (objectNum >= maxObjectNum) {
      setObjectNum(0);
    }
  }, [objectCategory, objectNum, maxObjectNum]);

  // Available fractions based on totalParts
  const getAvailableFractions = () => {
    const fractions = [];
    for (let i = 1; i <= totalParts; i++) {
      fractions.push({ numerator: i, denominator: totalParts });
    }
    return fractions;
  };

  const handleFractionChange = (numerator: number, denominator: number) => {
    setPartsShaded(numerator);
    setTotalParts(denominator as 2 | 3 | 4);
  };

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <h2>Object Parts Editor</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Object Category:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(['pizza', 'fruit', 'donut', 'pie'] as ObjectCategoryEnum[]).map((category) => {
              const isSelected = objectCategory === category;
              const categoryEmoji = category === 'pizza' ? '🍕' :
                                   category === 'fruit' ? '🍎' :
                                   category === 'donut' ? '🍩' :
                                   category === 'pie' ? '🥧' : '';
              
              return (
                <button
                  key={category}
                  onClick={() => setObjectCategory(category)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? '#5FAC4B' : borderColor}`,
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
                    {categoryEmoji}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    {category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Object Number:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Array.from({ length: maxObjectNum }, (_, i) => i).map(num => {
              const isSelected = objectNum === num;
              return (
                <button
                  key={num}
                  onClick={() => setObjectNum(num)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? '#5FAC4B' : borderColor}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    minWidth: '60px'
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
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Total Parts (Denominator):
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {([2, 3, 4] as const).map((parts) => {
              const isSelected = totalParts === parts;
              const label = parts === 2 ? 'Halves' : parts === 3 ? 'Thirds' : 'Quarters';
              
              return (
                <button
                  key={parts}
                  onClick={() => {
                    setTotalParts(parts);
                    // Reset numerator if it exceeds new total
                    if (partsShaded > parts) {
                      setPartsShaded(parts);
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? '#5FAC4B' : borderColor}`,
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
                  <div style={{ fontSize: '20px', marginBottom: '2px' }}>
                    {parts}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    {label}
                  </div>
                </button>
              );
            })}
          </div>
          
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Fraction:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {getAvailableFractions().map(({ numerator, denominator }) => {
              const isSelected = partsShaded === numerator && totalParts === denominator;
              const fractionLabel = numerator === 1 && denominator === 2 ? 'Half' :
                                   numerator === 2 && denominator === 2 ? 'Whole' :
                                   numerator === 1 && denominator === 3 ? 'One Third' :
                                   numerator === 2 && denominator === 3 ? 'Two Thirds' :
                                   numerator === 3 && denominator === 3 ? 'Whole' :
                                   numerator === 1 && denominator === 4 ? 'One Quarter' :
                                   numerator === 2 && denominator === 4 ? 'Half' :
                                   numerator === 3 && denominator === 4 ? 'Three Quarters' :
                                   numerator === 4 && denominator === 4 ? 'Whole' :
                                   `${numerator} out of ${denominator}`;
              
              return (
                <button
                  key={`${numerator}:${denominator}`}
                  onClick={() => handleFractionChange(numerator, denominator)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isSelected 
                      ? (isDarkMode ? '#4a4a4a' : '#e0e0e0')
                      : cardBgColor,
                    color: textColor,
                    border: `2px solid ${isSelected ? '#5FAC4B' : borderColor}`,
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
            totalParts,
            partsShaded
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
          <ObjectParts
            objectCategory={objectCategory}
            objectNum={objectNum}
            totalParts={totalParts}
            partsShaded={partsShaded}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ObjectPartsTab;