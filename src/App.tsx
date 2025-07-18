import { useState } from 'react'
import './App.css'
import ShapeVisualsTab from './components/tabs/ShapeVisualsTab'
import ObjectSplitsTab from './components/tabs/ObjectSplitsTab'
import ShapePartsTab from './components/tabs/ShapePartsTab'

type TabType = 'shapes' | 'objects' | 'shapeParts';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('shapes');

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
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
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
            marginRight: '10px',
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
        <button
          onClick={() => setActiveTab('shapeParts')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px 8px 0 0',
            border: `1px solid ${borderColor}`,
            borderBottom: activeTab === 'shapeParts' ? 'none' : `1px solid ${borderColor}`,
            backgroundColor: activeTab === 'shapeParts' ? cardBgColor : 'transparent',
            color: textColor,
            cursor: 'pointer',
            fontWeight: activeTab === 'shapeParts' ? 'bold' : 'normal'
          }}
        >
          Shape Parts
        </button>
      </div>
      
      {activeTab === 'shapes' ? (
        <ShapeVisualsTab isDarkMode={isDarkMode} />
      ) : activeTab === 'objects' ? (
        <ObjectSplitsTab isDarkMode={isDarkMode} />
      ) : activeTab === 'shapeParts' ? (
        <ShapePartsTab isDarkMode={isDarkMode} />
      ) : null}
    </div>
  )
}

export default App