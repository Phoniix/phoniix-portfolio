# Project Images

This folder contains images for your portfolio projects.

## How to Add Project Images

1. Place your project images in this folder (e.g., `ecommerce.jpg`, `taskmanager.jpg`)
2. Update the `imageUrl` field in `/data/projects.json` to reference your image:
   ```json
   "imageUrl": "/images/projects/your-image.jpg"
   ```

## Supported Image Formats

- JPG/JPEG
- PNG
- WebP
- GIF
- SVG

## Recommended Image Specifications

- **Dimensions**: 800x600px or 1200x900px (4:3 aspect ratio)
- **File Size**: Less than 500KB for optimal loading
- **Format**: JPG for photos, PNG for graphics with transparency

## Image Placeholders

If no image is provided, a placeholder emoji (🚀) will be displayed automatically.

## Example Structure

```
projects/
├── ecommerce.jpg
├── taskmanager.jpg
├── portfolio.jpg
├── auth.jpg
├── analytics.jpg
└── social.jpg
```

