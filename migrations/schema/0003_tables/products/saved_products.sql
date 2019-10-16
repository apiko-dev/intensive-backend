--liquibase formatted sql

--changeset oleh:0003_saved_products splitStatements:false
CREATE TABLE products.saved_products
(
	id					SERIAL	PRIMARY KEY,
	product_id 	INT 		NOT NULL,
	owner_id 		INT 		NOT NULL,

	created_at	actual_timestamp,

	CONSTRAINT saved_products_product_fk
	FOREIGN KEY (product_id) REFERENCES products.products (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT saved_products_owner_fk
	FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT saved_products_unique UNIQUE (product_id, owner_id)
);

--rollback DROP TABLE products.saved_products;
