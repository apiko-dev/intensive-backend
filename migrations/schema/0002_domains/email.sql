--liquibase formatted sql

--changeset oleh:0002_email splitStatements:false
CREATE DOMAIN email AS VARCHAR(64)
	CONSTRAINT email_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT email_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT email_too_long CHECK (length(VALUE) < 64)
	CONSTRAINT email_regex CHECK (VALUE ~ '\S+@\S+');

--rollback DROP DOMAIN email;
