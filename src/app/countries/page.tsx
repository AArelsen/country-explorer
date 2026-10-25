import { CountryCard } from "@/components/CountryCard/CountryCard";
import { getCountries } from "@/lib/countriesApi";

export default async function CountriesPage(){
    const countries = await getCountries();
    return(
        <section>
            <p>Contries from the API will be shown here.</p>
            <h1>Explore Countries</h1>

            <p>{countries.length} countries found.</p>
            <div>
                {countries.map((country)=>(
                    <CountryCard
                        key={country.cca3}
                        country={country}
                    />  
                ))}
            </div>
        </section>
    );
}