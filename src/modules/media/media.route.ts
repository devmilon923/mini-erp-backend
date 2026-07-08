import { Router } from "express";
import roleCheck from "../../middleware/roleCheck";
import MediaController from "./media.controller";

const router = Router();
router.route("/upload").post(MediaController.uploadMedia);

export const MediaRouter = router;
