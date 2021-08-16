const pool = require('../../db.js');

 exports.postReview = async (req, res) => {
    console.log(req.body);
    let currentDate = Date.now().toString();

    let getMaxReviewId = await pool.query('SELECT * FROM reviews WHERE id=(SELECT MAX(id) FROM reviews)')
    let maxReviewId = getMaxReviewId.rows[0].id

    let getMaxPhotoId = await pool.query('SELECT * FROM photos WHERE id=(SELECT MAX(id) FROM photos)')
    let maxPhotoId = getMaxPhotoId.rows[0].id

    let getMaxCharacteristicReviewId = await pool.query('SELECT * FROM characteristic_reviews WHERE id=(SELECT MAX(id) FROM characteristic_reviews)')
    let maxCharacteristicReviewId = getMaxCharacteristicReviewId.rows[0].id
    
    const text = `INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    let values = [maxReviewId + 1, req.body.product_id.toString(), req.body.rating, currentDate, req.body.summary, req.body.body, req.body.recommend, false, req.body.name, req.body.email, 'null', 0];
    pool.query(text, values)
        .then((result) => {
            console.log(result.rows[0]);

            req.body.photos.forEach(async (photo) => {
                maxPhotoId = maxPhotoId + 1
                const text = 'INSERT INTO photos (id, review_id, url) VALUES ($1, $2, $3)'
                let values = [maxPhotoId, maxReviewId + 1, photo]
                try {
                    await pool.query(text, values)
                } catch(err) {
                    console.log(err);
                }
            })

            for (let id in req.body.characteristics) {
                maxCharacteristicReviewId = maxCharacteristicReviewId + 1
                const text = 'INSERT INTO characteristic_reviews (id, characteristic_id, review_id, value) VALUES ($1, $2, $3, $4)'
                let values = [maxCharacteristicReviewId, id, maxReviewId + 1, req.body.characteristics[id]]
                pool.query(text, values)
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
        .then(() => {
            res.send('Review successfully posted to database');
        })
}