--liquibase formatted sql

--changeset oleh:0001_is_not_html splitStatements:false
CREATE FUNCTION is_not_html(string TEXT)
	RETURNS BOOLEAN AS
$$
DECLARE
BEGIN
	RETURN NOT string ~ '(?:</[^<]+>)|(?:<[^<]+/>)';
END;
$$
	LANGUAGE plpgsql
	IMMUTABLE
	PARALLEL SAFE
	SECURITY INVOKER
	STRICT;

COMMENT ON FUNCTION is_not_html(string TEXT)
	IS 'ensures that given string contains no HTML tags';
--rollback DROP FUNCTION is_not_html(string TEXT);
