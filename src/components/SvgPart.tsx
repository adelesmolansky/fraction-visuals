import React, { useMemo } from 'react';
import { processSvg } from '../utils/svgProcessing';
import type { GameColors } from './ShapeIcon';

interface SvgPartProps {
  rawSvg: string;
  color: GameColors;
  darkMode: boolean;
  title: string;
  description?: string;
  index: number;
}

const SvgPart: React.FC<SvgPartProps> = React.memo(({ 
  rawSvg, 
  color, 
  darkMode, 
  title, 
  description
}) => {
  const processedSvgString = useMemo(() => {
    if (!rawSvg) return '';
    
    return processSvg(rawSvg, {
      colorMap: { userColor: color },
      darkMode,
      title,
      description
    });
  }, [rawSvg, color, darkMode, title, description]);

  if (!processedSvgString) {
    return null;
  }

  return (
    <div
      style={{
        width: '150px',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
        borderRadius: '8px',
        backgroundColor: darkMode ? '#1a1a1a' : '#fff',
        padding: '15px',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="shape-part-container"
        style={{
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
        dangerouslySetInnerHTML={{ __html: processedSvgString }}
      />
    </div>
  );
});

SvgPart.displayName = 'SvgPart';

export default SvgPart;