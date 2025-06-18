# Presentations Folder

## Paano Magdagdag ng PowerPoint Presentations

1. **I-convert ang PowerPoint sa PDF:**

   - Buksan ang PowerPoint file
   - I-click ang "File" → "Save As" o "Export"
   - Piliin ang "PDF" format
   - I-save ang file

2. **I-upload ang PDF file:**

   - I-copy ang PDF file sa folder na ito
   - Example: `chinese-dynasties.pdf`

3. **I-update ang code:**
   - Buksan ang `src/pages/PresentationViewer.jsx`
   - I-update ang `samplePresentations` array:

```javascript
{
  id: 1,
  title: "Ang Iyong Presentation Title",
  description: "Description ng presentation",
  pdfUrl: "/presentations/your-file.pdf",
  thumbnail: "/images/thumbnail.jpg",
  category: "Category"
}
```

## Sample Files

- `chinese-dynasties.pdf` - Kasaysayan ng mga Dinastiya
- `chinese-culture.pdf` - Kultura at Tradisyon
- `chinese-economy.pdf` - Ekonomiya ng Tsina

## Tips

- I-optimize ang file size (< 10MB recommended)
- I-embed ang fonts at images
- I-test sa browser bago i-deploy
