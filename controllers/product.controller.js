const uploadImages = require('../middleware/upload.middleware.js'); // Adjust path as necessary
const Car = require('../models/car.models.js'); // Adjust path to your schema

const createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const userId = req.userId; 

        const images = req.files.map(file => file?.path);        
        const newCar = new Car({
            user: userId,
            title,
            description,
            images,
            tags: JSON.parse(tags),
        });

        // Save the new car entry to the database
        const savedCar = await newCar.save();
        res.status(201).json({ success: true, data: savedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create car' });
    }
};


const updateCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const userId = req.userId;
        const { title, description, images, tags } = req.body;

        // console.log(req.body);
        
        
        // Find the car by ID and ensure it belongs to the user
        const car = await Car.findOne({ _id: carId, user: userId });

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found or not authorized to update' });
        }

        // Update fields
        if (title) car.title = title;
        if (description) car.description = description;
        if (images) car.images = images;
        if (tags) car.tags = tags;

        // Save updated car
        const updatedCar = await car.save();

        
        res.status(200).json({ success: true, data: updatedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update car' });
    }
};

const deleteCar = async (req, res) => {
    try {
        const carId = req.params.carId; // Get the car ID from the request parameters
        const userId = req.userId; // Assumes user ID is attached to the request by middleware

        // Find the car by ID and user ID
        const car = await Car.findOne({ _id: carId, user: userId });
        
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found or you do not have permission to delete this car' });
        }

        // Delete the car
        await Car.findByIdAndDelete(carId);
        
        res.status(200).json({ success: true, message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete car' });
    }
};

const searchCars = async (req, res) => {
    try {
        const { keyword } = req.query;
        const userId = req.userId;  // Assuming the userId is extracted from the authenticated user (e.g., from JWT)
        
        if (!keyword) {
            return res.status(400).json({ success: false, message: 'Keyword is required for search' });
        }

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Search for cars where the keyword matches in various fields and the car belongs to the logged-in user
        const cars = await Car.find({
            user: userId,  // Ensure the car is associated with the logged-in user
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { 'tags.car_type': { $regex: keyword, $options: 'i' } },
                { 'tags.company': { $regex: keyword, $options: 'i' } },
                { 'tags.dealer': { $regex: keyword, $options: 'i' } }
            ]
        });

        if (cars.length === 0) {
            return res.status(404).json({ success: false, message: 'No cars found matching the search criteria' });
        }

        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to search for cars' });
    }
};


const getAllCars = async (req, res) => {
    try {
        const userId = req.userId;  
        // Assuming userId is extracted from the authenticated user (e.g., from JWT)        
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Fetch all cars that belong to the logged-in user
        const cars = await Car.find({ user: userId });
        // console.log(cars);
        if (cars.length === 0) {
            return res.status(200).json({ success: false, message: 'No cars found for this user' });
        }

        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch cars' });
    }
};


const getCarDetail = async(req, res) => {
    try {
        const carId = req.params.carId; // Get the car ID from the request parameters
        const userId = req.userId; // Assumes user ID is attached to the request by middleware

        // Find the car by ID and user ID
        const car = await Car.findOne({ _id: carId, user: userId });

        
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found ' });
        }
        
        res.status(200).json({ success: true, data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete car' });
    }
}


module.exports = {
    createCar,
    deleteCar,
    updateCar,
    searchCars,
    getAllCars,
    getCarDetail
};

