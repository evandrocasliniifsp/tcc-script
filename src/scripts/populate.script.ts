import axios from 'axios';
import fs from 'node:fs/promises';
import path from 'node:path';

import {
  PROCESSED_FILE_BASE_PATH,
  REST_API_BASE_URL,
} from '../config';
import {
  Institution,
  Laureate,
  LaureatePrize,
  Prize
} from '../types';

const readProcessedFile = async (path: string) => {
  return JSON.parse(
    await fs.readFile(
      path, {
        encoding: 'utf-8',
      },
    ),
  );
}

export const populateLaureate = async () => {
  console.info('Starting to read processed Laureate JSON file');
  const processedLaureatePath = path.join(
    PROCESSED_FILE_BASE_PATH,
    'laureates.json',
  );
  const { laureates }: { laureates: Laureate[] } =
    await readProcessedFile(processedLaureatePath);

  console.info('Starting to create Laureates');
  const url = `${REST_API_BASE_URL}/laureate`;
  for await (const laureate of laureates) {
    await axios.post(url, laureate);
    console.info(`Laureate ${laureate.id} created`);
  }
  console.info('Laureates created successfully');
};

export const populatePrize = async () => {
  console.info('Starting to read processed Prize JSON file');
  const processedPrizePath = path.join(
    PROCESSED_FILE_BASE_PATH,
    'prizes.json',
  );
  const { prizes }: { prizes: Prize[] } =
    await readProcessedFile(processedPrizePath);

  console.info('Starting to create Prizes');
  const url = `${REST_API_BASE_URL}/prize`;
  for await (const prize of prizes) {
    await axios.post(url, prize);
    console.info(`Prize ${prize.id} created`);
  }
  console.info('Prizes created successfully');
};

export const populateInstitution = async () => {
  console.info('Starting to read processed Institution JSON file');
  const processedInstitutionPath = path.join(
    PROCESSED_FILE_BASE_PATH,
    'institutions.json',
  );
  const { institutions }: { institutions: Institution[] } =
    await readProcessedFile(processedInstitutionPath);

  console.info('Starting to create Institutions');
  const url = `${REST_API_BASE_URL}/institution`;
  for await (const institution of institutions) {
    await axios.post(url, institution);
    console.info(`Institution ${institution.id} created`);
  }
  console.info('Institutions created successfully');
};

export const populateLaureatePrize = async () => {
  console.info('Starting to read processed LaureatePrize JSON file');
  const processedLaureatePrizePath = path.join(
    PROCESSED_FILE_BASE_PATH,
    'laureatePrizes.json',
  );
  const { laureatePrizes }: { laureatePrizes: LaureatePrize[] } =
    await readProcessedFile(processedLaureatePrizePath);

  console.info('Starting to create LaureatePrizes');
  const url = `${REST_API_BASE_URL}/laureate/prize`;
  for await (const laureatePrize of laureatePrizes) {
    await axios.post(url, laureatePrize);
    console.info(`LaureatePrize ${laureatePrize.id} created`);
  }
  console.info('LaureatePrizes created successfully');
};

export const populateHandler = async () => {
  await populateLaureate();
  await populatePrize();
  await populateInstitution();
  await populateLaureatePrize();
};