import { Router } from "express";
import { loginValidation } from "./validation";
import { zodValidator } from "../../middleware/zodValidator";

const router = Router();

router.route("/login").post(zodValidator(loginValidation));
export const AuthRoute = router;
