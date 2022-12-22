import fs from 'fs';
import papaparse from 'papaparse';
import logger from '../util/logger.mjs';

const { readFileSync } = fs;
const { parse } = papaparse;

const productGroupsCsvFile = 'resources/product-groups.csv';

// Simulates domain database.
const domain = {};

/**
 * Gets product groups.
 * Simulates the domain db, but actually just reads the CSV file.
 * @returns {object} product groups {<key>: <category>}
 */
function getProductGroups() {
  logger.debug('ENTER domain.getProductGroups');
  let productGroups = domain['product-groups'];
  if ((productGroups === null) || (productGroups === undefined)) {
    const csvContents = readFileSync(productGroupsCsvFile, 'utf8');
    const rows = parse(csvContents, { delimiter: '\t' }).data;
    const obj = {};
    rows.map((row) => {
      if (row.length === 2) {
        // logger.trace(`row: ${JSON.stringify(row)}`);
        const [key, val] = row;
        obj[key] = val;
      }
      // Just for linter return dummy null, we are not interested of result of arrow function.
      return null;
    });
    productGroups = obj;
    domain['product-groups'] = productGroups;
  }
  logger.debug('EXIT domain.getProductGroups');
  return productGroups;
}

// For debugging using the node Run and Debug REPL.
// const ret = getProductGroups();
// logger.debug('ret: ', ret);

export { getProductGroups };
// exports.getProductGroups = getProductGroups;
