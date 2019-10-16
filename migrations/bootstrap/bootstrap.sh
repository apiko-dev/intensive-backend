#!/bin/bash
set +e

cd "$(dirname "$0")"

APP="apiko_courses"
DATABASE_URL=postgres://postgres:@localhost:5432

psql "$DATABASE_URL/postgres" -c "CREATE DATABASE $APP TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';"

psql "$DATABASE_URL/$APP" -f extensions.sql -At
