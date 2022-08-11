module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["./dist/src/modules/*/entities/*.js"],
  "migrations": ["./dist/src/database/migrations/*.js"],
  "cli": {
      "migrationsDir": "./dist/src/database/migrations"
  }
}
