import { Router } from "express";
import { checkProductData } from "../middlewares/ProductData.middleware.js";
import { ProductsController } from "../controllers/product.controllers.js";
import passportCall from "../middlewares/passportCall.js"; // Asegúrate de que esta función existe
import authorization from "../middlewares/authorization.js"; // Middleware para roles

const router = Router();

router.get("/", ProductsController.getAll);

router.get(
  "/:pid",
  passportCall("jwt"),
  authorization("Admin"),
  ProductsController.getById
);

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("Admin"),
  ProductsController.deleteOne
);

router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("Admin"),
  ProductsController.update
);

router.post(
  "/",
  passportCall("jwt"),
  authorization("Admin"),
  checkProductData,
  ProductsController.create
);

export default router;
