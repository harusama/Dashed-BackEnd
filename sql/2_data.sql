-- State inserts
INSERT INTO states (key, name) VALUES ('TX', 'Texas');
INSERT INTO states (key, name) VALUES ('FL', 'Florida');
INSERT INTO states (key, name) VALUES ('CA', 'California');

-- Region inserts
INSERT INTO regions (key, name, state_id) VALUES ('TX001', 'Region 1 TX', 1);
INSERT INTO regions (key, name, state_id) VALUES ('TX002', 'Region 2 TX', 1);
INSERT INTO regions (key, name, state_id) VALUES ('FL001', 'Region 1 FL', 2);
INSERT INTO regions (key, name, state_id) VALUES ('CA001', 'Region 1 CA', 3);

-- Distric inserts
INSERT INTO districts (number, name, kind, street, city, state, zip, phone, fax, email, webpage, superintendent, region_id)
VALUES ('1902', 'CAYUGA ISD', 'INDEPENDENT', 'P O BOX 427', 'CAYUGA', 'TX', '75832-0427', '(903) 928-2102', '(903) 928-2646', 'district1@cayugaisd.com', 'www.cayugaisd.com', 'CAYUGA', 1);

INSERT INTO districts (number, name, kind, street, city, state, zip, phone, fax, email, webpage, superintendent, region_id)
VALUES ('1903', 'CAYUGA ISD', 'CHARTER', 'P O BOX 427', 'MCALLEN', 'TX', '75832-0428', '(903) 928-2103', '(903) 928-2647', 'district2@cayugaisd.com', 'www.cayugaisd.com', 'MCALLEN', 2);

INSERT INTO districts (number, name, kind, street, city, state, zip, phone, fax, email, webpage, superintendent, region_id)
VALUES ('1904', 'CAYUGA ISD', 'COMMON', 'P O BOX 427', 'DISNEY', 'FL', '75832-0429', '(903) 928-2104', '(903) 928-2648', 'district3@cayugaisd.com', 'www.cayugaisd.com', 'DISNEY', 3);

INSERT INTO districts (number, name, kind, street, city, state, zip, phone, fax, email, webpage, superintendent, region_id)
VALUES ('1905', 'CAYUGA ISD', 'TJJD', 'P O BOX 427', 'CARLSBAD', 'CA', '75832-0430', '(903) 928-2105', '(903) 928-2649', 'district4@cayugaisd.com', 'www.cayugaisd.com', 'CARLSBAD', 4);

INSERT INTO districts (number, name, kind, street, city, state, zip, phone, fax, email, webpage, superintendent, region_id)
VALUES ('1906', 'CAYUGA ISD', 'TSD/TSBVI', 'P O BOX 427', 'LOS ANGLES', 'CA', '75832-0431', '(903) 928-2106', '(903) 928-2650', 'district5@cayugaisd.com', 'www.cayugaisd.com', 'LOS ANGLES', 4);

-- Campus inserts
INSERT INTO campus (number, name, kind, charter_type, street, city, state, zip, phone, fax, email, webpage, principal, grade_range, enrollment, district_id)
VALUES ('001902001', 'Campus 1', 'REGULAR INSTRUCTIONAL', '', 'P O BOX 127', 'City 1', 'TX', '75832-0427', '(903) 928-2294 ext:012', '(903) 928-2239', 'admin1@cayugaisd.com', 'www.cayugaisd.com', 'MR RUSSELL HOLDEN', '09-12', '171', 1);

INSERT INTO campus (number, name, kind, charter_type, street, city, state, zip, phone, fax, email, webpage, principal, grade_range, enrollment, district_id)
VALUES ('001903002', 'Campus 2', 'REGULAR INSTRUCTIONAL', '', 'P O BOX 227', 'City 2', 'TX', '75832-0427', '(903) 928-2294 ext:012', '(903) 928-2239', 'admin2@cayugaisd.com', 'www.cayugaisd.com', 'MR RUSSELL HOLDEN', '09-12', '172', 2);

INSERT INTO campus (number, name, kind, charter_type, street, city, state, zip, phone, fax, email, webpage, principal, grade_range, enrollment, district_id)
VALUES ('001904003', 'Campus 3', 'REGULAR INSTRUCTIONAL', '', 'P O BOX 327', 'City 3', 'FL', '75832-0427', '(903) 928-2294 ext:012', '(903) 928-2239', 'admin3@cayugaisd.com', 'www.cayugaisd.com', 'MR RUSSELL HOLDEN', '09-12', '173', 3);

INSERT INTO campus (number, name, kind, charter_type, street, city, state, zip, phone, fax, email, webpage, principal, grade_range, enrollment, district_id)
VALUES ('001905004', 'Campus 4', 'REGULAR INSTRUCTIONAL', '', 'P O BOX 427', 'City 4', 'CA', '75832-0427', '(903) 928-2294 ext:012', '(903) 928-2239', 'admin4@cayugaisd.com', 'www.cayugaisd.com', 'MR RUSSELL HOLDEN', '09-12', '174', 4);

-- Subjects inserts
INSERT INTO subjects (name, campus_type, general_topic, content_name, content_description)
VALUES ('Subject 1', 'Campus type 01', 'Math', 'Math 1', 'Math 1 Description');

INSERT INTO subjects (name, campus_type, general_topic, content_name, content_description)
VALUES ('Subject 2', 'Campus type 04', 'Science', 'Science 1', 'Science 1 Description');

INSERT INTO subjects (name, campus_type, general_topic, content_name, content_description)
VALUES ('Subject 3', 'Campus type 01', 'Science', 'Science 2', 'Science 2 Description');

