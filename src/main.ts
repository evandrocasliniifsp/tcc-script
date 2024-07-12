import {
  transformHandler,
  populateHandler,
  testHandler,
} from './scripts';

const main = async () => {
  // console.info('Starting to transform raw data');
  // await transformHandler();
  // console.info('Sucessfully transformed raw data');

  // console.info('Starting to populate database');
  // await populateHandler();
  // console.info('Successfully populated database');

  console.info('Starting to test the interfaces');
  await testHandler();
  console.info('Successfully tested the interfaces');
};

main();