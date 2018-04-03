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
   campus_id BIGINT REFERENCES campus(id)
);

CREATE TABLE hashes (
   id BIGSERIAL PRIMARY KEY,
   hash TEXT,
   user_id BIGINT REFERENCES users(id)
);

CREATE TABLE subjects (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(100)
   -- name TEXT,
   -- description TEXT,
);

CREATE TABLE units (
   id BIGSERIAL PRIMARY KEY,
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_number CHECK (number >= 0),
   name TEXT,
   description TEXT,
   subject_id BIGINT REFERENCES subjects(id)
);

CREATE TABLE chapters (
   id BIGSERIAL PRIMARY KEY,
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_number CHECK (number >= 0),
   name TEXT,
   description TEXT,
   unit_id BIGINT REFERENCES units(id)
);

CREATE TABLE lessons (
   id BIGSERIAL PRIMARY KEY,
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_number CHECK (number >= 0),
   name TEXT,
   description TEXT,
   chapter_id BIGINT REFERENCES chapters(id)
);


CREATE TABLE questions (
   id BIGSERIAL PRIMARY KEY,
   description_text VARCHAR(100),
   description_image VARCHAR(100),
   kind INTEGER CONSTRAINT valid_kind_number CHECK (kind >= 1 AND kind <= 9),
   approved INTEGER DEFAULT 0 CONSTRAINT valid_approved_number CHECK (approved >= 0),
   user_id BIGINT REFERENCES users(id),
   subject_id BIGINT REFERENCES subjects(id)
   -- lesson_id BIGINT REFERENCES lessons(id)
);

CREATE TABLE answers (
   id BIGSERIAL PRIMARY KEY,
   index INTEGER CONSTRAINT valid_index_number CHECK (index >= 1 AND index <= 20),
   text VARCHAR(100),
   question_id BIGINT REFERENCES questions(id)
);
