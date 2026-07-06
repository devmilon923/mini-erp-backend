import { Router } from "express";
import roleCheck from "../../middleware/roleCheck";
import UserController from "./user.controller";

const router = Router();

router
  .route("/profile")
  .get(roleCheck(["admin", "manager", "employee"]), UserController.getProfile);

export const UserRoute = router;
