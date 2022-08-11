module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["./src/modules/*/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
      "migrationsDir": "./src/database/migrations"
  }
}
