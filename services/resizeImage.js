const jimp = require('jimp');

const resizeImage = async (imagePath) => {
  const image = await jimp.read(imagePath);

  await image.resize(250, 250, jimp.RESIZE_BICUBIC);

  await image.writeAsync(imagePath, { quality: 100 });
};
module.exports = resizeImage;
