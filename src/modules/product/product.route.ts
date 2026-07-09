import { Router } from "express";
import { zodValidator } from "../../middleware/zodValidator";
import { createProductValidation } from "./validation";
import roleCheck from "../../middleware/roleCheck";
import ProductController from "./product.controller";

const router = Router();
router
  .route("/create")
  .post(
    zodValidator(createProductValidation),
    roleCheck(["admin", "manager"]),
    ProductController.createProduct,
  );

router
  .route("/")
  .get(
    // roleCheck(["admin", "manager"]),
    ProductController.getAllProducts,
  );
export const ProductRouter = router;
