const pool = require('./db.js');
const { reviews, photos, ratings, recommended, characteristic_reviews, characteristics } = require('./schemas/postgres_schema');

// drop reviews
pool.query('DROP TABLE reviews', (err, res) => {
    // rebuild reviews
    pool.query(reviews, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

// drop photos
pool.query('DROP TABLE photos', (err, res) => {
    // rebuild photos
    pool.query(photos, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

// drop ratings
pool.query('DROP TABLE ratings', (err, res) => {
    // rebuild ratings
    pool.query(ratings, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

// drop recommended
pool.query('DROP TABLE recommended', (err, res) => {
    // rebuild recommended
    pool.query(recommended, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

// drop characteristic_reviews
pool.query('DROP TABLE characteristic_reviews', (err, res) => {
    // rebuild characteristic_reviews
    pool.query(characteristic_reviews, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

// drop characteristics
pool.query('DROP TABLE characteristics', (err, res) => {
    // rebuild characteristics
    pool.query(characteristics, (err, res) => {
        console.log(err, res)
    })
    console.log(err, res)
})

setTimeout(() => {
    pool.end()
}, 1000)