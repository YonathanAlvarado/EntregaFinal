import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Ticket from "../models/Ticket.js";

export const purchaseCart = async (req, res) => {
  try {
    const { _id: userId, email } = req.user;
    console.log("Usuario autenticado:", req.user);

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    let total = 0;
    const processedProducts = [];

    for (const item of cart.products) {
      if (item.productId.stock >= item.quantity) {
        total += item.productId.price * item.quantity;

        await Product.findByIdAndUpdate(item.productId._id, {
          $inc: { stock: -item.quantity },
        });
      } else {
        processedProducts.push(item.productId._id);
      }
    }

    if (total > 0) {
      const ticket = await Ticket.create({
        code: `TCKT-${Date.now()}`,
        amount: total,
        purchaser: email,
      });

      console.log("Ticket generado:", ticket);

      cart.products = cart.products.filter((item) =>
        processedProducts.includes(item.productId._id)
      );
      await cart.save();

      return res.json({ ticket, remainingProducts: processedProducts });
    }

    res.status(400).json({ error: "No hay productos suficientes en stock" });
  } catch (error) {
    console.error("Error en purchaseCart:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
