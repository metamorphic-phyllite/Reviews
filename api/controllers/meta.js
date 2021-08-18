const pool = require('../../db.js');

exports.getMetadata = async (req, res) => {
    let response = {
        product_id: req.query.product_id,
        ratings: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': ''
        },
        recommended: {
            'true': '',
            'false': ''
        },
        characteristics: {}
    }

    let setRatingsData = async (productId) => {
        let ratingData = await pool.query(
            `SELECT * FROM reviews WHERE product_id='${productId}'`
        );
        let ratingsTally = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
        }
        let recommendedTally = {
            'true': 0,
            'false': 0
        }
        ratingData.rows.forEach((review) => {
            review.recommend === true ? recommendedTally['true']++ : recommendedTally['false']++

            review.rating === 1 ? ratingsTally['1']++ :
            review.rating === 2 ? ratingsTally['2']++ :
            review.rating === 3 ? ratingsTally['3']++ :
            review.rating === 4 ? ratingsTally['4']++ :
            review.rating === 5 ? ratingsTally['5']++ : ''
        })
        for (let key in ratingsTally) {
            response.ratings[key] = ratingsTally[key].toString()
        }
        response.recommended['true'] = recommendedTally['true'].toString();
        response.recommended['false'] = recommendedTally['false'].toString();
        res.send(response);
    }
    
    let productId = Number(req.query.product_id);

    let characteristics = await pool.query(
        `SELECT * FROM characteristics WHERE product_id=${productId}`
    );
    characteristics.rows.forEach(async (characteristic) => {
        let name = characteristic.name;
        let characteristicId = characteristic.id
        let characteristicReviews = await pool.query(
            `SELECT * FROM characteristic_reviews WHERE characteristic_id=${characteristic.id}`
        );
        let total = 0;
        characteristicReviews.rows.forEach(row => {
            total += row.value
        })
        let average = total === 0 ? 0 : total / characteristicReviews.rows.length
        response['characteristics'][name] = {
            id: characteristicId,
            value: average.toString()
        }
        if (characteristics.rows.indexOf(characteristic) === characteristics.rows.length - 1) {
            setRatingsData(response.product_id)
        }
    })
}