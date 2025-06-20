import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controllers';

const router = Router();

router.post('/create', createProduct);
router.patch('/update/:productId',updateProduct);
router.delete('/delete/:productId',deleteProduct);
router.get('/product',getAllProducts);


export default router;