export interface CountryName {
    common: string;
    official: string;
}

export interface CountryFlag {
    png: string;
    svg: string;
    alt?: string; 
}

export interface Country{
    name: CountryName;
    cca3: string;
    capital?: string[];
    region: string;
    population: number;
    flags: CountryFlag;
}