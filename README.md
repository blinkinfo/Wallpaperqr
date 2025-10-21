# QR Code Wallpaper Generator

A stunning, professional-grade web application that creates visually beautiful iPhone wallpapers with functional QR codes. Features gorgeous gradients, artistic patterns, and premium visual effects.

## Features

### Core Functionality
- Generate QR code wallpapers sized perfectly for iPhone (1320 x 2868 pixels)
- Customizable URL that the QR code will redirect to
- Optional custom text below the QR code
- High-quality PNG export with professional aesthetics

### Premium Wallpaper Themes
12 professionally designed preset themes with multi-stop gradients and matched patterns:

- **Sunset** - Warm orange-yellow gradient with circular patterns
- **Aurora** - Vibrant cyan-green northern lights gradient with waves
- **Galaxy** - Deep space blue-purple gradient with starfield dots
- **Neon** - Dark cyberpunk theme with grid overlay and neon accents
- **Rose Gold** - Elegant pink-to-rose gradient
- **Forest** - Nature-inspired teal-to-green gradient with organic circles
- **Lavender** - Soft pastel aqua-to-pink gradient with gentle dots
- **Fire** - Bold red-to-orange flame gradient with flowing waves
- **Deep Ocean** - Rich blue gradient with circular depth
- **Midnight** - Sophisticated dark gray gradient with geometric grid
- **Peach** - Warm pink-to-cream gradient
- **Ice Mint** - Cool cyan-to-blue gradient with dot overlay

Each preset includes:
- Custom multi-color gradient backgrounds
- Matched pattern overlays
- Optimized color schemes for readability
- Perfectly tuned QR code colors

### Visual Effects & Patterns
- **Background Patterns**:
  - Dots - Evenly distributed dot pattern
  - Grid - Clean geometric grid lines
  - Circles - Organic random circle overlays
  - Waves - Flowing sine wave patterns
  - None - Clean gradient only
- **QR Code Effects**:
  - Soft shadow with depth
  - Rounded corners option
  - Custom colors for QR and background
- **Text Effects**:
  - Drop shadow with adjustable blur
  - Semi-transparent background panel
  - Multiple font options

### Advanced Customization
- **Full Color Control**:
  - Background color (with gradient override)
  - Text color
  - QR code color
  - QR code background color
  - Hex input for precise color selection
- **Typography Options**:
  - Multiple font choices (Inter, Arial, Helvetica, Georgia, Courier New, Verdana)
  - Adjustable text size (40-120px)
- **Layout Options**:
  - QR code sizing (600-1000px)
  - Pattern selection
  - QR style (square/rounded)
  - Effect toggles (shadows, backgrounds)

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
2. **Choose a Theme**: Click any of the 12 premium wallpaper themes (Sunset, Aurora, Galaxy, etc.)
3. **Enter URL**: Input the URL you want the QR code to redirect to (required)
4. **Add Text** (Optional): Add descriptive text to display below the QR code
5. **Customize** (Optional):
   - Expand "Design Options" for advanced settings
   - Choose background patterns (dots, grid, circles, waves)
   - Select QR style (square or rounded corners)
   - Toggle visual effects (shadows, text background)
   - Fine-tune colors, fonts, and sizes
6. **Generate**: Click "Generate Wallpaper" or press Ctrl/Cmd + Enter
7. **Preview**: View your stunning wallpaper in real-time
8. **Download**: Click "Download Wallpaper" or press Ctrl/Cmd + S

### Pro Tips
- **Start with a preset** - Each theme is expertly designed for stunning results
- **Enable "Auto-update preview"** for real-time changes as you customize
- **Try different patterns** - Each pattern creates a unique aesthetic
- **Use rounded QR codes** for a modern, softer look
- **Toggle shadows** - Shadows add depth and make elements pop
- **Text background** - Enable for better readability on busy backgrounds
- **Experiment with QR colors** - Dark QR on light background, or vice versa
- **Use the Reset button** to start fresh with Sunset theme

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

### Adding New Wallpaper Themes

Create stunning new themes by editing the `PRESETS` object in `app.js`:

```javascript
const PRESETS = {
    yourTheme: {
        gradient: [
            { color: '#FF0000', position: 0 },      // Start color
            { color: '#00FF00', position: 0.5 },    // Middle color (optional)
            { color: '#0000FF', position: 1 }       // End color
        ],
        textColor: '#ffffff',
        qrColor: '#000000',
        qrBgColor: '#ffffff',
        pattern: 'dots'  // 'none', 'dots', 'grid', 'circles', or 'waves'
    }
};
```

Then add a button in `index.html`:

```html
<button class="preset-btn" data-preset="yourTheme">
    <div class="preset-preview" style="background: linear-gradient(135deg, #FF0000 0%, #00FF00 50%, #0000FF 100%);"></div>
    <span>Your Theme</span>
</button>
```

**Tips for creating great themes:**
- Use 2-3 colors for gradients (avoid too many)
- Ensure good contrast between text/QR and background
- Match pattern type to theme mood (waves=organic, grid=modern)
- Test QR code scannability with chosen colors

### Changing Default Dimensions

Edit constants in `app.js`:

```javascript
const WALLPAPER_WIDTH = 1320;   // Change width
const WALLPAPER_HEIGHT = 2868;  // Change height
```

## Performance

- Instant QR code generation with high error correction
- Hardware-accelerated canvas rendering
- Efficient pattern drawing algorithms
- Optimized gradient compositing
- Debounced auto-update (500ms)
- Smart gradient state management
- Minimal memory footprint
- No external API calls
- All processing happens client-side

## Privacy

- All processing happens locally in your browser
- No data is sent to any server
- No cookies or tracking
- No user data is collected or stored

## Why This Generator?

Unlike basic QR wallpaper makers, this tool creates **genuinely beautiful wallpapers** you'll actually want to use:

- **Professional aesthetics** - Multi-stop gradients, artistic patterns, depth effects
- **12 curated themes** - Each expertly designed for visual appeal
- **Full customization** - Fine-tune every aspect while keeping the beauty
- **Always functional** - QR codes remain perfectly scannable despite visual enhancements
- **No compromise** - Beauty AND utility in one package

Perfect for:
- Personal websites and portfolios
- Social media profiles
- Business contact info
- Event invitations
- Creative projects
- Digital business cards
- WiFi sharing
- Any URL you want instant access to

## Examples of What You Can Create

- **Sunset theme** with "Scan to visit my portfolio" text and wave patterns
- **Aurora theme** for your Instagram link with circular overlays
- **Galaxy theme** for a space/tech startup with grid patterns
- **Neon theme** for nightlife/events with cyberpunk aesthetics
- **Forest theme** for eco/nature businesses with organic patterns
- **Lavender theme** for creative/artistic profiles with soft dots

Each wallpaper is a unique piece of functional art!

## License

Free to use and modify for personal and commercial projects.

## Contributing

Feel free to fork, modify, and submit pull requests for improvements.

## Support

For issues or questions, please open an issue on the project repository.

---

Made with ❤️ for iPhone users | Create Beautiful + Functional Wallpapers | Free & Open Source
