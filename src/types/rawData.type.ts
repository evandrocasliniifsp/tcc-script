export interface RawAffiliation {
  name: string;
  city: string;
  country: string;
}

export interface RawPrize {
  year: string;
  category: string;
  share: string;
  motivation: string;
  affiliations: RawAffiliation[];
}

export interface RawLaureate {
  id: string;
  firstname: string;
  surname: string;
  born: string;
  died?: string | undefined;
  bornCountry: string;
  bornCountryCode: string;
  bornCity: string;
  diedCountry?: string | undefined;
  diedCountryCode?: string | undefined;
  diedCity?: string | undefined;
  gender: string;
  prizes: RawPrize[];
}

export interface RawData {
  laureates: RawLaureate[];
}