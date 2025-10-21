// iPhone wallpaper dimensions
const WALLPAPER_WIDTH = 1320;
const WALLPAPER_HEIGHT = 2868;

// Presets configuration
const PRESETS = {
    dark: {
        bgColor: '#1a1a2e',
        textColor: '#eaeaea',
        qrColor: '#000000',
        qrBgColor: '#ffffff'
    },
    light: {
        bgColor: '#f5f5f5',
        textColor: '#1a1a1a',
        qrColor: '#000000',
        qrBgColor: '#ffffff'
    },
    gradient: {
        bgColor: '#667eea',
        textColor: '#ffffff',
        qrColor: '#000000',
        qrBgColor: '#ffffff'
    },
    ocean: {
        bgColor: '#2193b0',
        textColor: '#ffffff',
        qrColor: '#000000',
        qrBgColor: '#ffffff'
    }
};

// Get DOM elements
const urlInput = document.getElementById('url');
const textInput = document.getElementById('text');
const bgColorInput = document.getElementById('bgColor');
const bgColorHex = document.getElementById('bgColorHex');
const textColorInput = document.getElementById('textColor');
const textColorHex = document.getElementById('textColorHex');
const qrColorInput = document.getElementById('qrColor');
const qrColorHex = document.getElementById('qrColorHex');
const qrBgColorInput = document.getElementById('qrBgColor');
const qrBgColorHex = document.getElementById('qrBgColorHex');
const fontFamilyInput = document.getElementById('fontFamily');
const fontSizeInput = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const qrSizeInput = document.getElementById('qrSize');
const qrSizeValue = document.getElementById('qrSizeValue');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const downloadBtn = document.getElementById('downloadBtn');
const downloadSection = document.getElementById('downloadSection');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const previewWrapper = document.getElementById('previewWrapper');
const wallpaperCanvas = document.getElementById('wallpaperCanvas');
const charCount = document.getElementById('charCount');
const urlError = document.getElementById('urlError');
const autoGenerateCheckbox = document.getElementById('autoGenerate');
const resetBtn = document.getElementById('resetBtn');
const accordionHeader = document.querySelector('.accordion-header');
const accordionContent = document.querySelector('.accordion-content');

// Initialize
let isGenerating = false;
let autoGenerateTimeout = null;

// Accordion functionality
accordionHeader.addEventListener('click', () => {
    accordionHeader.classList.toggle('active');
    accordionContent.classList.toggle('open');
});

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        const preset = PRESETS[presetName];

        // Remove active class from all preset buttons
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply preset colors
        applyColors(preset);

        // Trigger auto-generate if enabled
        if (autoGenerateCheckbox.checked) {
            scheduleAutoGenerate();
        }
    });
});

// Apply colors helper
function applyColors(colors) {
    bgColorInput.value = colors.bgColor;
    bgColorHex.value = colors.bgColor;
    textColorInput.value = colors.textColor;
    textColorHex.value = colors.textColor;
    qrColorInput.value = colors.qrColor;
    qrColorHex.value = colors.qrColor;
    qrBgColorInput.value = colors.qrBgColor;
    qrBgColorHex.value = colors.qrBgColor;
}

// Reset to default
resetBtn.addEventListener('click', () => {
    urlInput.value = '';
    textInput.value = '';
    charCount.textContent = '0';
    fontFamilyInput.value = 'Inter';
    fontSizeInput.value = 80;
    fontSizeValue.textContent = '80';
    qrSizeInput.value = 800;
    qrSizeValue.textContent = '800';

    // Apply dark preset
    applyColors(PRESETS.dark);

    // Reset active preset
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));

    // Clear errors
    urlInput.classList.remove('error');
    urlError.textContent = '';

    // Hide preview
    previewPlaceholder.classList.remove('hidden');
    previewWrapper.classList.add('hidden');
    downloadSection.classList.add('hidden');
});

// Color sync between color picker and hex input
function syncColorInputs(colorInput, hexInput) {
    colorInput.addEventListener('input', () => {
        hexInput.value = colorInput.value;
        if (autoGenerateCheckbox.checked) {
            scheduleAutoGenerate();
        }
    });

    hexInput.addEventListener('input', () => {
        const hex = hexInput.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            colorInput.value = hex;
            if (autoGenerateCheckbox.checked) {
                scheduleAutoGenerate();
            }
        }
    });
}

syncColorInputs(bgColorInput, bgColorHex);
syncColorInputs(textColorInput, textColorHex);
syncColorInputs(qrColorInput, qrColorHex);
syncColorInputs(qrBgColorInput, qrBgColorHex);

// Character counter
textInput.addEventListener('input', () => {
    charCount.textContent = textInput.value.length;
    if (autoGenerateCheckbox.checked) {
        scheduleAutoGenerate();
    }
});

// URL validation
urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    if (url && !isValidUrl(url)) {
        urlInput.classList.add('error');
        urlError.textContent = 'Please enter a valid URL';
    } else {
        urlInput.classList.remove('error');
        urlError.textContent = '';
        if (autoGenerateCheckbox.checked && url) {
            scheduleAutoGenerate();
        }
    }
});

// Slider value updates
fontSizeInput.addEventListener('input', () => {
    fontSizeValue.textContent = fontSizeInput.value;
    if (autoGenerateCheckbox.checked) {
        scheduleAutoGenerate();
    }
});

