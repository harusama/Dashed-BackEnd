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
INSERT INTO subjects (name) VALUES ('Introduction to physics');
INSERT INTO subjects (name) VALUES ('Physics II');

-- Users inserts
INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName', 'TestLastName', 'TestUsername', 'testemail@dashed.com', '2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892', TRUE, 125, 3000, 1);