const express = require('express');
const authMiddleware = require('../middleware/auth.middlerware.js');
const { createCar, updateCar, deleteCar, searchCars, getAllCars, getCarDetail } = require('../controllers/product.controller.js');
const router = express.Router();
const {upload} = require("../config/cloudinary.js");

// Create || post

router.post("/create-car",authMiddleware,upload.array('images', 10), createCar);
router.post("/update-car/:carId", authMiddleware, updateCar);
router.get("/delete-car/:carId",authMiddleware, deleteCar)

router.get("/search-car", authMiddleware, searchCars)
router.get("/all-car", authMiddleware, getAllCars);
router.get("/get-car-detail/:carId", authMiddleware ,getCarDetail);

module.exports = router