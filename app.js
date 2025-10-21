// iPhone wallpaper dimensions
const WALLPAPER_WIDTH = 1320;
const WALLPAPER_HEIGHT = 2868;

// Enhanced wallpaper presets with gradients
const PRESETS = {
    sunset: {
        gradient: [
            { color: '#FF6B6B', position: 0 },
            { color: '#FFE66D', position: 0.5 },
            { color: '#FF8E53', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#2C3E50',
        qrBgColor: '#ffffff',
        pattern: 'circles'
    },
    aurora: {
        gradient: [
            { color: '#00C9FF', position: 0 },
            { color: '#92FE9D', position: 0.5 },
            { color: '#00F260', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#1a1a1a',
        qrBgColor: '#ffffff',
        pattern: 'waves'
    },
    galaxy: {
        gradient: [
            { color: '#1e3c72', position: 0 },
            { color: '#2a5298', position: 0.5 },
            { color: '#7e22ce', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#000000',
        qrBgColor: '#ffffff',
        pattern: 'dots'
    },
    neon: {
        gradient: [
            { color: '#0F2027', position: 0 },
            { color: '#203A43', position: 0.5 },
            { color: '#2C5364', position: 1 }
        ],
        textColor: '#00ff9d',
        qrColor: '#00ff9d',
        qrBgColor: '#1a1a1a',
        pattern: 'grid'
    },
    rose: {
        gradient: [
            { color: '#f093fb', position: 0 },
            { color: '#f5576c', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#4a0e2a',
        qrBgColor: '#ffffff',
        pattern: 'none'
    },
    forest: {
        gradient: [
            { color: '#134E5E', position: 0 },
            { color: '#71B280', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#0a2e1f',
        qrBgColor: '#ffffff',
        pattern: 'circles'
    },
    lavender: {
        gradient: [
            { color: '#a8edea', position: 0 },
            { color: '#fed6e3', position: 1 }
        ],
        textColor: '#5a3d5c',
        qrColor: '#5a3d5c',
        qrBgColor: '#ffffff',
        pattern: 'dots'
    },
    fire: {
        gradient: [
            { color: '#f12711', position: 0 },
            { color: '#f5af19', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#4a0000',
        qrBgColor: '#ffffff',
        pattern: 'waves'
    },
    ocean: {
        gradient: [
            { color: '#2E3192', position: 0 },
            { color: '#1BFFFF', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#001a4d',
        qrBgColor: '#ffffff',
        pattern: 'circles'
    },
    midnight: {
        gradient: [
            { color: '#232526', position: 0 },
            { color: '#414345', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#ffffff',
        qrBgColor: '#000000',
        pattern: 'grid'
    },
    peach: {
        gradient: [
            { color: '#ED4264', position: 0 },
            { color: '#FFEDBC', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#8b0000',
        qrBgColor: '#ffffff',
        pattern: 'none'
    },
    mint: {
        gradient: [
            { color: '#00d2ff', position: 0 },
            { color: '#3a47d5', position: 1 }
        ],
        textColor: '#ffffff',
        qrColor: '#001a4d',
        qrBgColor: '#ffffff',
        pattern: 'dots'
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
const patternSelect = document.getElementById('pattern');
const qrStyleSelect = document.getElementById('qrStyle');
const qrShadowCheckbox = document.getElementById('qrShadow');
const textShadowCheckbox = document.getElementById('textShadow');
const textBackgroundCheckbox = document.getElementById('textBackground');
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
let currentPresetGradient = null;

// Accordion functionality
accordionHeader.addEventListener('click', () => {
    const isOpen = accordionHeader.classList.toggle('active');
    accordionContent.classList.toggle('open');

    // Update aria-expanded for accessibility
    accordionHeader.setAttribute('aria-expanded', isOpen);
});

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        const preset = PRESETS[presetName];

        // Remove active class from all preset buttons
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply preset
        applyPreset(preset);

        // Trigger auto-generate if enabled
        if (autoGenerateCheckbox.checked) {
            scheduleAutoGenerate();
        }
    });
});

// Apply preset helper
function applyPreset(preset) {
    // Store gradient for rendering
    currentPresetGradient = preset.gradient;

    // Apply first color from gradient as solid fallback
    const firstColor = preset.gradient[0].color;
    bgColorInput.value = firstColor;
    bgColorHex.value = firstColor;

    textColorInput.value = preset.textColor;
    textColorHex.value = preset.textColor;
    qrColorInput.value = preset.qrColor;
    qrColorHex.value = preset.qrColor;
    qrBgColorInput.value = preset.qrBgColor;
    qrBgColorHex.value = preset.qrBgColor;
    patternSelect.value = preset.pattern;
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
    patternSelect.value = 'none';
    qrStyleSelect.value = 'square';
    qrShadowCheckbox.checked = true;
    textShadowCheckbox.checked = true;
    textBackgroundCheckbox.checked = false;

    // Apply sunset preset
    currentPresetGradient = PRESETS.sunset.gradient;
    applyPreset(PRESETS.sunset);

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
        // Clear preset gradient when manually changing colors
        currentPresetGradient = null;
        if (autoGenerateCheckbox.checked) {
            scheduleAutoGenerate();
        }
    });

    hexInput.addEventListener('input', () => {
        const hex = hexInput.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            colorInput.value = hex;
            currentPresetGradient = null;
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
[fontFamilyInput, patternSelect, qrStyleSelect, qrShadowCheckbox, textShadowCheckbox, textBackgroundCheckbox].forEach(input => {
    input.addEventListener('change', () => {
        if (autoGenerateCheckbox.checked) {
            scheduleAutoGenerate();
        }
    });
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
        const pattern = patternSelect.value;
        const qrStyle = qrStyleSelect.value;
        const qrShadow = qrShadowCheckbox.checked;
        const textShadow = textShadowCheckbox.checked;
        const textBackground = textBackgroundCheckbox.checked;
        const fontFamily = fontFamilyInput.value;
        const fontSize = parseInt(fontSizeInput.value);
        const qrSize = parseInt(qrSizeInput.value);

        // Generate the wallpaper
        await generateWallpaper(url, text, bgColor, textColor, qrColor, qrBgColor,
            pattern, qrStyle, qrShadow, textShadow, textBackground, fontFamily, fontSize, qrSize);

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

// Generate wallpaper function with enhanced visuals
async function generateWallpaper(url, text, bgColor, textColor, qrColor, qrBgColor,
    pattern, qrStyle, qrShadow, textShadow, textBackground, fontFamily, fontSize, qrSize) {
    const ctx = wallpaperCanvas.getContext('2d');

    // Set canvas dimensions
    wallpaperCanvas.width = WALLPAPER_WIDTH;
    wallpaperCanvas.height = WALLPAPER_HEIGHT;

    // Draw gradient or solid background
    if (currentPresetGradient) {
        drawGradientBackground(ctx, currentPresetGradient);
    } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, WALLPAPER_WIDTH, WALLPAPER_HEIGHT);
    }

    // Draw pattern overlay
    if (pattern !== 'none') {
        drawPattern(ctx, pattern);
    }

    // Generate QR code
    const qrCanvas = await generateQRCode(url, qrSize, qrColor, qrBgColor);

    // Calculate positions for centered layout
    const qrX = (WALLPAPER_WIDTH - qrSize) / 2;
    const qrY = text ? (WALLPAPER_HEIGHT - qrSize) / 2 - 200 : (WALLPAPER_HEIGHT - qrSize) / 2;

    // Draw QR code with effects
    drawQRCode(ctx, qrCanvas, qrX, qrY, qrSize, qrStyle, qrShadow);

    // Draw text below QR code if provided
    if (text) {
        drawText(ctx, text, textColor, fontFamily, fontSize, qrY, qrSize, textShadow, textBackground);
    }
}

// Draw gradient background
function drawGradientBackground(ctx, gradientStops) {
    const gradient = ctx.createLinearGradient(0, 0, WALLPAPER_WIDTH, WALLPAPER_HEIGHT);

    gradientStops.forEach(stop => {
        gradient.addColorStop(stop.position, stop.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WALLPAPER_WIDTH, WALLPAPER_HEIGHT);
}

// Draw pattern overlay
function drawPattern(ctx, patternType) {
    ctx.globalAlpha = 0.1;

    switch(patternType) {
        case 'dots':
            drawDots(ctx);
            break;
        case 'grid':
            drawGrid(ctx);
            break;
        case 'circles':
            drawCircles(ctx);
            break;
        case 'waves':
            drawWaves(ctx);
            break;
    }

    ctx.globalAlpha = 1.0;
}

// Pattern: Dots
function drawDots(ctx) {
    ctx.fillStyle = 'white';
    const spacing = 80;
    const dotSize = 8;

    for (let y = 0; y < WALLPAPER_HEIGHT; y += spacing) {
        for (let x = 0; x < WALLPAPER_WIDTH; x += spacing) {
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Pattern: Grid
function drawGrid(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    const spacing = 100;

    for (let x = 0; x < WALLPAPER_WIDTH; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WALLPAPER_HEIGHT);
        ctx.stroke();
    }

    for (let y = 0; y < WALLPAPER_HEIGHT; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WALLPAPER_WIDTH, y);
        ctx.stroke();
    }
}

// Pattern: Circles
function drawCircles(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    const count = 15;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * WALLPAPER_WIDTH;
        const y = Math.random() * WALLPAPER_HEIGHT;
        const radius = 100 + Math.random() * 200;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Pattern: Waves
function drawWaves(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    const waveCount = 5;
    const amplitude = 150;
    const frequency = 0.003;

    for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const yOffset = (WALLPAPER_HEIGHT / waveCount) * i;

        for (let x = 0; x < WALLPAPER_WIDTH; x += 5) {
            const y = yOffset + Math.sin(x * frequency + i) * amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
}

// Draw QR code with effects
function drawQRCode(ctx, qrCanvas, x, y, size, style, shadow) {
    // Draw shadow
    if (shadow) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        if (style === 'rounded') {
            ctx.fillStyle = 'white';
            roundRect(ctx, x, y, size, size, 30);
            ctx.fill();
        } else {
            ctx.fillRect(x, y, size, size);
        }
        ctx.restore();
    }

    // Draw QR code
    if (style === 'rounded') {
        ctx.save();
        roundRect(ctx, x, y, size, size, 30);
        ctx.clip();
        ctx.drawImage(qrCanvas, x, y, size, size);
        ctx.restore();
    } else {
        ctx.drawImage(qrCanvas, x, y, size, size);
    }
}

// Draw text with effects
function drawText(ctx, text, textColor, fontFamily, fontSize, qrY, qrSize, shadow, background) {
    const textY = qrY + qrSize + 120;
    const maxWidth = WALLPAPER_WIDTH - 200;
    const lineHeight = fontSize * 1.3;

    ctx.font = `bold ${fontSize}px ${fontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Measure text for background
    const lines = wrapTextMeasure(ctx, text, maxWidth);

    // Draw background
    if (background) {
        const padding = 30;
        const bgHeight = lines.length * lineHeight + padding * 2;
        const bgY = textY - padding;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        roundRect(ctx, 100, bgY, WALLPAPER_WIDTH - 200, bgHeight, 20);
        ctx.fill();
    }

    // Draw shadow
    if (shadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
    }

    // Draw text
    ctx.fillStyle = textColor;
    wrapText(ctx, text, WALLPAPER_WIDTH / 2, textY, maxWidth, lineHeight);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Helper: Rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
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

// Text wrapping function (measure only)
function wrapTextMeasure(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    return lines;
}

// Text wrapping function (draw)
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

// Initialize with sunset preset
currentPresetGradient = PRESETS.sunset.gradient;
applyPreset(PRESETS.sunset);
