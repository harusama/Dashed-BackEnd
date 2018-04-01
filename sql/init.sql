CREATE TABLE campus (
  id SERIAL PRIMARY KEY,
  state VARCHAR(100),
  region VARCHAR(100),
  district VARCHAR(100),
  name VARCHAR(100)
);

CREATE TYPE user_kind AS ENUM('admin', 'teacher');
CREATE TYPE user_gender AS ENUM('male', 'female', 'other');
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  username VARCHAR(100),
  email VARCHAR(100),
  password TEXT,
  gender user_gender NOT NULL DEFAULT 'other',
  kind user_kind NOT NULL DEFAULT 'teacher',
  experience INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_experience_number CHECK (experience >= 0),
  coins INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_coins_number CHECK (coins >= 0),
  campus_id BIGINT REFERENCES campus(id) ON DELETE SET NULL
);