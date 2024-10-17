export interface Country {
  name: Name;
  independent: boolean;
  currencies: Currencies;
  capital: string[];
  languages: Languages;
  flag: string;
  flags: Flags;
  maps: Maps;
  population: number;
}

export interface Currencies {
  [key: string]: { name: string; symbol: string };
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Languages {
  [key: string]: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
}
