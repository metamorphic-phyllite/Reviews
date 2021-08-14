const pool = require('../db.js');
const { getMetadata } = require('./controllers/meta.js');
const { getReviews } = require('./controllers/reviews.js');
const express = require('express');
const app = express();

app.get('/reviews/meta', getMetadata)

app.get('/reviews', getReviews);

app.post('/reviews', async (req, res) => {

});

app.put('/reviews/:review_id/helpful', (req, res) => {

});

app.put('/reviews/:review_id/report', (req, res) => {

});

app.listen(3000, () => {
    console.log('listening on port 3000')
});