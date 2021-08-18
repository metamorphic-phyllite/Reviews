const pool = require('../db.js');
const express = require('express');
const path = require('path');

const { getMetadata } = require('./controllers/meta.js');
const { getReviews } = require('./controllers/reviews.js');
const { postReview } = require('./controllers/postReview.js');
const { helpful } = require('./controllers/helpful.js');
const { reported } = require('./controllers/reported.js');

const app = express();

// app.use(express.static('/loaderio-c37c3d39761714f7beb0e864fe0c6ebd.txt', path.join(__dirname, 'loader')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/loaderio-c37c3d39761714f7beb0e864fe0c6ebd.txt', (req, res) => {
    res.sendFile('./loader/loaderio-c37c3d39761714f7beb0e864fe0c6ebd.txt', { root: __dirname });
})

app.get('/reviews/meta', getMetadata);

app.get('/reviews', getReviews);

app.post('/reviews', postReview);

app.put('/reviews/:review_id/helpful', helpful);

app.put('/reviews/:review_id/report', reported);

app.listen(3000, () => {
    console.log('listening on port 3000');
});