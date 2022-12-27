import express from 'express';
import { getProductGroups, getProducts, getProduct } from '../domaindb/domain.mjs';

const router = express.Router();

router.use((req, res, next) => {
  // For debugging:
  // console.log('********** REQUEST ***********');
  // console.log(req);
  // console.log('********** RESPONSE ***********');
  // console.log(res);
  next();
});

// For debugging: http http://localhost:6600/hello
router.get('/hello', (req, res) => res.status(200).json({
  message: 'Hello Yeah!',
}));

router.get('/product-groups', async (req, res) => {
  const productGroups = await getProductGroups();
  const ret = { ret: 'ok', product_groups: productGroups };
  res.status(200).json(ret);
});

router.get('/products/:pgId', async (req, res) => {
  const buf = await getProducts(parseInt(req.params.pgId, 10));
  const ret = { ret: 'ok', products: buf };
  res.status(200).json(ret);
});

router.get('/product/:pgId/:pId', async (req, res) => {
  const buf = await getProduct(parseInt(req.params.pgId, 10), parseInt(req.params.pId, 10));
  const ret = { ret: 'ok', product: buf };
  res.status(200).json(ret);
});

export default router;
