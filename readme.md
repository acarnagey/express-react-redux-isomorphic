# Express React Redux Isomorphic 

This app has a login, the seed credentials are in /seeds/admin it showcases an express isomorphic app with client react and redux.  It has a simple crud with 3 tables.

## Dev notes

`npm i`

To run server with client in server

`npm run server`

To run server and client on it's on dev server

```
npm run server
npm start
```

To run postgres database migrations and then seed the data

```
npx knex migrate:latest
npx knex seed:run
```

Postgres command line

```
psql -U redux -d redux_end_to_end
```
