import React, { useEffect, useState } from 'react';

export type ObjectCategoryEnum = 'pizza' | 'fruit' | 'donut' | 'pie';

export interface ObjectSplitProps {
  objectCategory: ObjectCategoryEnum;
  objectNum: number;
  totalParts: 2 | 3 | 4;
  isDarkMode?: boolean;
}

// Import PNG files as URLs
const objectImages = import.meta.glob('/src/assets/fraction_objects/**/*.png', {
  as: 'url',
  eager: false
});

const ObjectSplit: React.FC<ObjectSplitProps> = ({
  objectCategory,
  objectNum,
  totalParts,
  isDarkMode = false
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Get the image path
  const getImagePath = () => {
    return `/src/assets/fraction_objects/${objectCategory}/${objectNum}.png`;
  };

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(false);
      
      const imagePath = getImagePath();
      const loader = objectImages[imagePath];
      
      if (!loader) {
        console.error(`Image not found: ${imagePath}`);
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const url = await loader() as string;
        setImageUrl(url);
      } catch (err) {
        console.error('Error loading image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [objectCategory, objectNum]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Image not found</div>;
  if (!imageUrl) return null;

  // SVG overlay for split lines
  const renderSplitOverlay = () => {
    const strokeColor = isDarkMode ? '#000000' : '#FFFFFF';
    const strokeWidth = 4;
    
    switch (totalParts) {
      case 2:
        // Vertical line for halves
        return (
          <svg 
            className="split-overlay" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <line 
              x1="50" 
              y1="0" 
              x2="50" 
              y2="100" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
          </svg>
        );
        
      case 3:
        // Three equal parts - lines at 120° angles from center
        return (
          <svg 
            className="split-overlay" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <line 
              x1="50" 
              y1="50" 
              x2="50" 
              y2="0" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
            <line 
              x1="50" 
              y1="50" 
              x2="93.3" 
              y2="75" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
            <line 
              x1="50" 
              y1="50" 
              x2="6.7" 
              y2="75" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
          </svg>
        );
        
      case 4:
        // Cross for quarters
        return (
          <svg 
            className="split-overlay" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <line 
              x1="50" 
              y1="0" 
              x2="50" 
              y2="100" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
            <line 
              x1="0" 
              y1="50" 
              x2="100" 
              y2="50" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
            />
          </svg>
        );
        
      default:
        return null;
    }
  };

  return (
    <div 
      className="object-split-container"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: '300px'
      }}
    >
      <img 
        src={imageUrl} 
        alt={`${objectCategory} ${objectNum}`}
        style={{ 
          width: '100%', 
          height: 'auto',
          display: 'block',
          borderRadius: '50%' // Make objects circular
        }}
      />
      {renderSplitOverlay()}
    </div>
  );
};

// Helper function to get available object count for a category
export const getObjectCount = (category: ObjectCategoryEnum): number => {
  const basePath = `/src/assets/fraction_objects/${category}/`;
  
  const matchingPaths = Object.keys(objectImages).filter(path => 
    path.startsWith(basePath) && path.endsWith('.png')
  );
  
  return matchingPaths.length;
};

export default ObjectSplit;