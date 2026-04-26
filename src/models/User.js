const db = require("../database/database");
const bcrypt = require("bcryptjs");

class User {
    static create({ username, password }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        const info = stmt.run(username, hashedPassword);
        return info.lastInsertRowid;
    }   

    static findByUsername(username) {
        const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
        return stmt.get(username);
    }
}


module.exports = User;