const fs = require('fs');
const sharp = require('sharp');

const IMAGES_DIR = './resources/images';

const getImages = (dir) => new Promise((resolve, reject) => {
  fs.readdir(`${IMAGES_DIR}${dir}`, (error, files) => {
    if (error) {
      reject(error);
    } else {
      resolve(files);
    }
  });
});

const loadImage = (dir, filename, width, height) => new Promise((resolve) => {
  const buffer = Buffer.from(`${IMAGES_DIR}${dir}/${filename}`);
  const stream = fs.createReadStream(buffer);
  stream.on('error', (err) => {
    console.log(`Have error during read stream file: ${err.message}`);
    resolve(null);
  });
  const transform = sharp();
  if (width || height) {
    transform.resize(width, height);
  }
  resolve(stream.pipe(transform));
});

module.exports = {
  getImages,
  loadImage,
};
