module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["./build/src/modules/*/entities/*.js"],
  "migrations": ["./build/src/database/migrations/*.js"],
  "cli": {
      "migrationsDir": "./build/src/database/migrations"
  }
}
