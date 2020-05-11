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
    card_number INT,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    due_date DATE,
    PRIMARY KEY (copy_number),
    FOREIGN KEY(card_number) REFERENCES customers(card_number)
);

CREATE TABLE movies(

    copy_number INT NOT NULL AUTO_INCREMENT,
    card_number INT,
    title VARCHAR(255) NOT NULL,
    year SMALLINT NOT NULL,
    genre VARCHAR(255) NOT NULL,
    star VARCHAR(255) NOT NULL,
    due_date DATE,
    PRIMARY KEY (copy_number),
    FOREIGN KEY(card_number) REFERENCES customers(card_number)
);

CREATE TABLE albums(

    copy_number INT NOT NULL AUTO_INCREMENT,
    card_number INT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    due_date DATE,
    PRIMARY KEY (copy_number),
    FOREIGN KEY(card_number) REFERENCES customers(card_number)
);

INSERT INTO customers (first_name, last_name, email, address)
            VALUES ("Matt", "Madden", "matt@madden.com", "1023 S Other St."),
                   ("Matt", "Drummond", "matt@drummond.com", "2050 W Main St."),
                   ("Angel", "Lopez", "angel@lopez.com", "3033 E Sesame St.");

INSERT INTO books (isbn, title, author, due_date, card_number)
            VALUES ("0000000000", "Jane Eyre", "Charlotte Bronte", STR_TO_DATE("5/22/2020", "%m/%d/%Y"), 1),
                   ("0000000001", "The Lord of the Rings", "JRR Tolkein", NULL, NULL),
                   ("0000000002", "The Lies of Locke Lamora", "Scott Lynch", NULL, NULL),
                   ("0000000003", "Harry Potter and the Half Blood Prince", "JK Rowling", NULL, NULL),
                   ("0000000004", "Pride and Prejudice", "Jane Austen", NULL, NULL),
                   ("0000000005", "Fahrenheit 451", "Ray Bradbury", NULL, NULL),
                   ("0000000006", "The Girl With the Dragon Tattoo", "Steig Larson", NULL, NULL),
                   ("0000000007", "The Name of the Wind", "Patrick Rothfuss", NULL, NULL),
                   ("0000000008", "The Remains of the Day", "Kazuo Ishiguro", NULL, NULL),
                   ("0000000009", "Dune", "Frank Herbert", NULL, NULL);

INSERT INTO movies (title, year, star, genre, due_date, card_number)
            VALUES ("Parasite", 2019, "Song Kang-ho", "Drama", NULL, NULL);

INSERT INTO albums (title, artist, genre, release_date, due_date, card_number)
            VALUES ("Petals for Armor", "Hayley Williams", "Pop", NULL, NULL);
