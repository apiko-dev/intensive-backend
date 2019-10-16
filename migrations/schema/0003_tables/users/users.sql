--liquibase formatted sql

--changeset oleh:0003_users splitStatements:false
CREATE TABLE users.users
(
	id                 	SERIAL              PRIMARY KEY,

	email           	 	email    						NOT NULL,
  password_hash      	password_hash      	NOT NULL,
	password_hash_type 	password_hash_func	NOT NULL,

  full_name          	alphanum           	NOT NULL,
  avatar             	VARCHAR,
  phone              	phone,
	location						alphanum_text,

	created_at         	actual_timestamp,
	updated_at         	actual_timestamp
);

CREATE UNIQUE INDEX user_email_unique
	ON users.users(email);

--rollback DROP INDEX users.user_email_unique; DROP TABLE users.users;
