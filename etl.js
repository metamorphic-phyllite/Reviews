const fs = require('fs');
const pool = require('./db.js');
const parser = require('csv-parser');

const reviewResults = [];
const productIds = [];
const photoResults = [];
const recommended = {};
const ratings = {};

const readableReviewsStream = fs.createReadStream('head/reviews.csv');
const readableProductStream = fs.createReadStream('head/product.csv');
const readablePhotosStream = fs.createReadStream('head/reviews_photos.csv');

// populate reviews table
readableReviewsStream
    .pipe(parser())
    .on('data', (data) => reviewResults.push(data))
    .on('end', () => {

        const text = `INSERT INTO reviews (review_id, rating, summary, recommend, response, body, date, reviewer_name, reviewer_email, helpfulness, product_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

        for (let i = 0; i < reviewResults.length; i++) {
            let { id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness } = reviewResults[i];
            let transformedDate = new Date(Number(date))
            let values = [id, rating, summary, recommend, response, body, transformedDate, reviewer_name, reviewer_email, helpfulness, product_id];
            pool.query(text, values, (err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        // populates product id array
        readableProductStream
            .pipe(parser())
            .on('data', (data) => productIds.push(data.id))
            .on('end', () => {
                productIds.forEach((id) => {
                    let recommendedTally = {
                        true: 0,
                        false: 0
                    }
                    let ratingTally = {
                        '1': 0,
                        '2': 0,
                        '3': 0,
                        '4': 0,
                        '5': 0
                    }
                    let filteredReviews = reviewResults.filter((review) => {
                        return review.product_id === id
                    })
                    
                    // populates recommended object
                    filteredReviews.forEach((filteredReview) => {
                        if (filteredReview.recommend === 'true') {
                            recommendedTally['true']++
                        } else if (filteredReview.recommend === 'false') {
                            recommendedTally['false']++
                        }
                    })
                    recommended[id] = recommendedTally;

                    // populates ratings object
                    filteredReviews.forEach((filteredReview) => {
                        console.log(filteredReview)
                        if (filteredReview['rating'] === '1') {
                            ratingTally['1']++
                        } else if (filteredReview['rating'] === '2') {
                            ratingTally['2']++
                        } else if (filteredReview['rating'] === '3') {
                            ratingTally['3']++
                        } else if (filteredReview['rating'] === '4') {
                            ratingTally['4']++
                        } else if (filteredReview['rating'] === '5') {
                            ratingTally['5']++
                        }
                    })
                    ratings[id] = ratingTally;
                    
                })

                // populate recommended table
                const recommendedSQL = 'INSERT INTO recommended (product_id, "true", "false") VALUES ($1, $2, $3)';
                for (let productId in recommended) {
                    let trueCount = recommended[productId]['true'];
                    let falseCount = recommended[productId]['false']
                    let values = [productId, trueCount, falseCount];
                    pool.query(recommendedSQL, values, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

                // populate ratings table
                const ratingsSQL = 'INSERT INTO ratings (product_id, "1", "2", "3", "4", "5") VALUES ($1, $2, $3, $4, $5, $6)';
                for (let productId in ratings) {
                    let one = ratings[productId]['1'];
                    let two = ratings[productId]['2'];
                    let three = ratings[productId]['3'];
                    let four = ratings[productId]['4'];
                    let five = ratings[productId]['5'];
                    let values = [productId, one, two, three, four, five];
                    pool.query(ratingsSQL, values, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            })
    });

// populate photos table
readablePhotosStream
    .pipe(parser())
    .on('data', (data) => photoResults.push(data))
    .on('end', () => {
        const text = 'INSERT INTO photos (id, url, review_id) VALUES ($1, $2, $3)';
        for (let i = 0; i < photoResults.length; i++) {
            let { id, review_id, url } = photoResults[i];
            let values = [Number(id), url, Number(review_id)];
            pool.query(text, values, (err, res) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    });

setTimeout(() => {
    pool.end()
}, 1000)

