const fs = require('fs');
const pool = require('./db.js');
const parser = require('csv-parser');
const { reviews, characteristics } = require('./schemas/postgres_schema.js');

const readableCharacteristicsStream = fs.createReadStream('head/characteristics.csv');
const readableCharacteristicReviewsStream = fs.createReadStream('head/characteristic_reviews.csv');

// for (let i = 0; i < 5; i++) {
    pool.query(`SELECT * FROM characteristics WHERE product_id=${177}`)
    .then((res) => {
        // console.log(res.rows);
        res.rows.forEach((characteristic) => {
            let name = characteristic.name;
            let characteristicId = characteristic.id
            pool.query(`SELECT * FROM characteristic_reviews WHERE characteristic_id=${characteristic.id}`)
                .then((res) => {
                    // console.log(res.rows);
                    let total = 0;
                    res.rows.forEach((row) => {
                        total += row.value
                    })
                    let average = total === 0 ? 0 : total / res.rows.length
                    console.log(characteristicId, name, average);
                    pool.query(`INSERT INTO characteristic_average (characteristic_id, average) VALUES (${Number(characteristicId)}, ${average})`)
                        .then((res) => {
                            console.log('characteristic average inserted into database')
                        })
                })
        })
    })
// }

