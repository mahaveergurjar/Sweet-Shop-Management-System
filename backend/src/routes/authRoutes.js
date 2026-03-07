import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { body } from "express-validator";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const registerValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters"),
];
const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);
router.get("/profile", authenticate, AuthController.profile);
export default router;
