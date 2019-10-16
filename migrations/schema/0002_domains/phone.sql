--liquibase formatted sql

--changeset oleh:0002_phone splitStatements:false

CREATE DOMAIN phone AS VARCHAR(64)
	CONSTRAINT phone_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT phone_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT phone_too_long CHECK (length(VALUE) < 64);

--rollback DROP DOMAIN phone;
