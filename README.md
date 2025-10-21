# QR Code Wallpaper Generator

A modern, feature-rich web application that generates beautiful iPhone wallpapers with customizable QR codes.

## Features

### Core Functionality
- Generate QR code wallpapers sized perfectly for iPhone (1320 x 2868 pixels)
- Customizable URL that the QR code will redirect to
- Optional custom text below the QR code
- High-quality PNG export

### Design Customization
- **Quick Presets**: Dark, Light, Gradient, and Ocean themes
- **Full Color Control**:
  - Background color
  - Text color
  - QR code color
  - QR code background color
- **Typography Options**:
  - Multiple font choices (Inter, Arial, Helvetica, Georgia, Courier New, Verdana)
  - Adjustable text size (40-120px)
- **QR Code Sizing**: Adjustable QR code size (600-1000px)

### User Experience
- Live preview with auto-update option
- Real-time form validation
- Character counter for text input
- Loading states and visual feedback
- Keyboard shortcuts (Ctrl/Cmd + Enter to generate, Ctrl/Cmd + S to download)
- Expandable design options panel
- Reset to default settings
- Fully responsive design for mobile and desktop

### Modern UI/UX
- Clean, professional interface with custom logo
- Smooth animations and transitions
- Accessible form controls
- Color picker with hex input
- Interactive sliders with live value display
- Phone frame preview

## How to Use

1. **Open the App**: Open `index.html` in your web browser
2. **Enter URL**: Input the URL you want the QR code to redirect to (required)
3. **Add Text** (Optional): Add descriptive text to display below the QR code
4. **Choose a Preset** (Optional): Click on Dark, Light, Gradient, or Ocean preset
5. **Customize Design** (Optional):
   - Expand "Design Options" to access advanced customization
   - Adjust colors, fonts, and sizes to your preference
6. **Generate**: Click "Generate Wallpaper" or press Ctrl/Cmd + Enter
7. **Preview**: View your wallpaper in the preview section
8. **Download**: Click "Download Wallpaper" or press Ctrl/Cmd + S

### Pro Tips
- Enable "Auto-update preview" for real-time changes as you customize
- Use the hex input fields for precise color control
- Try different font sizes to match your text length
- Use the Reset button to start fresh

## Setting as iPhone Wallpaper

1. Download the generated wallpaper from your browser
2. Transfer it to your iPhone:
   - **AirDrop**: Quick and easy from Mac
   - **iCloud Photos**: Sync across devices
   - **Email/Messages**: Send to yourself
3. Open the image in the Photos app
4. Tap the share button (square with arrow)
5. Select "Use as Wallpaper"
6. Position and zoom as desired
7. Set as Lock Screen, Home Screen, or both

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Generate wallpaper
- **Ctrl/Cmd + S**: Download wallpaper

## Technical Details

### Technologies Used
- **HTML5 Canvas API**: High-resolution wallpaper rendering
- **QRCode.js**: QR code generation with high error correction
- **Modern CSS**: CSS Grid, Flexbox, Custom Properties, Animations
- **Vanilla JavaScript**: No framework dependencies
- **Google Fonts**: Inter font family

### Architecture
- Pure client-side application
- No backend or server required
- No data collection or tracking
- Works completely offline (after initial load)

### Browser Support
Works in all modern browsers supporting:
- HTML5 Canvas API
- CSS Grid and Flexbox
- ES6 JavaScript
- Color input type

Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Files Structure

```
├── index.html          # Main HTML structure and UI components
├── style.css           # Styling, animations, and responsive design
├── app.js              # Application logic and QR generation
└── README.md           # Documentation
```

## Customization

### Adding New Presets

Edit the `PRESETS` object in `app.js`:

```javascript
const PRESETS = {
    yourPreset: {
        bgColor: '#hexcolor',
        textColor: '#hexcolor',
        qrColor: '#hexcolor',
        qrBgColor: '#hexcolor'
    }
};
```

Then add a button in `index.html`:

```html
<button class="preset-btn" data-preset="yourPreset">
    <div class="preset-preview" style="background: #yourcolor;"></div>
    <span>Your Preset</span>
</button>
```

### Changing Default Dimensions

Edit constants in `app.js`:

```javascript
const WALLPAPER_WIDTH = 1320;   // Change width
const WALLPAPER_HEIGHT = 2868;  // Change height
```

## Performance

- Instant QR code generation
- Optimized canvas rendering
- Debounced auto-update (500ms)
- Minimal memory footprint
- No external API calls

## Privacy

- All processing happens locally in your browser
- No data is sent to any server
- No cookies or tracking
- No user data is collected or stored

## License

Free to use and modify for personal and commercial projects.

## Contributing

Feel free to fork, modify, and submit pull requests for improvements.

## Support

For issues or questions, please open an issue on the project repository.

---

Made with care for iPhone users | Free & Open Source
