# Team Images Optimization Guide

This directory contains optimized team member images in WebP format for efficient loading and performance.

## Image Requirements

### Format and Quality
- **Format**: WebP (with fallback to JPEG/PNG for older browsers)
- **Quality**: 70-80% for optimal balance between file size and clarity
- **Dimensions**: 300x300px (1:1 aspect ratio)
- **Color Profile**: sRGB

### File Naming Convention
Use lowercase with hyphens for team member images:
- `firstname-lastname.webp` (e.g., `sarah-mitchell.webp`, `alex-chen.webp`)

### Optimization Steps

#### 1. Convert Images to WebP

**Using PowerShell (Windows):**
```powershell
# Install ImageMagick (if not already installed)
# Download from: https://imagemagick.org/script/download.php

# Convert single image
magick convert input.jpg -resize 300x300^ -gravity center -extent 300x300 -quality 75 output.webp

# Batch convert all images in a directory
Get-ChildItem -Path . -Filter *.jpg | ForEach-Object {
    $outputName = $_.BaseName + ".webp"
    magick convert $_.FullName -resize 300x300^ -gravity center -extent 300x300 -quality 75 $outputName
}
```

**Using Node.js (sharp library):**
```bash
npm install sharp
```

```javascript
// convert-to-webp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './original-images';
const outputDir = './public/images/team';

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    const input = path.join(inputDir, file);
    const output = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    sharp(input)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile(output)
      .then(() => console.log(`✓ Converted: ${file} → ${path.basename(output)}`))
      .catch(err => console.error(`✗ Error: ${file}`, err));
  }
});
```

#### 2. Online Tools (No Installation Required)
- **Squoosh**: https://squoosh.app/
- **CloudConvert**: https://cloudconvert.com/jpg-to-webp
- **TinyPNG**: https://tinypng.com/ (then convert to WebP)

### Image Optimization Best Practices

1. **Pre-optimization**: Before converting to WebP, ensure images are properly cropped and sized
2. **Compression**: Use 70-80% quality for WebP to maintain visual quality while reducing file size
3. **Testing**: Compare file sizes and visual quality across different quality settings
4. **Fallback**: Next.js Image component automatically provides fallbacks for older browsers

### Next.js Image Component Features

The TeamSection component uses Next.js Image with:
- ✅ Automatic WebP conversion
- ✅ Lazy loading (`loading="lazy"`)
- ✅ Blur placeholder for smooth loading experience
- ✅ Responsive image sizing with `sizes` attribute
- ✅ Quality optimization (75% by default)
- ✅ Automatic format selection based on browser support

### Performance Metrics

Expected improvements with WebP optimization:
- **File size reduction**: 25-35% smaller than JPEG
- **Page load time**: 20-30% faster initial load
- **Lighthouse score**: +10-15 points improvement
- **LCP (Largest Contentful Paint)**: Improved by 0.5-1s

### Directory Structure
```
public/images/team/
├── README.md (this file)
├── sarah-mitchell.webp
├── alex-chen.webp
├── priya-sharma.webp
├── marcus-johnson.webp
├── emily-roberts.webp
├── james-park.webp
├── sofia-martinez.webp
├── liam-obrien.webp
├── aisha-khan.webp
├── ryan-thompson.webp
├── david-wilson.webp
└── yuki-tanaka.webp
```

### Adding New Team Members

When adding new team members:
1. Prepare the image (300x300px, properly cropped)
2. Convert to WebP format using one of the methods above
3. Name the file using the convention: `firstname-lastname.webp`
4. Place in `public/images/team/` directory
5. Update `src/data/teamData.ts` with the new member's information

### Troubleshooting

**Image not loading?**
- Check file path in `teamData.ts` matches the actual file name
- Ensure the image is in `public/images/team/` directory
- Verify the file extension is `.webp`

**Image quality poor?**
- Increase quality setting (try 80-85%)
- Ensure source image is high resolution before conversion

**Large file sizes?**
- Reduce quality to 70-75%
- Verify original image is not unnecessarily large
- Use proper WebP compression tools

## Current Team Member Images

The following team members need images:
- [ ] sarah-mitchell.webp
- [ ] alex-chen.webp
- [ ] priya-sharma.webp
- [ ] marcus-johnson.webp
- [ ] emily-roberts.webp
- [ ] james-park.webp
- [ ] sofia-martinez.webp
- [ ] liam-obrien.webp
- [ ] aisha-khan.webp
- [ ] ryan-thompson.webp
- [ ] david-wilson.webp
- [ ] yuki-tanaka.webp

Check off each item as you add the corresponding image.
