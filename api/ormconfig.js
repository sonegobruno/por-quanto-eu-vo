module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [process.env.SRC_DIR + "/modules/*/entities/*.ts"],
  "migrations": [process.env.SRC_DIR + "/database/migrations/*.ts"],
  "cli": {
      "migrationsDir": process.env.SRC_DIR +"/database/migrations"
  }
}
