--liquibase formatted sql

--changeset oleh:0003_chats splitStatements:false
CREATE TABLE chat.chats
(
	id         		SERIAL 	PRIMARY KEY,
	product_id		INT			NOT NULL,
	owner_id   		INT 		NOT NULL,
	participants	INT []	NOT NULL,

	created_at 		actual_timestamp,
	updated_at 		actual_timestamp,

	CONSTRAINT chat_product_fk FOREIGN KEY (product_id) REFERENCES products.products (id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT chat_owner_fk FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT chat_unique UNIQUE (product_id, owner_id)
		DEFERRABLE INITIALLY IMMEDIATE
);

--rollback DROP TABLE chat.chats;
