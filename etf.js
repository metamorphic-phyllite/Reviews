const fs = require('fs');
const pool = require('./db.js');
const parser = require('csv-parser');

const reviewResults = [];
const productIds = [];
const photoResults = [];
const recommended = {};

const readableReviewsStream = fs.createReadStream('head/reviews.csv');
const readableProductStream = fs.createReadStream('head/product.csv');
const readablePhotosStream = fs.createReadStream('head/reviews_photos.csv');

// populate reviews table
readableReviewsStream
    .pipe(parser())
    .on('data', (data) => reviewResults.push(data))
    .on('end', () => {

        const text = `INSERT INTO reviews 
                      (review_id, rating, summary, recommend, response, body, date, reviewer_name, reviewer_email, helpfulness, product_id) 
                      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

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

        // populate recommended meta data
        readableProductStream
            .pipe(parser())
            .on('data', (data) => productIds.push(data.id))
            .on('end', () => {
                productIds.forEach((id) => {
                    console.log(recommended);
                    let recommendedTally = {
                        true: 0,
                        false: 0
                    }

                    let filteredReviews = reviewResults.filter((review) => {
                        return review.product_id === id
                    })
                    
                    filteredReviews.forEach((filteredReview) => {
                        if (filteredReview.recommend === 'true') {
                            recommendedTally['true']++
                        } else if (filteredReview.recommend === 'false') {
                            recommendedTally['false']++
                        }
                    })

                    recommended[id] = recommendedTally;
                })
                console.log(recommended);
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

