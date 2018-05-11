CREATE TABLE states (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   key VARCHAR(10) UNIQUE NOT NULL,
   name TEXT DEFAULT ''
);

CREATE TABLE regions (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   key VARCHAR(10) UNIQUE NOT NULL,
   name TEXT DEFAULT '',
   state_id BIGINT REFERENCES states(id)
);

CREATE TABLE districts (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   number VARCHAR(10) UNIQUE NOT NULL,
   name TEXT DEFAULT '',
   kind TEXT DEFAULT '',
   street TEXT DEFAULT '',
   city TEXT DEFAULT '',
   state TEXT DEFAULT '',
   zip TEXT DEFAULT '',
   phone TEXT DEFAULT '',
   fax TEXT DEFAULT '',
   email TEXT DEFAULT '',
   webpage TEXT DEFAULT '',
   superintendent TEXT DEFAULT '',
   region_id BIGINT REFERENCES regions(id)
);

CREATE TABLE campus (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   number VARCHAR(10) UNIQUE NOT NULL,
   name TEXT DEFAULT '',
   kind TEXT DEFAULT '',
   charter_type TEXT DEFAULT '',
   street TEXT DEFAULT '',
   city TEXT DEFAULT '',
   state TEXT DEFAULT '',
   zip TEXT DEFAULT '',
   phone TEXT DEFAULT '',
   fax TEXT DEFAULT '',
   email TEXT DEFAULT '',
   webpage TEXT DEFAULT '',
   principal TEXT DEFAULT '',
   grade_range TEXT DEFAULT '',
   enrollment TEXT DEFAULT '',
   district_id BIGINT REFERENCES districts(id)
);

CREATE TYPE user_kind AS ENUM('admin', 'teacher');
CREATE TYPE user_gender AS ENUM('male', 'female', 'other');
CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   username VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   password TEXT DEFAULT '',
   token TEXT DEFAULT '',
   active BOOLEAN DEFAULT FALSE,
   gender user_gender NOT NULL DEFAULT 'other',
   kind user_kind NOT NULL DEFAULT 'teacher',
   experience INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_experience_number CHECK (experience >= 0),
   coins INTEGER NOT NULL DEFAULT 0 CONSTRAINT valid_coins_number CHECK (coins >= 0),
   campus_id BIGINT REFERENCES campus(id)
);

CREATE TABLE hashes (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   hash TEXT DEFAULT '',
   user_id BIGINT REFERENCES users(id)
);

CREATE TABLE subjects (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   name VARCHAR(100) UNIQUE,
   campus_type VARCHAR(100),
   general_topic VARCHAR(100),
   content_name VARCHAR(100),
   content_description TEXT DEFAULT ''
);

CREATE TABLE units (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_unit CHECK (number >= 0),
   name TEXT DEFAULT '',
   description TEXT DEFAULT '',
   subject_id BIGINT REFERENCES subjects(id)
);

CREATE TABLE chapters (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_chapter CHECK (number >= 0),
   name TEXT DEFAULT '',
   description TEXT DEFAULT '',
   unit_id BIGINT REFERENCES units(id)
);

CREATE TABLE lessons (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   number INTEGER DEFAULT 0 CONSTRAINT valid_number_lesson CHECK (number >= 0),
   name TEXT DEFAULT '',
   description TEXT DEFAULT '',
   resource TEXT DEFAULT '',
   chapter_id BIGINT REFERENCES chapters(id)
);

CREATE TYPE post_kind AS ENUM('question', 'resource', 'content', 'testimony');
CREATE TABLE posts (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   title TEXT DEFAULT '',
   description TEXT DEFAULT '',
   ranking INTEGER DEFAULT 0 CONSTRAINT valid_ranking_number CHECK (ranking >= 0),
   resource TEXT DEFAULT '',
   kind post_kind,
   upvotes INTEGER DEFAULT 0 CONSTRAINT valid_upvotes_number CHECK (upvotes >= 0),
   downvotes INTEGER DEFAULT 0 CONSTRAINT valid_downvotes_number CHECK (downvotes >= 0),
   user_id BIGINT REFERENCES users(id),
   subject_id BIGINT REFERENCES subjects(id)
);

CREATE TABLE comments (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   description TEXT DEFAULT '',
   upvotes INTEGER DEFAULT 0 CONSTRAINT valid_upvotes_number CHECK (upvotes >= 0),
   downvotes INTEGER DEFAULT 0 CONSTRAINT valid_downvotes_number CHECK (downvotes >= 0),
   user_id BIGINT REFERENCES users(id),
   post_id BIGINT REFERENCES posts(id)
);

CREATE TABLE news (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   name TEXT DEFAULT '',
   kind VARCHAR(100),
   resource TEXT DEFAULT '',
   date_published TEXT DEFAULT '',
   user_id BIGINT REFERENCES users(id),
   subject_id BIGINT REFERENCES subjects(id),
   state_id BIGINT REFERENCES states(id),
   region_id BIGINT REFERENCES regions(id),
   district_id BIGINT REFERENCES districts(id)
);

CREATE TABLE questions (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   description_text VARCHAR(100),
   description_image VARCHAR(100),
   kind INTEGER CONSTRAINT valid_kind_question CHECK (kind >= 1 AND kind <= 9),
   approved BOOLEAN DEFAULT FALSE,
   approved_times INTEGER DEFAULT 0 CONSTRAINT valid_approved_times_number CHECK (approved_times >= 0),
   user_id BIGINT REFERENCES users(id),
   lesson_id BIGINT REFERENCES lessons(id)
);

CREATE TABLE evaluation_questions (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   description TEXT DEFAULT '',
   kind INTEGER CONSTRAINT valid_kind_evaluation_question CHECK (kind >= 1 AND kind <= 9)
);

CREATE TABLE evaluations (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   score INTEGER DEFAULT 0 CONSTRAINT valid_evaluation_score CHECK (score >= 0),
   question_id BIGINT REFERENCES questions(id),
   user_id BIGINT REFERENCES users(id),
   evaluation_question_id BIGINT REFERENCES evaluation_questions(id)
);

CREATE TABLE approvals (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   question_id BIGINT REFERENCES questions(id),
   user_id BIGINT REFERENCES users(id)
);

CREATE TABLE answers (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   index INTEGER CONSTRAINT valid_index_number CHECK (index >= 1 AND index <= 20),
   text VARCHAR(100),
   question_id BIGINT REFERENCES questions(id)
);

CREATE TABLE users_subjects (
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   user_id BIGINT REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL,
   subject_id BIGINT REFERENCES subjects(id) ON UPDATE CASCADE,
   CONSTRAINT users_subjects_pkey PRIMARY KEY (user_id, subject_id)
);

CREATE TYPE error_kind AS ENUM('system', 'question');
CREATE TABLE errors (
   id BIGSERIAL PRIMARY KEY,
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   kind error_kind,
   description TEXT DEFAULT '',
   question_id BIGINT REFERENCES questions(id),
   user_id BIGINT REFERENCES users(id)
);