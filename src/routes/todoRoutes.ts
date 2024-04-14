import express, { Request, Response, NextFunction } from "express";
import Todo from "../models/todoModel";

const router = express.Router();

// Get all todos
router.get(
  "/todos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }
);

// Get todo by ID
router.get(
  "/todos/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }
);

// Create a new todo
router.post(
  "/todos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
      });
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }
);

// Update a todo
router.put(
  "/todos/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }
);

// Delete a todo
router.delete(
  "/todos/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
