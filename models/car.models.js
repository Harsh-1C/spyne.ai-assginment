// Car Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    images: {
        type: [String],
        validate: [
            function (images) {
                return images.length <= 10;
            },
            'Maximum of 10 images are allowed.'
        ]
    },
    tags: {
        car_type: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        dealer: {
            type: String,
            required: true,
            trim: true
        }
    }
}, {
    timestamps: true
});

const carModel = mongoose.model('cars', carSchema);

module.exports = carModel;