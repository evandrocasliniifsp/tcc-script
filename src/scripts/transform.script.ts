import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

import { makeDateFromString } from '../helpers';
import { RAW_FILE_PATH, PROCESSED_FILE_BASE_PATH } from "../config";
import {
  RawData,
  RawLaureate,
  Laureate,
  Prize,
  RawPrize,
  Institution,
  RawAffiliation,
  LaureatePrize,
  LaureateKey,
  InstitutionKey,
  LaureatePrizeKey,
  PrizeKey,
  CorrelationId,
} from '../types';

const laureates = new Map<LaureateKey, Laureate>();
const prizes = new Map<PrizeKey, Prize>();
const institutions = new Map<InstitutionKey, Institution>();
const laureatePrizes = new Map<LaureatePrizeKey, LaureatePrize>();

const makeLaureate = (rawLaureate: RawLaureate): Laureate => {
  const laureateKey: LaureateKey =
    `${rawLaureate.firstname}-${rawLaureate.surname}`;

  const foundLaureate = laureates.get(laureateKey);
  if (foundLaureate) return foundLaureate;
  
  const laureate: Laureate = {
    id: crypto.randomUUID(),
    firstname: rawLaureate.firstname,
    surname: rawLaureate.surname,
    birthDate: makeDateFromString(rawLaureate.born)!,
    deathDate: makeDateFromString(rawLaureate.died),
    birthLocation: rawLaureate.bornCountry,
    deathLocation: rawLaureate.diedCountry,
    gender: rawLaureate.gender,
  };

  laureates.set(laureateKey, laureate);
  return laureate;
};

const makePrizes = (rawPrizes: RawPrize[]) => {
  for (const rawPrize of rawPrizes) {
    const prizeKey: PrizeKey = `${Number(rawPrize.year)}-${rawPrize.category}`;

    if (prizes.get(prizeKey)) continue;

    const prize: Prize = {
      id: crypto.randomUUID(),
      category: rawPrize.category,
      motivation: rawPrize.motivation,
      share: Number(rawPrize.share),
      year: Number(rawPrize.year),
    };

    prizes.set(prizeKey, prize);
  }
};

const makeInstitution = (rawPrizes: RawPrize[]): CorrelationId[] => {
  const correlationIds: CorrelationId[] = [];

  for (const rawPrize of rawPrizes) {
    const prizeKey: PrizeKey = `${Number(rawPrize.year)}-${rawPrize.category}`;
    const prize = prizes.get(prizeKey);

    if (!prize) throw new Error('Prize not found');

    if (!rawPrize.affiliations.length) continue;

    const [rawInstitution] = rawPrize.affiliations;
    const institutionKey: InstitutionKey =
      `${rawInstitution.name}-${rawInstitution.country}`;

    const foundInstitution = institutions.get(institutionKey);
    if (foundInstitution) {
      correlationIds.push({
        institutionId: foundInstitution.id,
        prizeId: prize.id,
      });
      continue;
    };

    const institution: Institution = {
      id: crypto.randomUUID(),
      name: rawInstitution.name || "unknown",
      headquarters: rawInstitution.country || "unknown",
    };

    institutions.set(institutionKey, institution);
    correlationIds.push({
      institutionId: institution.id,
      prizeId: prize.id,
    });
  }

  return correlationIds;
};

const makeLaureatePrize = (
  laureateId: string,
  prizeId: string,
  institutionId: string,
) => {
  const laureatePrizeKey: LaureatePrizeKey = 
    `${laureateId}-${prizeId}`;
  
  if (laureatePrizes.get(laureatePrizeKey)) return;

  const laureatePrize: LaureatePrize = {
    id: crypto.randomUUID(),
    laureateId,
    prizeId,
    institutionId,
  };

  laureatePrizes.set(laureatePrizeKey, laureatePrize);
}

export const transformHandler = async () => {
  const { laureates: rawData }: RawData = JSON.parse(
    await fs.readFile(
      RAW_FILE_PATH,
      { encoding: "utf8" },
    )
  );

  for await (const data of rawData) {
    const laureate = makeLaureate(data);
    makePrizes(data.prizes);
    const correlationIds = makeInstitution(data.prizes);

    for (const correlationId of correlationIds) {
      makeLaureatePrize(
        laureate.id,
        correlationId.prizeId,
        correlationId.institutionId,
      );
    }
  }

  await fs.writeFile(
    path.join(PROCESSED_FILE_BASE_PATH, 'laureates.json'),
    JSON.stringify({ laureates: Array.from(laureates.values()) }),
  );

  await fs.writeFile(
    path.join(PROCESSED_FILE_BASE_PATH, 'prizes.json'),
    JSON.stringify({ prizes: Array.from(prizes.values()) }),
  );

  await fs.writeFile(
    path.join(PROCESSED_FILE_BASE_PATH, 'institutions.json'),
    JSON.stringify({ institutions: Array.from(institutions.values()) }),
  );

  await fs.writeFile(
    path.join(PROCESSED_FILE_BASE_PATH, 'laureatePrizes.json'),
    JSON.stringify({ laureatePrizes: Array.from(laureatePrizes.values()) }),
  );
};