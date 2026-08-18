import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customer.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Claims API is running"
  });
});

app.use("/api", customerRoutes);
app.use("/api", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});