const pool = require("../config/db");
class Task {
  static async createTask(user_id, title, description) {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description, isDeleted) VALUES ($1, $2, $3, false) RETURNING id",
      [user_id, title, description]
    );
    return result.rows[0];
  }

  static async getTasks(id) {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 AND isDeleted = false",
      [id]
    );
    return result.rows;
  }

  static async getTaskById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async updateTask(title, description, id) {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING id",
      [title, description, id]
    );
    return result.rows[0];
  }

  static async deleteTask(id) {
    await pool.query("UPDATE tasks SET isDeleted = true WHERE id = $1", [id]);
  }
}

module.exports = Task;
