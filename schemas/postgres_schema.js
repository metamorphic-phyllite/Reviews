module.exports = {
    reviews: `CREATE TABLE reviews (
        review_id int NOT NULL,
        rating int,
        summary char,
        recommend boolean,
        response char,
        body char,
        date date,
        reviewer_name char,
        helpfulness int,
        product_id int,
        recommended_id int,
        characteristics_id int,
        PRIMARY KEY (review_id)
    )`,

    photos: `CREATE TABLE photos (
        id int NOT NULL,
        url char,
        review_id int,
        PRIMARY KEY (id)
    )`,

    ratings: `CREATE TABLE ratings (
        id int NOT NULL,
        product_id int,
        "1" char,
        "2" char,
        "3" char,
        "4" char,
        "5" char,
        PRIMARY KEY (id)
    )`,

    recommended: `CREATE TABLE recommended (
        id int NOT NULL,
        product_id int,
        "true" char,
        "false" char,
        PRIMARY KEY (id)
    )`,

    characteristic_reviews: `CREATE TABLE characteristic_reviews (
        id int NOT NULL,
        characteristic_id int,
        review_id int,
        value int,
        PRIMARY KEY (id)
    )`,

    characteristics: `CREATE TABLE characteristics (
        id int NOT NULL,
        product_id int,
        name char,
        average_value char,
        PRIMARY KEY (id)
    )`
}