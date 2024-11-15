// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with environment variables or hardcoded values
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a Multer storage engine that uploads files to Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'car_images', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
    },
});

// Multer setup with Cloudinary storage
const upload = require('multer')({ storage });

module.exports = { cloudinary, upload };
