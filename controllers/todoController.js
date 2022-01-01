const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const todos = await Todo.find();
  try {
    const todo = await Todo.create(req.body);
    res.status(201).redirect("/todos");
  } catch (error) {
    // duplicate title error
    res.status(201).redirect("/todos");
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).render("todos", {
      todos,
      page_name: "todos",
    });
  } catch (error) {
    res.status(201).redirect("/todos");
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ slug: req.params.slug });
    res.status(200).render("todo", {
      todo,
      page_name: "todos",
    });
  } catch (error) {
    res.status(201).redirect("/todos");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndRemove({ slug: req.params.slug });
    res.status(200).redirect("/todos");
  } catch (error) {
    res.status(201).redirect("/todos");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ slug: req.params.slug });
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.user = req.body.user;
    todo.save();
    res.status(200).redirect("/todos");
  } catch (error) {
    // duplicate title error
    res.status(201).redirect("/todos");
  }
};
