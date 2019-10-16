--liquibase formatted sql

--changeset oleh:0001_trim_whitespace splitStatements:false
CREATE FUNCTION trim_whitespace(string TEXT)
	RETURNS TEXT AS
$$
BEGIN
	RETURN REGEXP_REPLACE(string, '^[ \n\t\r]+|[ \n\t\r]+$', '', 'g');
END;
$$
	LANGUAGE plpgsql
	IMMUTABLE
	PARALLEL SAFE
	SECURITY INVOKER
	STRICT;

COMMENT ON FUNCTION trim_whitespace(string TEXT)
	IS 'trim whitespaces from a given string';
--rollback DROP FUNCTION trim_whitespace(string TEXT);
