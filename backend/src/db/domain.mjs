import papaparse from 'papaparse';
import pkg from 'fs';
import logger from '../util/logger.mjs';
import { NotFoundError } from '../util/errors.mjs';

const { promises: fs } = pkg;
// NOTE: This is not working when using Node Run and Debug REPL.
// const fs = require('fs').promises;

const { parse } = papaparse;

const productGroupsCsvFile = 'resources/product-groups.csv';

// Simulates domain database.
const domain = {};

async function readFile(fileName) {
  logger.debug(`ENTER domain.readFile: ${fileName}`);
  let csvContents = null;
  try {
    csvContents = await fs.readFile(fileName, 'utf8');
  } catch (err) {
    logger.error(`Error reading file: ${fileName}`);
    throw new NotFoundError(`Error reading file: ${fileName}`);
  }
  return csvContents;
}

/**
 * Gets product groups.
 * Simulates the domain db, but actually just reads the CSV file.
 * @returns {object} product groups {<key>: <category>}
 */
async function getProductGroups() {
  logger.debug('ENTER domain.getProductGroups');
  if ((domain['product-groups'] === null) || (domain['product-groups'] === undefined)) {
    const csvContents = await readFile(productGroupsCsvFile);
    const rows = parse(csvContents, { delimiter: '\t' }).data;
    const ret = rows
      .map((row) => {
        if (row.length === 2) {
          const [key, val] = row;
          return {
            pgId: parseInt(key, 10),
            name: val,
          };
        }
        return null;
      })
      .filter((element) => element !== null);
    domain['product-groups'] = ret;
  }
  logger.debug('EXIT domain.getProductGroups');
  return domain['product-groups'];
}

const createBook = (row) => {
  const [pId, pgId, title, price, author, year, country, language] = row;
  return {
    pId: parseInt(pId, 10),
    pgId: parseInt(pgId, 10),
    title,
    price: parseFloat(price),
    author,
    year: parseInt(year, 10),
    country,
    language,
  };
};

const createMovie = (row) => {
  const [pId, pgId, title, price, director, year, country, genre] = row;
  return {
    pId: parseInt(pId, 10),
    pgId: parseInt(pgId, 10),
    title,
    price: parseFloat(price),
    director,
    year: parseInt(year, 10),
    country,
    genre,
  };
};

// Internal function to load the products to the domain db.
async function loadProducts(pgId) {
  logger.debug(`ENTER domain.loadProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  if ((domain[productsKey] === null) || (domain[productsKey] === undefined)) {
    const productsCsvFile = `resources/pg-${pgId}-products.csv`;
    const csvContents = await readFile(productsCsvFile);
    const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
    const ret = rows.reduce((acc, row) => {
      if (row.length === 8) {
        let product = null;
        if (pgId === 1) {
          product = createBook(row);
        } else if (pgId === 2) {
          product = createMovie(row);
        }
        if (product !== null) {
          acc.push(product);
        }
      }
      return acc;
    }, []);
    domain[productsKey] = ret;
  }
  logger.debug('EXIT domain.loadProducts');
}

/**
 * Gets products for product group 'pgId'.
 * @param {int} pgId - Product group id
 * @returns {list} products
 */
async function getProducts(pgId) {
  logger.debug(`ENTER domain.getProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  let products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    await loadProducts(pgId);
    products = domain[productsKey];
  }
  logger.debug('EXIT domain.getProducts');
  return products;
}

/**
 * Gets a product for product group 'pgId' and product id 'pId'.
 * @param {int} pgId - Product group id
 * @param {int} pId - Product id
 */
async function getProduct(pgId, pId) {
  logger.debug(`ENTER domain.getProduct, pgId: ${pgId}, pId: ${pId}`);
  const productsKey = `pg-${pgId}-products`;
  let products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    await loadProducts(pgId);
    products = domain[productsKey];
  }
  const filtered = products.filter((row) => row.pId === pId && row.pgId === pgId);
  const product = filtered[0];
  // logger.debug(`product: ${JSON.stringify(product)}`);
  logger.debug('EXIT domain.getProduct');
  return product;
}

// For debugging using the node Run and Debug REPL.
// Open terminal in the backend directory and run: node src/db/domain.mjs
// const debugRet = await getProductGroups();
// logger.debug('debugRet: ', debugRet);
// await loadProducts(1);
// logger.debug('domain:: ', domain);
// const debugRet = await getProducts(3);
// logger.debug('debugRet: ', debugRet);
// const debugRet = await getProduct(2, 49);
// logger.debug('debugRet: ', debugRet);

export { getProductGroups, getProducts, getProduct };
