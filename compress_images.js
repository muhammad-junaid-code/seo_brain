const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images';

async function compressImages() {
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  
  console.log(`Found ${files.length} images. Starting compression...\n`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const tempPath = path.join(imagesDir, '_temp_' + file);

    try {
      await sharp(filePath)
        .resize(300, 200, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 80 })
        .toFile(tempPath);

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const newSize = (fs.statSync(filePath).size / 1024).toFixed(1);
      console.log(`✅ ${file} → ${newSize} KB`);
    } catch (err) {
      console.log(`❌ Skipped: ${file} (${err.message})`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  console.log('\n🎉 All images compressed successfully!');
}

compressImages();
