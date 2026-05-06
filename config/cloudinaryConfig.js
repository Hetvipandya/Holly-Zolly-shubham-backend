const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.domq86row,
  api_key: process.env.CLOUDINARY_376633546122745,
  api_secret: process.env.CLOUDINARY_OJtzJi7RbDP7ZBQ52uOwoU1-X0U,
  secure: true,
});

module.exports = cloudinary;
