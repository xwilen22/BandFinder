CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(80) NOT NULL,
    biography TEXT,
    user_profile_picture BLOB
);
CREATE TABLE IF NOT EXISTS band_membership(
    username VARCHAR(20),
    band_id VARCHAR(30),
    is_band_leader BOOLEAN,
    CONSTRAINT FOREIGN KEY username REFERENCES user (username),
    CONSTRAINT FOREIGN KEY band_id REFERENCES band (band_id)
)
CREATE TABLE IF NOT EXISTS band(
    band_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    band_name VARCHAR(30) NOT NULL,
    band_biography TEXT,
    band_genre VARCHAR(20),
    max_members TINYINT UNSIGNED NOT NULL,
    band_profile_picture BLOB,
    CONSTRAINT FOREIGN KEY band_genre REFERENCES genre (genre_name)
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