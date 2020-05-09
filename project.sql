DROP DATABASE IF EXISTS cs665;
CREATE DATABASE cs665;
USE cs665;

CREATE TABLE customers(

    card_number INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(1023) NOT NULL,
    PRIMARY KEY (card_number)
);

CREATE TABLE books(

    copy_number INT NOT NULL AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    PRIMARY KEY (copy_number)
);

CREATE TABLE movies(

    copy_number INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    year SMALLINT NOT NULL,
    genre VARCHAR(255) NOT NULL,
    star VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    PRIMARY KEY (copy_number)
);

CREATE TABLE albums(

    copy_number INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    due_date DATE NOT NULL,
    PRIMARY KEY (copy_number)
);
