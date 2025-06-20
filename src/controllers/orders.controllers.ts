import { Request, Response } from 'express';
import { Orders } from '../models/Orders';  

//crear orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userCreate, status, products } = req.body;

    if (!userCreate || !products || products.length === 0) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Calcular subtotal y total
    let subtotal = 0;
    products.forEach((p: any) => {
      subtotal += p.price * p.quantity;
    });

    
    const entire = subtotal;

    const newOrder = new Orders({
      userCreate,
      status,
      products,
      subtotal,
      entire,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la orden' });
  }
};

//actualizar estatus de la orden
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    order.status = "pagado";

    const updatedOrder = await order.save();

    return res.json({
      message: "Orden actualizada a 'pagado'",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Error al actualizar orden:", error);
    return res.status(500).json({ message: "Error al actualizar la orden" });
  }
};

//eliminar la orden (estatus => Cancelada)
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    order.status = "cancelado";

    const updatedOrder = await order.save();

    return res.json({
      message: "Orden cancelada correctamente",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Error al cancelar la orden:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Orders.find(); //solo los productos activos
    res.json(orders);
  } catch (error) {
    console.error("Error en getAllOrders:", error);
    res.status(500).json({ error: "Error al las ordenes" });
  }
};
