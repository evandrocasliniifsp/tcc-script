export interface Institution {
  id: string;
  name: string;
  headquarters: string;
}

export interface Prize {
  id: string;
  year: number;
  category: string;
  share: number;
  motivation: string;
}

export interface Laureate {
  id: string
  firstname: string;
  surname: string;
  birthDate?: Date | null;
  deathDate?: Date | null;
  birthLocation: string;
  deathLocation?: string | null;
  gender: string;
}

export interface LaureatePrize {
  id: string;
  prizeId: string;
  laureateId: string;
  institutionId: string | null;
}

export type LaureateKey = `${string}-${string}`;
export type PrizeKey = `${number}-${string}`;
export type InstitutionKey = `${string}-${string}`;
export type LaureatePrizeKey = `${string}-${string}`;

export interface CorrelationId {
  institutionId: string;
  prizeId: string;
};
