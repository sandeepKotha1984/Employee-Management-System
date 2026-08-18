import { Router, Request, Response } from "express";
import { users } from "../data/users.js";

const router = Router();

const sanitizeUser = (user: (typeof users)[number]) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const handleUserRequest = (req: Request, res: Response) => {
  const email = String(req.query.email || "");

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(sanitizeUser(user));
};

const handleUserLogin = (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = users.find(
    (user) => user.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || user.password !== String(password)) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.json(sanitizeUser(user));
};

router.get("/user", handleUserRequest);
router.post("/user", handleUserLogin);

export default router;