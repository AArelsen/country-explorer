import { CountryExplorer } from "@/components/CountryExplorer/CountryExplorer";
import { getCountries } from "@/lib/countriesApi";
import styles from "./CountriesPage.module.css";

export default async function CountriesPage(){
    const countries = await getCountries();
    return(
        <section>
            <header className={styles.intro}>
                <p className={styles.eyebrow}>
                Discover the world
                </p>

                <h1 className={styles.title}>
                    Explore Countries
                </h1>
            </header>
            <CountryExplorer countries={countries}/>
        </section>
    );
}