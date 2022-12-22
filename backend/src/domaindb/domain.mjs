import logger from '../util/logger.mjs';

const papaparse = import('papaparse');
const fs = import('fs');

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
  const productGroups = domain['product-groups'];
  // if ((productGroups === null) || (productGroups === undefined)) {
  //   const csvContents = fs.readFileSync(productGroupsCsvFile, 'utf8');
  //   const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
  //   const obj = {};
  //   rows.map((row) => {
  //     if (row.length === 2) {
  //       // logger.trace(`row: ${JSON.stringify(row)}`);
  //       const [key, val] = row;
  //       obj[key] = val;
  //     }
  //     // Just for linter return dummy null, we are not interested of result of arrow function.
  //     return null;
  //   });
  //   productGroups = obj;
  //   domain['product-groups'] = productGroups;
  // }
  logger.debug('EXIT domain.getProductGroups');
  return productGroups;
}

getProductGroups();

export { getProductGroups };
// exports.getProductGroups = getProductGroups;
