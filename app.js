// iPhone wallpaper dimensions
const WALLPAPER_WIDTH = 1320;
const WALLPAPER_HEIGHT = 2868;

// Get DOM elements
const urlInput = document.getElementById('url');
const textInput = document.getElementById('text');
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const previewContainer = document.getElementById('previewContainer');
const wallpaperCanvas = document.getElementById('wallpaperCanvas');

// Generate wallpaper
generateBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    const text = textInput.value.trim();
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;

    // Validate URL
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        new URL(url);
    } catch (e) {
        alert('Please enter a valid URL');
        return;
    }

    // Generate the wallpaper
    await generateWallpaper(url, text, bgColor, textColor);

    // Show preview
    previewContainer.classList.remove('hidden');
    previewContainer.scrollIntoView({ behavior: 'smooth' });
});

// Generate wallpaper function
async function generateWallpaper(url, text, bgColor, textColor) {
    const ctx = wallpaperCanvas.getContext('2d');

    // Set canvas dimensions
    wallpaperCanvas.width = WALLPAPER_WIDTH;
    wallpaperCanvas.height = WALLPAPER_HEIGHT;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, WALLPAPER_WIDTH, WALLPAPER_HEIGHT);

    // Generate QR code
    const qrSize = 800; // Size of QR code
    const qrCanvas = await generateQRCode(url, qrSize);

    // Calculate positions for centered layout
    const qrX = (WALLPAPER_WIDTH - qrSize) / 2;
    const qrY = (WALLPAPER_HEIGHT - qrSize) / 2 - 200; // Offset up to make room for text

    // Draw QR code on wallpaper
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Draw text below QR code if provided
    if (text) {
        ctx.fillStyle = textColor;
        ctx.font = 'bold 80px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const textY = qrY + qrSize + 80;

        // Word wrap for long text
        const maxWidth = WALLPAPER_WIDTH - 200;
        wrapText(ctx, text, WALLPAPER_WIDTH / 2, textY, maxWidth, 100);
    }
}

// Generate QR code
function generateQRCode(url, size) {
    return new Promise((resolve, reject) => {
        // Create temporary container for QR code
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        // Generate QR code
        const qrcode = new QRCode(tempDiv, {
            text: url,
            width: size,
            height: size,
            colorDark: '#000000',
            colorLight: '#ffffff',
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
    link.download = 'qr-wallpaper.png';
    link.href = wallpaperCanvas.toDataURL('image/png');
    link.click();
});
