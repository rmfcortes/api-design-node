import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middlewares';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/* Product */
router.get('/product', getProducts);
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
);
router.get('/product/:id', getOneProduct);
router.put('/product/:id',
    body('name').isString(),
    handleInputErrors,
    updateProduct
);
router.delete('/product/:id', deleteProduct);

/* Update */
router.get('/update', getUpdates);
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);
router.get('/update/:id', getOneUpdate);
router.put('/update/:id',
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    body('productId'),
    updateUpdate
);
router.delete('/update/:id', () => {});

/* Update Point*/
router.get('/updatepoint', getUpdates);
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    createUpdate
);
router.get('/updatepoint/:id', getOneUpdate);
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('productId').optional(),
    updateUpdate
);
router.delete('/updatepoint/:id', () => {});

export default router;