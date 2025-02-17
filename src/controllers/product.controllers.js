import Product from "../models/Product.js";

export const ProductsController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.pid);
      if (!product)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  },

  create: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto" });
    }
  },

  update: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.pid,
        req.body,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
      if (!deletedProduct)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  },
};
