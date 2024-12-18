## Database
The project uses [Drizzle ORM](https://orm.drizzle.team/) with Postgres.  
Make sue you have the DB_URL environment variable in the backend .env file
`DB_URL="postgresql://<username>:<password>@localhost:5432/<dbname>"`. 

### Schema Changes
If you make any changes to db/schema.ts file then you have to regenerate migration files. To do than run the below command.
```
yarn run db:generate
```
The above command will generate the required migration files based on schema changes

### Migrations
Once you have Migration files ready run the below command to migrate Table changes to DB. Please verify changes before running the below command.
```
yarn run db:migrate
```
### Drizzle Database Studio
To view database in drizzle studio run the below command
```
yarn drizzle-kit studio --port 3000 --verbose
```

## Terminologies
Evaluator, Evaluate Question, Evaluate Answer, or any similar term related to "evaluation" refers to the process of testing whether an answer meets all the conditions specified by the user. This typically involves making a call to an external Python API service with the provided answer and its respective conditions. The result of this process is referred to as the "evaluation result."    