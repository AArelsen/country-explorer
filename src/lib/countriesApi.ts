import type { Country} from '@/types/Country';

const COUNTRIES_API_URL = 
"https://api.restcountries.com/countries/v5";


const COUNTRY_FIELDS = [
    "names.common",
    "names.official",
    "codes.alpha_3",
    "capitals",
    "region",
    "population",
    "flag.url_png",
    "flag.url_svg",
    "flag.description",
].join(",");

interface RestCountry{
    names: {
        common: string;
        official: string;
    };
    codes:{
        alpha_3: string;
    };
    capitals?: Array<{
        name: string;
    }>;
    region: string;
    population: number;
    flag: {
        url_png: string;
        url_svg: string;
        description?: string;
    };
}

interface RestCountriesResponse{
    data: {
        objects: RestCountry[];
        meta: {
            count: number;
            offset: number;
            more: boolean;
        };
    };
}

function getApiKey(): string {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if(!apiKey){
        throw new Error(
                "REST_COUNTRIES_API_KEY is not configured.",
        );
    }

    return apiKey;
}

function mapRestCountry(country: RestCountry): Country{
    return { 
        name: {
            common: country.names.common,
            official: country.names.official,
        },
        cca3: country.codes.alpha_3,
        capital: country.capitals?.map(
            (capital)=> capital.name,
        ),
        region: country.region,
        population: country.population,
        flags:{
            png: country.flag.url_png,
            svg: country.flag.url_svg,
            alt: country.flag.description,
        },
    };
}
    
async function getCountriesPage(
    apiKey: string,
    offset: number,
): Promise<RestCountriesResponse> {
    const url = 
    `${COUNTRIES_API_URL}` +
    `?limit=100&offset=${offset}` +
    `&response_fields=${COUNTRY_FIELDS}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if(!response.ok){
        throw new Error(
            `Failed to fetch countries: ${response.status}`,
        );
    }
    return response.json();
}


export async function getCountries(): Promise<Country[]>{
   const apiKey = getApiKey();
   const countries: RestCountry[] = []; 

    let offset= 0;
    let hasMoreCountries = true;

    while (hasMoreCountries){
        const response = await getCountriesPage(
            apiKey, 
            offset,
        );

        countries.push(...response.data.objects);

        hasMoreCountries = response.data.meta.more;

        offset += response.data.meta.count;    
    }

    return countries
        .map(mapRestCountry)
        .sort((firstCountry, secondCountry) => 
            firstCountry.name.common.localeCompare(
                secondCountry.name.common,
            ),
        );
} 

export async function getCountryByCode(
    code: string,
): Promise<Country | null> {
    const apiKey = getApiKey();
    const normalizedCode = code.toUpperCase();

    const url = 
    `${COUNTRIES_API_URL}/codes.alpha_3/` +
    `${encodeURIComponent(normalizedCode)}` +
    `?response_fields=${COUNTRY_FIELDS}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if(response.status===400){
        return null;
    }

    if(!response.ok){
        throw new Error(
            `Failed to fetch countries: ${response.status}`,
        );
    }

    const result: RestCountriesResponse = 
        await response.json();
    
    const country = result.data.objects[0];

    if(!country){
        return null;
    }

    return mapRestCountry(country);
}

