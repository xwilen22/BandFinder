CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    biography TEXT,
    user_profile_picture BLOB,
    band_id INT,
    CONSTRAINT FOREIGN KEY band_id REFERENCES band (band_id)
);
CREATE TABLE IF NOT EXISTS band(
    band_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    band_name VARCHAR(30) NOT NULL,
    band_biography TEXT,
    band_genre_name VARCHAR(20),
    max_members TINYINT UNSIGNED NOT NULL,
    band_profile_picture BLOB,
    band_leader_username VARCHAR(20),
    CONSTRAINT FOREIGN KEY band_leader_username REFERENCES user (username)
);
CREATE TABLE IF NOT EXISTS instrument (
    instrument_name VARCHAR(20) PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS user_proficency (
    username VARCHAR(20),
    instrument_name VARCHAR(20),
    proficency_level TINYINT UNSIGNED NOT NULL,
    CONSTRAINT FOREIGN KEY username REFERENCES user (username)
);
CREATE TABLE IF NOT EXISTS genre (
    genre_name VARCHAR(20),
    parent_genre VARCHAR(20),
    CONSTRAINT FOREIGN KEY parent_genre REFERENCES genre (genre_name)
);