# Fraction Visuals

An interactive React application for visualizing fractions using various geometric shapes. This tool helps educators and students understand fractions through visual representations with customizable shapes, colors, and fraction types.

## Features

- **Multiple Shape Types**: Circle, Hexagon, Rectangle, Rhombus, Square, and Triangle
- **Fraction Visualization**: Support for halves, thirds, quarters, and fifths (shape-dependent)
- **Equal and Unequal Splits**: Visualize both equal divisions and varied partition sizes
- **Dynamic SVG/PNG Loading**: Automatically loads the appropriate image format
- **Color Customization**: Change the fill color of SVG shapes in real-time
- **Interactive Editor**: Visual prop editor to experiment with different combinations

## Demo

The application provides an interactive editor where you can:
- Select different shapes from a dropdown
- Choose fraction denominators (2, 3, 4, or 5 depending on the shape)
- Toggle between equal and unequal splits
- Select specific shape variations
- Customize the color with a color picker

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/fraction-visuals.git
cd fraction-visuals
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/
│   └── shapes/         # Shape assets organized by type
│       ├── circle/
│       ├── hexagon/
│       ├── rectangle/
│       ├── rhombus/
│       ├── square/
│       └── triangle/
│           ├── equal/      # Equal split variations
│           └── not_equal/  # Unequal split variations
├── components/
│   ├── ShapeIcon.tsx   # Universal shape component
│   └── RectangleIcon.tsx   # Legacy rectangle component
├── App.tsx             # Main application with editor
└── App.css            # Styles
```

## Usage

### Using the ShapeIcon Component

```tsx
import ShapeIcon from './components/ShapeIcon';

<ShapeIcon
  shapeName="rectangle"  // Shape type
  totalParts={2}        // Denominator (2, 3, 4, or 5)
  shapeNum={1}          // Which variation to show
  isEqualSplit={true}   // Equal or unequal divisions
  color="#5FAC4B"       // Fill color for SVGs
/>
```

### Available Props

- `shapeName`: 'circle' | 'hexagon' | 'rectangle' | 'rhombus' | 'square' | 'triangle'
- `totalParts`: Number of parts (denominators vary by shape)
  - Most shapes: 2, 3, 4
  - Rhombus: 2, 5
  - Hexagon: 2 only
- `shapeNum`: Index of the shape variation (1-based)
- `isEqualSplit`: Boolean for equal/unequal divisions
- `color`: Hex color string (only applies to SVG files)

## Shape Availability

Different shapes have different numbers of variations available:

- **Equal splits**: Generally fewer variations (1-5 depending on shape and fraction)
- **Unequal splits**: More variations showing different partition possibilities (up to 11 for some combinations)

The component automatically detects available shapes and handles missing combinations gracefully.

## Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Adding New Shapes

1. Add shape assets to `src/assets/shapes/[shape-name]/`
2. Organize by split type: `equal/` and `not_equal/`
3. Create fraction folders: `1:2/`, `1:3/`, etc.
4. Add numbered SVG/PNG files: `1.svg`, `2.svg`, etc.
5. Update `ShapeType` in `ShapeIcon.tsx`
6. Update available parts logic in `App.tsx`

## Technologies Used

- React 19
- TypeScript
- Vite 7
- ESLint
- CSS for styling

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.