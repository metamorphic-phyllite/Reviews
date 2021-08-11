const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews');

const reviewsSchema = new mongoose.Schema({
    product: String,
    page: Number,
    count: Number,
    results: [{
        review_id: Number,
        rating: Number,
        summary: String,
        recommended: Boolean,
        response: String || null,
        body: String,
        date: Date,
        reviewer_name: String,
        helpfulness: Number,
        photos: [{ id: Number, url: String }]
    }]
});

const metaDataSchema = new mongoose.Schema({
    product_id: String,
    ratings: {
        1: String,
        2: String,
        3: String,
        4: String,
        5: String
    },
    recommended: {
        false: String,
        true: String
    },
    characteristics: {
        Fit: {
            id: Number,
            value: String
        },
        Length: {
            id: Number,
            value: String
        },
        Comfort: {
            id: Number,
            value: String
        },
        Quality: {
            id: Number,
            value: String
        }
    }
});

const Reviews = mongoose.model('Reviews', reviewsSchema);
const MetaData = mongoose.model('MetaData', metaDataSchema);