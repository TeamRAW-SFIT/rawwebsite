# Image Setup Guide

## Directory Structure

```
public/
  images/
    team/          - Team member photos
    gallery/       - Gallery images (robots, events, workshops, competitions)
```

## How to Add Images

### Team Images
1. Place team member photos in `public/images/team/`
2. Name them descriptively (e.g., `alex-chen.jpg`, `sarah-mitchell.jpg`)
3. Update `src/data/teamData.ts` with the correct filename:
   ```typescript
   imageUrl: '/images/team/alex-chen.jpg',
   ```

### Gallery Images
1. Place gallery images in `public/images/gallery/`
2. Name them by category and number (e.g., `robot-01.jpg`, `event-championship.jpg`)
3. Update `src/data/galleryData.ts` with the correct filename:
   ```typescript
   imageUrl: '/images/gallery/robot-01.jpg',
   ```

## Image Specifications

### Team Photos
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400x400px (square)
- **Max File Size**: 500KB per image
- **Aspect Ratio**: 1:1 (square)

### Gallery Images
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1200x900px (landscape) or 900x1200px (portrait)
- **Max File Size**: 1MB per image
- **Aspect Ratios**: 4:3, 3:2, or 16:9

## Quick Start

1. **Replace placeholder images**: All images currently point to `placeholder.jpg`
2. **Add your photos** to the respective directories
3. **Update the data files** with actual filenames
4. **Refresh the page** to see your images

## Tips for Best Performance

✅ Use **WebP format** when possible (smaller file size)
✅ **Compress images** before uploading (use tools like TinyPNG, Squoosh)
✅ Keep dimensions under **1500px** for gallery images
✅ Use **square crops** (1:1) for team photos
✅ Name files with **lowercase and hyphens** (e.g., `team-member-1.jpg`)

## Example File Names

### Team Photos
- `sarah-mitchell.jpg`
- `alex-chen.jpg`
- `priya-sharma.jpg`
- `marcus-rodriguez.jpg`

### Gallery Images
- `robot-autonomous-nav.jpg`
- `event-championship-2024.jpg`
- `workshop-arduino-basics.jpg`
- `competition-robocup.jpg`

---

**Note**: Images load instantly from local files (unlike external Unsplash URLs which were slow). Make sure to add your actual team and gallery photos to these directories!
