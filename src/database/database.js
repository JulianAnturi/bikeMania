const Database = require("better-sqlite3");
const db = new Database("my-database.db", { verbose: console.log });

db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
).run();

db.prepare(`CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    last_name TEXT,
    identification TEXT,
    identification_type TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    birth_date TEXT
)`
).run();

console.log("Database initialized and users table created if it didn't exist.");

module.exports = db;