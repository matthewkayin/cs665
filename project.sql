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
    due_date DATE NOT NULL,
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
    due_date DATE NOT NULL,
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
    due_date DATE NOT NULL,
    PRIMARY KEY (copy_number),
    FOREIGN KEY(card_number) REFERENCES customers(card_number)
);

INSERT INTO books (isbn, title, author, due_date)
            VALUES ("0000000000", "Jane Eyre", "Charlotte Bronte", CURDATE()),
                   ("0000000001", "The Lord of the Rings", "JRR Tolkein", CURDATE()),
                   ("0000000002", "The Remains of the Day", "Kazuo Ishiguro", CURDATE()),
                   ("0000000003", "Dune", "Frank Herbert", CURDATE());

INSERT INTO movies (title, year, star, genre, due_date)
            VALUES ("Star Wars", 1975, "Mark Hammill", "Sci-Fi", CURDATE()),
                   ("The Social Network", 2010, "Jesse Eisenberg", "Drama", CURDATE()),
                   ("Parasite", 2019, "Song Kang-ho", "Drama", CURDATE()),
                   ("Knives Out", 2019, "Ana de Armas", "Mystery", CURDATE());

INSERT INTO albums (title, artist, genre, release_date, due_date)
            VALUES ("Petals for Armor", "Hayley Williams", "Pop", CURDATE(), CURDATE()),
                   ("With Teeth", "Nine Inch Nails", "Rock", CURDATE(), CURDATE()),
                   ("Melodrama", "Lorde", "Pop", CURDATE(), CURDATE()),
                   ("American Football", "American Football", "Indie", CURDATE(), CURDATE());
