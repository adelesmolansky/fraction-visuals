import React, { useEffect, useState } from "react";

export type GameColors = string;
export type ShapeType =
  | "circle"
  | "hexagon"
  | "rectangle"
  | "rhombus"
  | "square"
  | "triangle";

interface ShapeIconProps {
  shapeName: ShapeType;
  totalParts: 2 | 3 | 4 | 5;
  shapeNum: number;
  isEqualSplit?: boolean;
  color?: GameColors;
}

// Import SVG files as raw content
const svgModules = import.meta.glob("/src/assets/shapes/**/*.svg", {
  as: "raw",
  eager: false,
});

const ShapeIcon: React.FC<ShapeIconProps> = ({
  shapeName,
  totalParts,
  shapeNum,
  isEqualSplit = true,
  color = "#5FAC4B",
}) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const splitType = isEqualSplit ? "equal" : "not_equal";
  const fractionPath = `1:${totalParts}`;

  // Get all possible image paths for this shape/split/fraction combination
  const getImagePath = () => {
    const basePath = `/src/assets/shapes/${shapeName}/${splitType}/${fractionPath}/`;

    // Find all SVG files in this directory
    const matchingPaths = Object.keys(svgModules).filter(
      (path) => path.startsWith(basePath) && path.endsWith(".svg")
    );

    // Sort paths to ensure consistent ordering
    matchingPaths.sort();

    // Return the nth image (shapeNum is 1-indexed)
    if (shapeNum > 0 && shapeNum <= matchingPaths.length) {
      return matchingPaths[shapeNum - 1];
    }

    return null;
  };

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(false);

      const imagePath = getImagePath();

      if (!imagePath) {
        console.error(
          `Image not found for: ${shapeName}/${splitType}/${fractionPath}/${shapeNum}`
        );
        setError(true);
        setLoading(false);
        return;
      }

      try {
        // Load SVG as raw content
        const loader = svgModules[imagePath];
        if (!loader) {
          throw new Error(`SVG loader not found: ${imagePath}`);
        }
        const rawSvg = (await loader()) as string;
        const coloredSvg = rawSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
        setContent(coloredSvg);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [shapeName, splitType, fractionPath, shapeNum, color]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Image not found</div>;
  if (!content) return null;

  return (
    <div className="shape-icon" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

// Helper function to get available image count for a shape/split/fraction combination
export const getShapeCount = (
  shapeName: ShapeType,
  totalParts: number,
  isEqualSplit: boolean
): number => {
  const splitType = isEqualSplit ? "equal" : "not_equal";
  const fractionPath = `1:${totalParts}`;
  const basePath = `/src/assets/shapes/${shapeName}/${splitType}/${fractionPath}/`;

  const matchingPaths = Object.keys(svgModules).filter(
    (path) => path.startsWith(basePath) && path.endsWith(".svg")
  );

  return matchingPaths.length;
};

export default ShapeIcon;
