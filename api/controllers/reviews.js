const pool = require('../../db.js');

exports.getReviews = async (req, res) => {
    let reviews = {
        product: req.query.product_id,
        page: req.query.page ? req.query.page : 0,
        count: req.query.count ? req.query.count : 5,
        result: []
    }

    let reviewsData = await pool.query(`SELECT * FROM reviews WHERE product_id='${req.query.product_id}'`);
    await Promise.all(
        reviewsData.rows.map(async (review) => {
            let photoData = await pool.query(`SELECT * FROM photos WHERE review_id='${review.id}'`);
            photoData = photoData.rows.map((photo) => {
                return {
                    id: photo.id,
                    url: photo.url
                }
            })
            let date = new Date(Number(review.date));
            let resultObj = {
                review_id: review.id,
                rating: review.rating,
                summary: review.summary,
                recommend: review.recommend,
                response: review.response,
                body: review.body,
                date: date,
                reviewer_name: review.reviewer_name,
                helpfulness: review.helpfulness,
                photos: photoData
            };
            return resultObj;
        })
    )
    .then((values) => {
        if (req.query.sort == "'newest'") {
            values.sort((a, b) => {
                return b.date.getTime() - a.date.getTime()
            })
            return values;
        } else if (req.query.sort === "'helpful'") {
            values.sort((a, b) => {
                return b.helpfulness - a.helpfulness
            })
            return values
        } else if (req.query.sort === "'relevant'") {

        }
    })
    .then((sortedValues) => {
        let startingIndex = reviews.page * reviews.count;
        return sortedValues.splice(startingIndex, reviews.count);
    })
    .then((sortedAndTrimmedValues) => {
        reviews.result = sortedAndTrimmedValues;
        res.send(reviews)
    })
}