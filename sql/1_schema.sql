CREATE TABLE campus (
   id BIGSERIAL PRIMARY KEY,
   state VARCHAR(100),
   region VARCHAR(100),
   district VARCHAR(100),
   name VARCHAR(100)
);

CREATE TYPE user_kind AS ENUM('admin', 'teacher');
CREATE TYPE user_gender AS ENUM('male', 'female', 'other');
CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   username VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   password TEXT,
   active BOOLEAN DEFAULT FALSE,
   gender user_gender NOT NULL DEFAULT 'other',
   kind user_kind NOT NULL DEFAULT 'teacher',
   experience INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_experience_number CHECK (experience >= 0),
   coins INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_coins_number CHECK (coins >= 0),
   campus_id BIGINT DEFAULT 0 REFERENCES campus(id)
);

CREATE TABLE hashes (
   id BIGSERIAL PRIMARY KEY,
   hash TEXT,
   user_id BIGINT DEFAULT 0 REFERENCES users(id)
);

CREATE TABLE questions (
   id BIGSERIAL PRIMARY KEY,
   textDescription VARCHAR(100),
   imageDescription VARCHAR(100),
   kind INTEGER DEFAULT 0 CONSTRAINT valid_kind_number CHECK (kind >= 0),
   correctSequence VARCHAR(100),
   user_id BIGINT DEFAULT 0 REFERENCES users(id)
);

CREATE TABLE answers (
   id BIGSERIAL PRIMARY KEY,
   answerNumber INT(11),
   textDescription VARCHAR(100),
   question_id BIGINT DEFAULT 0 REFERENCES questions(id)
);
