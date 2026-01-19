document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageInput = document.getElementById('imageInput');

    let originalImage = null;
    let brightness = 0;
    let contrast = 100;
    let blur = 0;
    let scale = 100;

    // โหลดรูป
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    originalImage = img;
                    drawImage();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // วาดรูป
    function drawImage() {
        if (!originalImage) return;
        
        const scaleFactor = scale / 100;
        canvas.width = originalImage.width * scaleFactor;
        canvas.height = originalImage.height * scaleFactor;
        
        ctx.filter = `brightness(${100 + brightness}%) contrast(${contrast}%) blur(${blur}px)`;
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    }

    // ความสว่าง
    document.getElementById('brightness').addEventListener('input', (e) => {
        brightness = parseInt(e.target.value);
        document.getElementById('brightVal').textContent = brightness;
        drawImage();
    });

    // คอนทราสต์
    document.getElementById('contrast').addEventListener('input', (e) => {
        contrast = parseInt(e.target.value);
        document.getElementById('contrastVal').textContent = contrast;
        drawImage();
    });

    // เบลอ
    document.getElementById('blur').addEventListener('input', (e) => {
        blur = parseInt(e.target.value);
        document.getElementById('blurVal').textContent = blur;
        drawImage();
    });

    // ขนาด
    document.getElementById('scale').addEventListener('input', (e) => {
        scale = parseInt(e.target.value);
        document.getElementById('scaleVal').textContent = scale;
        drawImage();
    });

    // ขาวดำ
    document.getElementById('grayscale').addEventListener('click', () => {
        if (!originalImage) return;
        
        ctx.filter = 'none';
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
            data[i] = data[i + 1] = data[i + 2] = gray;
        }
        
        ctx.putImageData(imageData, 0, 0);
    });

    // รีเซ็ต
    document.getElementById('reset').addEventListener('click', () => {
        brightness = 0;
        contrast = 100;
        blur = 0;
        scale = 100;
        document.getElementById('brightness').value = 0;
        document.getElementById('contrast').value = 100;
        document.getElementById('blur').value = 0;
        document.getElementById('scale').value = 100;
        document.getElementById('brightVal').textContent = 0;
        document.getElementById('contrastVal').textContent = 100;
        document.getElementById('blurVal').textContent = 0;
        document.getElementById('scaleVal').textContent = 100;
        drawImage();
    });

    // ดาวน์โหลด
    document.getElementById('download').addEventListener('click', () => {
        if (!originalImage) return;
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});