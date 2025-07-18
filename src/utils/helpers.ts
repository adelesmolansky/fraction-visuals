import type { ObjectCategoryEnum } from "../components/ObjectSplit";
import type { ShapeType } from "../components/ShapeIcon";

// Import modules for helper functions
const objectImages = import.meta.glob("/src/assets/fraction_objects/**/*.png", {
  query: '?url',
  import: 'default',
  eager: false,
});

const svgModules = import.meta.glob("/src/assets/shapes_splits/**/*.svg", {
  query: '?raw',
  import: 'default',
  eager: false,
});

const shapePartModules = import.meta.glob("/src/assets/shape_parts/**/*.svg", {
  query: '?raw',
  import: 'default',
  eager: false,
});

// Helper function to get available object count for a category
export const getObjectCount = (category: ObjectCategoryEnum): number => {
  const basePath = `/src/assets/fraction_objects/${category}/`;

  const matchingPaths = Object.keys(objectImages).filter(
    (path) => path.startsWith(basePath) && path.endsWith(".png")
  );

  return matchingPaths.length;
};

// Helper function to get available image count for a shape/split/fraction combination
export const getShapeCount = (
  shapeName: ShapeType,
  totalParts: number,
  isEqualSplit: boolean
): number => {
  const splitType = isEqualSplit ? "equal" : "not_equal";
  const fractionPath = `1:${totalParts}`;
  const basePath = `/src/assets/shapes_splits/${shapeName}/${splitType}/${fractionPath}/`;

  const matchingPaths = Object.keys(svgModules).filter(
    (path) => path.startsWith(basePath) && path.endsWith(".svg")
  );

  return matchingPaths.length;
};

// Helper function to get available shape parts count for a shape/fraction combination
export const getShapePartsCount = (
  shapeName: string,
  numerator: number,
  denominator: number
): number => {
  const fractionPath = `${numerator}:${denominator}`;
  const basePath = `/src/assets/shape_parts/${shapeName}/${fractionPath}/`;
  
  const matchingPaths = Object.keys(shapePartModules).filter(
    (path) => path.startsWith(basePath) && path.endsWith(".svg")
  );
  
  return matchingPaths.length;
};

// Helper function to get available fractions for a shape
export const getAvailableFractions = (shapeName: string): Array<{numerator: number, denominator: number}> => {
  const basePath = `/src/assets/shape_parts/${shapeName}/`;
  
  // Get all paths that start with the shape name
  const matchingPaths = Object.keys(shapePartModules).filter(
    (path) => path.startsWith(basePath) && path.endsWith(".svg")
  );
  
  // Extract unique fractions
  const fractionSet = new Set<string>();
  matchingPaths.forEach((path) => {
    const match = path.match(/\/(\d+):(\d+)\//);
    if (match) {
      fractionSet.add(`${match[1]}:${match[2]}`);
    }
  });
  
  // Convert to array of objects and sort
  return Array.from(fractionSet)
    .map(fraction => {
      const [num, den] = fraction.split(':').map(Number);
      return { numerator: num, denominator: den };
    })
    .sort((a, b) => {
      // Sort by denominator first, then numerator
      if (a.denominator !== b.denominator) {
        return a.denominator - b.denominator;
      }
      return a.numerator - b.numerator;
    });
};
