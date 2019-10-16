--liquibase formatted sql

--changeset oleh:0002_alpha splitStatements:false

CREATE DOMAIN alpha AS VARCHAR(128)
	CONSTRAINT alpha_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT alpha_too_long CHECK (length(VALUE) < 128)
	CONSTRAINT alpha_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT alpha_check CHECK (is_alpha(VALUE));

COMMENT ON DOMAIN alpha IS 'not blank VARCHAR(128) alpha string';

--rollback DROP DOMAIN alpha;


--changeset oleh:0002_alphanum splitStatements:false

CREATE DOMAIN alphanum AS VARCHAR(128)
	CONSTRAINT alphanum_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT alphanum_too_long CHECK (length(VALUE) < 128)
	CONSTRAINT alphanum_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT alphanum_check CHECK (is_alphanum(VALUE));

COMMENT ON DOMAIN alphanum IS 'not blank VARCHAR(128) alphanumeric string';

--rollback DROP DOMAIN alphanum;


--changeset oleh:0002_alpha_text splitStatements:false

CREATE DOMAIN alpha_text AS TEXT
	CONSTRAINT alpha_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT alpha_text_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT alpha_check CHECK (is_alpha(VALUE));

COMMENT ON DOMAIN alpha_text IS 'not blank alpha TEXT';

--rollback DROP DOMAIN alpha_text;


--changeset oleh:0002_alphanum_text splitStatements:false

CREATE DOMAIN alphanum_text AS TEXT
	CONSTRAINT alphanum_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT alphanum_text_html_check CHECK (is_not_html(VALUE))
	CONSTRAINT alphanum_check CHECK (is_alphanum(VALUE));

COMMENT ON DOMAIN alphanum_text IS 'not blank alphanumeric TEXT';

--rollback DROP DOMAIN alphanum_text;


--changeset oleh:0002_not_blank_string splitStatements:false

CREATE DOMAIN not_blank_string AS VARCHAR(128)
	CONSTRAINT string_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT string_too_long CHECK (length(VALUE) < 128)
	CONSTRAINT string_html_check CHECK (is_not_html(VALUE));
COMMENT ON DOMAIN not_blank_string IS 'not blank string';

--rollback DROP DOMAIN not_blank_string;


--changeset oleh:0002_not_blank_text splitStatements:false

CREATE DOMAIN not_blank_text AS TEXT
	CONSTRAINT text_not_blank CHECK (not_blank(VALUE))
	CONSTRAINT text_html_check CHECK (is_not_html(VALUE));

COMMENT ON DOMAIN not_blank_text IS 'not blank TEXT';

--rollback DROP DOMAIN not_blank_text;
