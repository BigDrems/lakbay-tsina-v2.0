# PowerPoint sa Web - Setup Guide

## Overview

Ang application na ito ay may kakayahang mag-display ng PowerPoint presentations sa web browser gamit ang `react-pdf` library. Ang PowerPoint files ay kailangang i-convert sa PDF format muna.

## Paano Gamitin

### 1. Para sa mga User

- Pumunta sa `/presentations` page
- I-click ang presentation na gusto mong tingnan
- Gamitin ang navigation controls para mag-browse sa mga slide
- I-zoom in/out para makita ang mga detalye
- I-download ang PDF para sa offline viewing

### 2. Para sa mga Developer

#### Step 1: I-convert ang PowerPoint sa PDF

1. Buksan ang PowerPoint presentation
2. I-click ang "File" → "Save As" o "Export"
3. Piliin ang "PDF" format
4. I-save ang file

#### Step 2: I-upload ang PDF

1. I-copy ang PDF file sa `public/presentations/` folder
2. Siguraduhing tama ang file path

#### Step 3: I-update ang code

1. Buksan ang `src/pages/PresentationViewer.jsx`
2. I-update ang `samplePresentations` array:

```javascript
const samplePresentations = [
  {
    id: 1,
    title: "Ang Iyong Presentation Title",
    description: "Description ng presentation",
    pdfUrl: "/presentations/your-file.pdf",
    thumbnail: "/images/thumbnail.jpg",
    category: "Category",
  },
];
```

#### Step 4: I-test

1. I-run ang development server: `npm run dev`
2. Pumunta sa `/presentations` page
3. I-test ang presentation

## Features

### PowerPointViewer Component

- **Navigation**: Previous/Next slide buttons
- **Zoom Controls**: Zoom in/out at reset
- **Rotation**: I-rotate ang presentation
- **Download**: I-download ang PDF file
- **Responsive**: Gumagana sa mobile at desktop
- **Loading States**: Loading indicators at error handling

### Sample Presentations

Ang application ay may sample presentations na maaaring i-customize:

- Kasaysayan ng mga Dinastiya ng Tsina
- Kultura at Tradisyon ng Tsina
- Ekonomiya ng Modernong Tsina

## File Structure

```
public/
  presentations/
    chinese-dynasties.pdf
    chinese-culture.pdf
    chinese-economy.pdf
    your-presentation.pdf

src/
  components/
    PowerPointViewer.jsx    # Main viewer component
  pages/
    PresentationViewer.jsx  # Page with presentation list
```

## Technical Details

### Dependencies

- `react-pdf`: Para sa PDF rendering
- `framer-motion`: Para sa animations
- `lucide-react`: Para sa icons

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Requires JavaScript enabled

### File Size Limits

- Recommended: < 10MB per PDF
- Maximum: 50MB (depende sa browser)

## Troubleshooting

### Common Issues

1. **PDF hindi ma-load**: Siguraduhing tama ang file path
2. **Slow loading**: I-compress ang PDF file
3. **Missing images**: I-embed ang images sa PDF
4. **Font issues**: I-embed ang fonts sa PDF

### Best Practices

1. I-optimize ang PDF file size
2. Gumamit ng high-quality images
3. I-test sa iba't ibang browsers
4. I-embed ang fonts para consistent display

## Customization

### Styling

Ang PowerPointViewer component ay gumagamit ng Tailwind CSS classes na maaaring i-customize:

```javascript
// I-customize ang colors
className = "bg-blue-600"; // Change button colors
className = "text-gray-900"; // Change text colors
```

### Adding Features

Maaaring magdagdag ng features tulad ng:

- Fullscreen mode
- Slide thumbnails
- Search functionality
- Comments/annotations
- Auto-play slideshow

## Security Notes

- PDF files ay served from public folder
- Walang server-side processing
- Client-side rendering only
- I-validate ang file types sa upload

## Performance Tips

1. I-compress ang PDF files
2. I-lazy load ang presentations
3. I-use CDN para sa react-pdf worker
4. I-implement pagination para sa maraming presentations
