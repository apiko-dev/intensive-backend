#!/bin/bash
set +e

cd "$(dirname "$0")"

[ ! -z $DATABASE_URL ] || DATABASE_URL=postgres://postgres:@localhost:5432/apiko_courses

psql $DATABASE_URL -f extensions.sql -At
