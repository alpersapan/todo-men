const express = require("express");
const todoController = require("../controllers/todoController");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

router.route("/").get(userMiddleware, todoController.getAllTodo); // http://localhost:3000/todos
router.route("/").post(todoController.createTodo); // http://localhost:3000/todos
router.route("/:slug").get(todoController.getTodo); // http://localhost:3000/todos/:slug
router.route("/:slug").delete(todoController.deleteTodo); // http://localhost:3000/todos/:slug
router.route("/:slug").put(todoController.updateTodo); // http://localhost:3000/todos/:slug

module.exports = router;
