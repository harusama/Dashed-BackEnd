-- Campus inserts
INSERT INTO campus (state, region, district, name) VALUES ('Monterrey', 'Norte', 'District', 'Mty');

-- Subjects inserts
INSERT INTO subjects (name) VALUES ('Introduction to physics');
INSERT INTO subjects (name) VALUES ('Physics II');

-- Users inserts
INSERT INTO users (first_name, last_name, username, email, password, active, experience, coins, campus_id)
VALUES ('TestName', 'TestLastName', 'TestUsername', 'testemail@dashed.com', '2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892', TRUE, 125, 3000, 1);