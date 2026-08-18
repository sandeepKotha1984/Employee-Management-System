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

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});