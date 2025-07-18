import type { ObjectCategoryEnum } from "../components/ObjectSplit";
import type { ShapeType } from "../components/ShapeIcon";

// Import modules for helper functions
const objectImages = import.meta.glob("/src/assets/fraction_objects/**/*.png", {
  as: "url",
  eager: false,
});

const svgModules = import.meta.glob("/src/assets/shapes_splits/**/*.svg", {
  as: "raw",
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
