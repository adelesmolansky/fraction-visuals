interface SvgProcessingOptions {
  colorMap?: Record<string, string>;
  darkMode?: boolean;
  title?: string;
  description?: string;
}

export function processSvg(rawSvg: string, options: SvgProcessingOptions = {}): string {
  const { colorMap = {}, darkMode = false, title, description } = options;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawSvg, "image/svg+xml");
  const svgElement = doc.documentElement;

  // Check for parsing errors
  if (svgElement.tagName === 'parsererror') {
    console.error('SVG parsing error:', svgElement.textContent);
    return rawSvg; // Return original if parsing fails
  }

  // Add accessibility tags
  if (title) {
    // Remove any existing title to prevent duplicates
    const existingTitle = svgElement.querySelector('title');
    if (existingTitle) existingTitle.remove();

    const titleEl = doc.createElementNS('http://www.w3.org/2000/svg', 'title');
    titleEl.textContent = title;
    
    // Give it an ID to be referenced by aria-labelledby
    const titleId = 'svg-title-' + Math.random().toString(36).substring(2, 11);
    titleEl.id = titleId;
    svgElement.prepend(titleEl);
    svgElement.setAttribute('aria-labelledby', titleId);
  }

  if (description) {
    const existingDesc = svgElement.querySelector('desc');
    if (existingDesc) existingDesc.remove();

    const descEl = doc.createElementNS('http://www.w3.org/2000/svg', 'desc');
    descEl.textContent = description;
    svgElement.appendChild(descEl);
  }

  // Query for all elements that have a fill or stroke
  const elements = svgElement.querySelectorAll('*[fill], *[stroke]');

  elements.forEach((el: Element) => {
    let fill = el.getAttribute('fill');
    const stroke = el.getAttribute('stroke');

    // 1. Dark mode transformation
    if (darkMode) {
      // Handle various representations of black
      const blackVariants = ['black', '#000', '#000000', 'rgb(0,0,0)', 'rgba(0,0,0,1)'];
      
      if (fill && blackVariants.includes(fill.toLowerCase())) {
        el.setAttribute('fill', 'white');
      }
      if (stroke && blackVariants.includes(stroke.toLowerCase())) {
        el.setAttribute('stroke', 'white');
      }
    }

    // 2. User-selected color mapping
    // Re-read attributes after potential dark mode changes
    fill = el.getAttribute('fill');
    
    if (fill && isHexColor(fill)) {
      // Apply user color to hex fills
      el.setAttribute('fill', colorMap.userColor || fill);
    } else if (fill && colorMap[fill]) {
      // Apply mapped colors for named colors
      el.setAttribute('fill', colorMap[fill]);
    }
  });

  // Ensure proper sizing attributes
  if (!svgElement.hasAttribute('viewBox')) {
    const width = svgElement.getAttribute('width');
    const height = svgElement.getAttribute('height');
    if (width && height) {
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }

  // Remove fixed dimensions to allow CSS control
  svgElement.removeAttribute('width');
  svgElement.removeAttribute('height');

  // Add preserveAspectRatio for proper scaling
  if (!svgElement.hasAttribute('preserveAspectRatio')) {
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  // Add responsive styling
  svgElement.setAttribute('style', 'width: 100%; height: 100%; display: block;');

  return new XMLSerializer().serializeToString(svgElement);
}

function isHexColor(color: string): boolean {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color);
}