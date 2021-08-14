const pool = require('../db.js');

pool.query('ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)', (err, res) => {
    if (err) {
        console.log(err);
    }
})

pool.query('ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id)', (err, res) => {
    if (err) {
        console.log(err);
    }
})