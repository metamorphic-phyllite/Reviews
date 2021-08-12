module.exports = {
    reviews: `CREATE TABLE reviews (
        review_id int NOT NULL,
        rating int,
        summary text,
        recommend boolean,
        response text,
        body text,
        date date,
        reviewer_name varchar(255),
        reviewer_email varchar(255),
        helpfulness int,
        product_id varchar(255),
        recommended_id int,
        characteristics_id int,
        PRIMARY KEY (review_id)
    )`,

    photos: `CREATE TABLE photos (
        id int NOT NULL,
        url text,
        review_id int,
        PRIMARY KEY (id)
    )`,

    ratings: `CREATE TABLE ratings (
        id serial NOT NULL,
        product_id varchar(255),
        "1" varchar(255),
        "2" varchar(255),
        "3" varchar(255),
        "4" varchar(255),
        "5" varchar(255),
        PRIMARY KEY (id)
    )`,

    recommended: `CREATE TABLE recommended (
        id serial NOT NULL,
        product_id varchar(255),
        "true" varchar(255),
        "false" varchar(255),
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