CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(80) NOT NULL,
    biography TEXT,
    user_profile_picture BLOB
);
CREATE TABLE IF NOT EXISTS genre (
    genre_name VARCHAR(20) PRIMARY KEY,
    parent_genre VARCHAR(20),
    CONSTRAINT FOREIGN KEY (parent_genre) 
        REFERENCES genre(genre_name)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS band (
    band_id INT AUTO_INCREMENT NOT NULL,
    band_name VARCHAR(30) NOT NULL,
    band_biography TEXT,
    band_genre VARCHAR(20) NOT NULL,
    max_members TINYINT UNSIGNED NOT NULL,
    band_profile_picture BLOB,
    PRIMARY KEY (band_id),
    CONSTRAINT FOREIGN KEY (band_genre) REFERENCES genre(genre_name)
);
CREATE TABLE IF NOT EXISTS instrument (
    instrument_name VARCHAR(20) PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS user_proficiency (
    username VARCHAR(20) NOT NULL,
    instrument_name VARCHAR(20),
    proficiency_level TINYINT UNSIGNED NOT NULL,
    CONSTRAINT FOREIGN KEY (username) REFERENCES user(username)
);
CREATE TABLE IF NOT EXISTS band_membership (
    username VARCHAR(20) NOT NULL,
    band_id INT NOT NULL,
    is_band_leader BOOLEAN,
    CONSTRAINT FOREIGN KEY (username) REFERENCES user(username),
    CONSTRAINT FOREIGN KEY (band_id) REFERENCES band(band_id)
);