const pool = require('../../db.js');

exports.reported = async (req, res) => {
    try {
        let review_id = Number(req.params.review_id);
        const updateReported = pool.query(`UPDATE reviews SET reported=true WHERE id=${review_id} RETURNING *`)
        res.send('Review now marked as reported.')
    } catch(err) {
        console.log(err);
    }
}