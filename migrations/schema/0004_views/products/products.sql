--liquibase formatted sql

--changeset oleh:0004_views.products splitStatements:false

CREATE VIEW views.products AS
SELECT
	p.id,
	p.owner_id,
	p.title,
	p.location,
	p.price,
	p.description,
	p.photos,
	p.created_at,
	p.updated_at
FROM products.products AS p;

--rollback DROP VIEW views.products;


--changeset oleh:0004_views.products_with_owner splitStatements:false

CREATE VIEW views.products_with_owner AS
SELECT
	p.id,
	p.owner_id,
	p.title,
	p.location,
	p.price,
	p.description,
	p.photos,
	p.created_at,
	p.updated_at,
	row_to_json(u) AS owner
FROM products.products AS p
	LEFT JOIN users.users AS u ON (p.owner_id = u.id);

--rollback DROP VIEW views.products_with_owner;


--changeset oleh:0004_views.products_with_keywords splitStatements:false
CREATE VIEW views.products_with_keywords AS
SELECT
	p.id,
	p.owner_id,
	p.title,
	p.location,
	p.price,
	p.description,
	p.photos,
	p.created_at,
	p.updated_at,
	p.keywords
FROM products.products AS p;

--rollback DROP VIEW views.products_with_keywords;
