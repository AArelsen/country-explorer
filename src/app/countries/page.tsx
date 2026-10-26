import { CountryCard } from "@/components/CountryCard/CountryCard";
import { getCountries } from "@/lib/countriesApi";
import styles from "./CountriesPage.module.css";

export default async function CountriesPage(){
    const countries = await getCountries();
    return(
        <section>
            <header className={styles.intro}>

                <p className={styles.eyebrow}>
                Contries from the API will be shown here.
                </p>

                <h1 className={styles.title}>
                    Explore Countries
                </h1>

                <p className={styles.resultCount} >
                    {countries.length} countries found.
                </p>

            </header>
            
            <div className={styles.grid}>
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