qrSizeInput.addEventListener('input', () => {
    qrSizeValue.textContent = qrSizeInput.value;
    if (autoGenerateCheckbox.checked) {
        scheduleAutoGenerate();
    }
});

// Auto-generate on other input changes
fontFamilyInput.addEventListener('change', () => {
    if (autoGenerateCheckbox.checked) {
        scheduleAutoGenerate();
    }
});

// URL validation helper
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Schedule auto-generate with debounce
function scheduleAutoGenerate() {
    if (autoGenerateTimeout) {
        clearTimeout(autoGenerateTimeout);
    }
    autoGenerateTimeout = setTimeout(() => {
        const url = urlInput.value.trim();
        if (url && isValidUrl(url)) {
            generateWallpaperWrapper();
        }
    }, 500);
}

// Generate wallpaper wrapper (handles UI state)
async function generateWallpaperWrapper() {
    const url = urlInput.value.trim();

    // Validate URL
    if (!url) {
        urlInput.classList.add('error');
        urlError.textContent = 'Please enter a URL';
        urlInput.focus();
        return;
    }

    if (!isValidUrl(url)) {
        urlInput.classList.add('error');
        urlError.textContent = 'Please enter a valid URL';
        urlInput.focus();
        return;
    }

    // Clear error
    urlInput.classList.remove('error');
    urlError.textContent = '';

    // Show loading state
    isGenerating = true;
    generateBtn.disabled = true;
    btnText.style.opacity = '0';
    btnLoader.classList.remove('hidden');

    try {
        // Get all settings
        const text = textInput.value.trim();
        const bgColor = bgColorInput.value;
        const textColor = textColorInput.value;
        const qrColor = qrColorInput.value;
        const qrBgColor = qrBgColorInput.value;
        const fontFamily = fontFamilyInput.value;
        const fontSize = parseInt(fontSizeInput.value);
        const qrSize = parseInt(qrSizeInput.value);

        // Generate the wallpaper
        await generateWallpaper(url, text, bgColor, textColor, qrColor, qrBgColor, fontFamily, fontSize, qrSize);

        // Show preview
        previewPlaceholder.classList.add('hidden');
        previewWrapper.classList.remove('hidden');
        downloadSection.classList.remove('hidden');

    } catch (error) {
        console.error('Error generating wallpaper:', error);
        alert('Failed to generate wallpaper. Please try again.');
    } finally {
        // Hide loading state
        isGenerating = false;
        generateBtn.disabled = false;
        btnText.style.opacity = '1';
        btnLoader.classList.add('hidden');
    }
}

// Generate wallpaper button
generateBtn.addEventListener('click', generateWallpaperWrapper);

// Generate wallpaper function
async function generateWallpaper(url, text, bgColor, textColor, qrColor, qrBgColor, fontFamily, fontSize, qrSize) {
    const ctx = wallpaperCanvas.getContext('2d');

    // Set canvas dimensions
    wallpaperCanvas.width = WALLPAPER_WIDTH;
    wallpaperCanvas.height = WALLPAPER_HEIGHT;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, WALLPAPER_WIDTH, WALLPAPER_HEIGHT);

    // Generate QR code
    const qrCanvas = await generateQRCode(url, qrSize, qrColor, qrBgColor);

    // Calculate positions for centered layout
    const qrX = (WALLPAPER_WIDTH - qrSize) / 2;
    const qrY = text ? (WALLPAPER_HEIGHT - qrSize) / 2 - 200 : (WALLPAPER_HEIGHT - qrSize) / 2;

    // Draw QR code on wallpaper
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Draw text below QR code if provided
    if (text) {
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize}px ${fontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const textY = qrY + qrSize + 80;
        const maxWidth = WALLPAPER_WIDTH - 200;
        const lineHeight = fontSize * 1.3;

        wrapText(ctx, text, WALLPAPER_WIDTH / 2, textY, maxWidth, lineHeight);
    }
}

// Generate QR code
function generateQRCode(url, size, colorDark, colorLight) {
    return new Promise((resolve, reject) => {
        // Create temporary container for QR code
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        // Generate QR code
        try {
            const qrcode = new QRCode(tempDiv, {
                text: url,
                width: size,
                height: size,
                colorDark: colorDark,
                colorLight: colorLight,
                correctLevel: QRCode.CorrectLevel.H
            });

            // Wait for QR code to be generated
            setTimeout(() => {
                const qrCanvas = tempDiv.querySelector('canvas');
                if (qrCanvas) {
                    resolve(qrCanvas);
                } else {
                    reject(new Error('Failed to generate QR code'));
                }
                document.body.removeChild(tempDiv);
            }, 100);
        } catch (error) {
            document.body.removeChild(tempDiv);
            reject(error);
        }
    });
}

// Text wrapping function
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lineY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, lineY);
            line = words[n] + ' ';
            lineY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, lineY);
}

// Download wallpaper
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `qr-wallpaper-${timestamp}.png`;
    link.href = wallpaperCanvas.toDataURL('image/png');
    link.click();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isGenerating && urlInput.value.trim()) {
            generateWallpaperWrapper();
        }
    }

    // Ctrl/Cmd + S to download
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!downloadSection.classList.contains('hidden')) {
            downloadBtn.click();
        }
    }
});

// Initialize accordion as closed
accordionContent.classList.remove('open');
