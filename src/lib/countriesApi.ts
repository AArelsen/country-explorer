import type { Country} from '@/types/Country';

const COUNTRIES_API_URL = 
"https://api.restcountries.com/countries/v5";


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

async function getCountriesPage(
    apiKey: string,
    offset: number,
): Promise<RestCountriesResponse> {
    const fields = [
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

    const url = 
    `${COUNTRIES_API_URL}` +
    `?limit=100&offset=${offset}` +
    `&response_fields=${fields}`;

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

export async function getCountries(): Promise<Country[]> {

    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if(!apiKey){
        throw new Error(
            "REST_COUNTRIES_API_KEY is not configured.",
        );
    }

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
        .map((country): Country=> ({
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
        }))
        .sort((firstCountry, secondCountry) => 
            firstCountry.name.common.localeCompare(
                secondCountry.name.common,
            ),
        );
}        