import { Router } from "express";
import { purchaseCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/carts/purchase", authMiddleware, purchaseCart);

router.get("/current", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
