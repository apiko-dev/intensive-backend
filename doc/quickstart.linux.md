# Linux

Install [Postgresql-11](https://www.postgresql.org/download/) on your Linux manually.

Install `groovy` using `SDKMAN!` to run db migrations:
```bash
curl -s "https://get.sdkman.io" | bash
sdk install groovy
```

(optional) feel free to specify your database credentials with if you're using some non-default ones:

```bash
export DATABASE_URL=postgres://postgres:@localhost:5432/apiko_courses
```

run script to create `apiko_courses` database compile and install all the extensions:

```bash
migrations/bootstrap/bootstrap.sh
```

and then in a fresh shell update db migrations:

```bash
cd migrations/schema
./liquibase.groovy update
```

If you want to rollback migrations - run:
```bash
cd migrations/schema
./liquibase.groovy rollbackCount 9000
```
