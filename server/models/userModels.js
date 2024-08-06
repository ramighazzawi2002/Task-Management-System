const pool = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async create(name, email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await pool.query(
      "INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async validatePassword(providedPassword, storedPassword) {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}

module.exports = User;