INSERT INTO subjects (name, campus_type, general_topic, content_name, content_description)
VALUES ('Subject 4', 'Campus type 04', 'Social Studies', 'Social Studies 1', 'Social Studies 1 Description');

INSERT INTO subjects (name, campus_type, general_topic, content_name, content_description)
VALUES ('Subject 5', 'Campus type 05', 'Social Studies', 'Social Studies 2', 'Social Studies 2 Description');

-- Units inserts
INSERT INTO units (number, name, description, subject_id) VALUES (1, 'S1 Unit 1', 'S1 Unit 1 D', 1);
INSERT INTO units (number, name, description, subject_id) VALUES (2, 'S1 Unit 2', 'S1 Unit 2 D', 1);
INSERT INTO units (number, name, description, subject_id) VALUES (1, 'S2 Unit 1', 'S2 Unit 1 D', 2);
INSERT INTO units (number, name, description, subject_id) VALUES (2, 'S2 Unit 2', 'S2 Unit 2 D', 2);
INSERT INTO units (number, name, description, subject_id) VALUES (1, 'S2 Unit 1', 'S2 Unit 1 D', 3);
INSERT INTO units (number, name, description, subject_id) VALUES (2, 'S2 Unit 2', 'S2 Unit 2 D', 3);
INSERT INTO units (number, name, description, subject_id) VALUES (1, 'S2 Unit 1', 'S2 Unit 1 D', 4);
INSERT INTO units (number, name, description, subject_id) VALUES (2, 'S2 Unit 2', 'S2 Unit 2 D', 4);
INSERT INTO units (number, name, description, subject_id) VALUES (1, 'S2 Unit 1', 'S2 Unit 1 D', 5);

-- Chapters inserts
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 1', 'Chapter Description 1', 1);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 2', 'Chapter Description 2', 2);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 3', 'Chapter Description 3', 3);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 4', 'Chapter Description 4', 4);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 5', 'Chapter Description 5', 5);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 6', 'Chapter Description 6', 6);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 7', 'Chapter Description 7', 7);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 8', 'Chapter Description 8', 8);
INSERT INTO chapters (number, name, description, unit_id) VALUES (1, 'Chapter Name 9', 'Chapter Description 9', 9);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 10', 'Chapter Description 10', 1);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 11', 'Chapter Description 11', 2);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 12', 'Chapter Description 12', 3);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 13', 'Chapter Description 13', 4);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 14', 'Chapter Description 14', 5);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 15', 'Chapter Description 15', 6);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 16', 'Chapter Description 16', 7);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 17', 'Chapter Description 17', 8);
INSERT INTO chapters (number, name, description, unit_id) VALUES (2, 'Chapter Name 18', 'Chapter Description 18', 9);

-- Lessons inserts
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 1', 'Lesson Description 1', 1);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 2', 'Lesson Description 2', 2);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 3', 'Lesson Description 3', 3);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 4', 'Lesson Description 4', 4);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 5', 'Lesson Description 5', 5);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 6', 'Lesson Description 6', 6);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 7', 'Lesson Description 7', 7);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 8', 'Lesson Description 8', 8);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 9', 'Lesson Description 9', 9);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 10', 'Lesson Description 10', 10);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 11', 'Lesson Description 11', 11);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 12', 'Lesson Description 12', 12);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 13', 'Lesson Description 13', 13);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 14', 'Lesson Description 14', 14);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 15', 'Lesson Description 15', 15);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 16', 'Lesson Description 16', 16);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 17', 'Lesson Description 17', 17);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (1, 'Lesson Name 18', 'Lesson Description 18', 18);

INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 19', 'Lesson Description 19', 1);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 20', 'Lesson Description 20', 2);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 21', 'Lesson Description 21', 3);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 22', 'Lesson Description 22', 4);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 23', 'Lesson Description 23', 5);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 24', 'Lesson Description 24', 6);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 25', 'Lesson Description 25', 7);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 26', 'Lesson Description 26', 8);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 27', 'Lesson Description 27', 9);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 28', 'Lesson Description 28', 10);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 29', 'Lesson Description 29', 11);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 30', 'Lesson Description 30', 12);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 31', 'Lesson Description 31', 13);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 32', 'Lesson Description 32', 14);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 33', 'Lesson Description 33', 15);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 34', 'Lesson Description 34', 16);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 35', 'Lesson Description 35', 17);
INSERT INTO lessons (number, name, description, chapter_id) VALUES (2, 'Lesson Name 36', 'Lesson Description 36', 18);

-- Users inserts
-- Password: MyPass123
INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName', 'TestLastName', 'TestUsername', 'testemail@dashed.com', 'c0fa4389e77a9daac9507f5a6e2e154d91d763483aecda35ae59bee05de32ca6', TRUE, 125, 3000, 1);

INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName2', 'TestLastName2', 'TestUsername2', 'testemail2@dashed.com', 'c0fa4389e77a9daac9507f5a6e2e154d91d763483aecda35ae59bee05de32ca6', TRUE, 125, 3000, 1);

INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName3', 'TestLastName3', 'TestUsername3', 'testemail3@dashed.com', 'c0fa4389e77a9daac9507f5a6e2e154d91d763483aecda35ae59bee05de32ca6', TRUE, 125, 3000, 1);

INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName4', 'TestLastName4', 'TestUsername4', 'testemail4@dashed.com', 'c0fa4389e77a9daac9507f5a6e2e154d91d763483aecda35ae59bee05de32ca6', TRUE, 125, 3000, 1);