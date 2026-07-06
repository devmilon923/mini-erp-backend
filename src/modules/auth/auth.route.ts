import { Router } from "express";
import { loginValidation, registerValidation } from "./validation";
import { zodValidator } from "../../middleware/zodValidator";
import AuthController from "./auth.controller";
import roleCheck from "../../middleware/roleCheck";

const router = Router();

router
  .route("/login")
  .post(zodValidator(loginValidation), AuthController.login);
router
  .route("/register")
  .post(
    zodValidator(registerValidation),
    roleCheck(["admin"]),
    AuthController.register,
  );
export const AuthRoute = router;
