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
  if ((domain['product-groups'] === null) || (domain['product-groups'] === undefined)) {
    const csvContents = readFileSync(productGroupsCsvFile, 'utf8');
    const rows = parse(csvContents, { delimiter: '\t' }).data;
    const ret = rows.reduce((acc, row) => {
      if (row.length === 2) {
        const [key, val] = row;
        acc[key] = val;
      }
      return acc;
    }, {});
    domain['product-groups'] = ret;
  }
  logger.debug('EXIT domain.getProductGroups');
  return domain['product-groups'];
}

// For debugging using the node Run and Debug REPL.
// const ret = getProductGroups();
// logger.debug('ret: ', ret);

export { getProductGroups };
// exports.getProductGroups = getProductGroups;
