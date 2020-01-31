CREATE TABLE User (
    user_name VARCHAR(20) PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    biography TEXT,
    user_profile_picture BLOB
)