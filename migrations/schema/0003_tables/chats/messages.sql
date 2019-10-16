--liquibase formatted sql

--changeset oleh:0003_messages splitStatements:false
CREATE TABLE chat.messages
(
	id            SERIAL            PRIMARY KEY,
	chat_id       INT              	NOT NULL,
	owner_id      INT              	NOT NULL,

	text       		not_blank_text 		NOT NULL,
	read          BOOLEAN           NOT NULL DEFAULT FALSE,

	created_at    actual_timestamp,
	updated_at    actual_timestamp,

	CONSTRAINT message_chat_fk FOREIGN KEY (chat_id) REFERENCES chat.chats (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT message_owner_fk FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED
);

--rollback DROP TABLE chat.messages;
