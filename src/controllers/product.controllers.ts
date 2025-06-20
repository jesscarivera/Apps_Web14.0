import { Product } from "../models/Product";
import { Request, Response } from "express";


//crear producto
export const createProduct= async (req:Request, res:Response) => {


  try {
    const { name, price, description, quantity } = req.body;

   const newProduct= new Product ({
    name,
    price,
    description,
    quantity,
    status:true
    });

   const product = await newProduct.save();

   return res.json({ product });
    
    
  }catch(error){
    console.log("Error ocurrio en SAVEPRODUCT", error)

   }
}

//actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { name, price, description, quantity } = req.body;

    // Buscar el producto por ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.quantity = quantity ?? product.quantity;

    const updatedProduct = await product.save();

    return res.json({ updatedProduct });

  } catch (error) {
    console.error("Error en updateProduct:", error);
    return res.status(500).json({
      message: "Error al actualizar el producto",
      error
    });
  }
};

//Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.status = false;
    const updatedProduct = await product.save();

    return res.json({
      message: "Producto eliminado correctamente",
      product: updatedProduct,
    });

  } catch (error) {
    console.log("Error en deleteProduct:", error);
    return res.status(500).json({ error: "Error al eliminar producto" });
  }
};

//mostrar todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ status: true }); //solo los productos activos
    res.json(products);
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
