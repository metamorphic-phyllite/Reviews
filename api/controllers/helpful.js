const pool = require('../../db.js');

exports.helpful = async (req, res) => {
    try {
        let review_id = Number(req.params.review_id);
        const getHelpfulness = await pool.query(`SELECT (helpfulness) FROM reviews WHERE id=${review_id}`)
        let currentHelpfulness = getHelpfulness.rows[0].helpfulness
        const updateHelpfulness = await pool.query(`UPDATE reviews SET helpfulness=${currentHelpfulness + 1} WHERE id=${review_id} RETURNING *`)
        console.log(updateHelpfulness);
        res.send(updateHelpfulness.statusCode)
    } catch(err) {
        console.log(err);
    }
}