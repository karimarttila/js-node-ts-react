const papaparse = import('papaparse');
const fs = import('fs');

import { logger } from './src/util/logger.js';

const productGroupsCsvFile = 'resources/product-groups.csv';
