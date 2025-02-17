export const checkProductData = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ error: "Faltan datos del producto" });
  }

  if (typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ error: "El precio debe ser un número mayor a 0" });
  }

  if (typeof stock !== "number" || stock < 0) {
    return res
      .status(400)
      .json({ error: "El stock debe ser un número positivo" });
  }

  next();
};
