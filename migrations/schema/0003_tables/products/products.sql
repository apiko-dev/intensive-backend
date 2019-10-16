--liquibase formatted sql

--changeset oleh:0003_products splitStatements:false
CREATE TABLE products.products
(
	id                SERIAL            	PRIMARY KEY,
	owner_id     			INT               	NOT NULL,

	title           	alphanum    				NOT NULL,
  location          alphanum_text				NOT NULL,
  price             FLOAT 							NOT NULL,
  description      	alphanum_text,
	photos 						TEXT[6],

	keywords 					TEXT,

	active						BOOLEAN							NOT NULL DEFAULT TRUE,

	created_at        actual_timestamp,
	updated_at        actual_timestamp,

	CONSTRAINT product_owner_fk FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
		DEFERRABLE INITIALLY DEFERRED
);

SELECT create_concat_columns_trigger('products', 'products', 'keywords', 'title', 'description');

CREATE INDEX product_search_trgm
	ON products.products
	USING GIST (keywords gist_trgm_ops, "location" gist_trgm_ops);


--rollback DROP INDEX products.product_search_trgm;
--rollback SELECT drop_concat_columns_trigger('products', 'products');
--rollback DROP TABLE products.products;
