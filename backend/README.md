## Database
The project uses [Drizzle ORM](https://orm.drizzle.team/) with Postgres.
If you make any changes to db/schema.ts file then you have to regenerate migration files. To do than run the below command.
```
yarn run db:generate
```
The above command will generate the required migration files based on schema changes

Once you have Migration files ready run the below command to migrate Table changes to DB. Please verify changes before running the below command.
```
yarn run db:migrate
```
To view database in drizzle studio run the below command
```
yarn drizzle-kit studio --port 3000 --verbose
```