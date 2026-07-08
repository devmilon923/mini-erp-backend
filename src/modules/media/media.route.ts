import { Router } from "express";
import roleCheck from "../../middleware/roleCheck";
import MediaController from "./media.controller";
import { zodValidator } from "../../middleware/zodValidator";
import { uploadMediaValidation } from "./validation";

const router = Router();
router
  .route("/upload")
  .post(
    zodValidator(uploadMediaValidation),
    roleCheck(["admin", "manager"]),
    MediaController.uploadMedia,
  );

export const MediaRouter = router;
