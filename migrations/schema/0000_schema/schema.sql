--liquibase formatted sql

--changeset oleh:0000_views
CREATE SCHEMA IF NOT EXISTS views;
--rollback DROP SCHEMA views;

--changeset oleh:0000_users
CREATE SCHEMA IF NOT EXISTS users;
--rollback DROP SCHEMA users CASCADE;

--changeset oleh:0000_products
CREATE SCHEMA IF NOT EXISTS products;
--rollback DROP SCHEMA products CASCADE;

--changeset oleh:0000_chat
CREATE SCHEMA IF NOT EXISTS chat;
--rollback DROP SCHEMA chat;
