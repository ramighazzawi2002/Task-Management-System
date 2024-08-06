const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
router.get("/get-tasks/:id", taskController.getTasks);
router.post("/add-task", taskController.addTask);
router.put("/update-task", taskController.updateTask);
router.put("/delete-task", taskController.deleteTask);
module.exports = router;
