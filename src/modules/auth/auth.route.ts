import { Router } from "express";
import { loginValidation } from "./validation";
import { zodValidator } from "../../middleware/zodValidator";
import AuthController from "./auth.controller";

const router = Router();

router
  .route("/login")
  .post(zodValidator(loginValidation), AuthController.login);
export const AuthRoute = router;
