--liquibase formatted sql

--changeset oleh:0004_views.chats splitStatements:false

CREATE VIEW views.chats AS
SELECT
	c.id,
	c.product_id,
	c.owner_id,
	c.participants,
	c.created_at,
	c.updated_at
FROM chat.chats AS c;

--rollback DROP VIEW views.chats;


--changeset oleh:0004_views.chats_with_last_message splitStatements:false

CREATE VIEW views.chats_with_last_message AS
SELECT
	c.id,
	c.product_id,
	c.owner_id,
	c.participants,
	c.created_at,
	c.updated_at,
	row_to_json(last_message) AS message,
	last_message.created_at AS message_created_at
FROM chat.chats AS c
	LEFT JOIN lateral (
		SELECT *
		FROM chat.messages AS m
		WHERE m.chat_id = c.id
		ORDER BY m.id DESC
		FETCH FIRST ROW ONLY
	) AS last_message ON TRUE;

--rollback DROP VIEW views.chats_with_last_message;
