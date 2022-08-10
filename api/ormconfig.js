module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["./build/src/modules/*/entities/*.ts"],
  "migrations": ["./build/src/database/migrations/*.ts"],
  "cli": {
      "migrationsDir": "./build/src/database/migrations"
  }
}
