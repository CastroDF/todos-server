import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes";
import { config } from "dotenv";
import cors from "cors";

config();

const PORT: number = parseInt(process.env.PORT!) || 3000;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connection to MongoDB Atlas established"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/", todoRoutes);

// Handle not found route errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server is running at Port:${PORT}`);
});
