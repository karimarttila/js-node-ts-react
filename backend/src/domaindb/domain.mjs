import papaparse from 'papaparse';
import pkg from 'fs';
import logger from '../util/logger.mjs';

const { promises: fs } = pkg;
// NOTE: This is not working when using Node Run and Debug REPL.
// const fs = require('fs').promises;

const { parse } = papaparse;

const productGroupsCsvFile = 'resources/product-groups.csv';

// Simulates domain database.
const domain = {};

/**
 * Gets product groups.
 * Simulates the domain db, but actually just reads the CSV file.
 * @returns {object} product groups {<key>: <category>}
 */
async function getProductGroups() {
  logger.debug('ENTER domain.getProductGroups');
  if ((domain['product-groups'] === null) || (domain['product-groups'] === undefined)) {
    const csvContents = await fs.readFile(productGroupsCsvFile, 'utf8');
    const rows = parse(csvContents, { delimiter: '\t' }).data;
    const ret = rows
      .map((row) => {
        if (row.length === 2) {
          const [key, val] = row;
          return {
            pgId: key,
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

// Internal function to load the products to the domain db.
async function loadProducts(pgId) {
  logger.debug(`ENTER domain.loadProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  if ((domain[productsKey] === null) || (domain[productsKey] === undefined)) {
    const productsCsvFile = `resources/pg-${pgId}-products.csv`;
    const csvContents = await fs.readFile(productsCsvFile, 'utf8');
    const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
    const ret = rows.reduce((acc, row) => {
      if (row.length === 8) {
        // logger.debug(`row: ${JSON.stringify(row)}`);
        // Variable destructuring example.
        const [myPId, myPgId, myTitle, myPrice, myAuthorOrDirector, myYear, myCountry,
          myLanguageOrGenre] = row;
        acc.push(
          {
            id: myPId,
            pgId: myPgId,
            title: myTitle,
            price: myPrice,
            authorOrDirector: myAuthorOrDirector,
            year: myYear,
            country: myCountry,
            languageOrGenre: myLanguageOrGenre,
          },
        );
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
  const filtered = products.filter((row) => row.id === `${pId}` && row.pgId === `${pgId}`);
  const product = filtered[0];
  logger.debug('EXIT domain.getProduct');
  return product;
}

// For debugging using the node Run and Debug REPL.
// const debugRet = await getProductGroups();
// logger.debug('debugRet: ', debugRet);
// await loadProducts(1);
// logger.debug('domain:: ', domain);
// const debugRet = await getProducts(2);
// logger.debug('debugRet: ', debugRet);
// const debugRet = await getProduct(2, 49);
// logger.debug('debugRet: ', debugRet);

export { getProductGroups, getProducts, getProduct };
// exports.getProductGroups = getProductGroups;
