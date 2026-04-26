const db = require("../database/database");
const bcrypt = require("bcryptjs");

class Owner {
    static create({ name, last_name, identification, identification_type, address, phone, email, birth_date }) {
        const stmt = db.prepare(`INSERT INTO owners 
            (name, last_name, identification, identification_type, address, phone, email, birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        const info = stmt.run(name, last_name, identification, identification_type, address, phone, email, birth_date);
        return info.lastInsertRowid;
    }   

    static getAll() {
        const stmt = db.prepare("SELECT * FROM owners");
        return stmt.all();
    } 
    static findByUsername(name) {
        const stmt = db.prepare("SELECT * FROM owners WHERE name = ?");
        return stmt.get(name);
    }
}


module.exports = Owner;