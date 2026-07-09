import { Router } from "express";
import { zodValidator } from "../../middleware/zodValidator";
import { createCategory, createProductValidation } from "./validation";
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
  .get(roleCheck(["admin", "manager"]), ProductController.getAllProducts);
router.route("/category-add").post(zodValidator(createCategory), ProductController.addCategory);
export const ProductRouter = router;
