import {
  transformHandler,
  populateHandler,
  testHandler,
} from './scripts';

import {
  SHOULD_TRANSFORM,
  SHOULD_POPULATE,
  SHOULD_TEST,
} from './config';

const main = async () => {
  if (SHOULD_TRANSFORM) {
    console.info('Starting to transform raw data');
    await transformHandler();
    console.info('Sucessfully transformed raw data');
  }

  if (SHOULD_POPULATE) {
    console.info('Starting to populate database');
    await populateHandler();
    console.info('Successfully populated database');
  }

  if (SHOULD_TEST) {
    console.info('Starting to test the interfaces');
    await testHandler();
    console.info('Successfully tested the interfaces');
  }
};

main();