// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';
import { getProductGroups, getProducts, getProduct } from '../../src/db/domain.mjs';

test('Get product groups ok', async () => {
  const productGroups = await getProductGroups();
  expect(productGroups).be.an('array');
  expect(productGroups.length).toBe(2);
  expect(productGroups).toContainEqual({ pgId: 1, name: 'Books' });
  expect(productGroups).toContainEqual({ pgId: 2, name: 'Movies' });
});

test('Get products of product group 1 ok', async () => {
  const products = await getProducts(1);
  expect(products).be.an('array');
  expect(products.length).toBe(35);
  expect(products).toContainEqual({
    pId: 2017,
    pgId: 1,
    title: 'Sinuhe egyptiläinen',
    price: 13.42,
    author:
    'Mika Waltari',
    year: 1945,
    country: 'Finland',
    language: 'Finnish',
  });
});

test('Get specific product', async () => {
  const product = await getProduct(2, 49);
  expect(product).be.an('object');
  expect(product).to.eql({
    pId: 49,
    pgId: 2,
    country: 'Italy-USA',
    director: 'Leone, Sergio',
    genre: 'Western',
    price: 14.4,
    title: 'Once Upon a Time in the West',
    year: 1968,
  });
});
