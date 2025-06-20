import { Router } from 'express';
import { createOrder, cancelOrder, getAllOrders, updateOrder } from '../controllers/orders.controllers';

const router = Router();

router.post('/create', createOrder);
router.patch('/update/:orderId', updateOrder);
router.patch("/orders/:orderId/cancel", cancelOrder);
router.get('/order',getAllOrders);


export default router;
