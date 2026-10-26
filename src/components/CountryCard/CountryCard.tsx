import Image from "next/image"
import type { Country } from "@/types/Country";
import styles from "./CountryCard.module.css";
import Link from "next/link";


interface CountryCardProps{
    country: Country;
}

export function CountryCard({
    country,
}: CountryCardProps) {
    const capital =
        country.capital?.join(", ") ??
        "No capital available"

    const flagAlt = 
        country.flags.alt ??
        `Flag of ${country.name.common}`;

    return (
        <Link 
        className={styles.link}
        href={`/countries/${country.cca3}`}
        >
            <article className={styles.card}>
                <Image
                    className={styles.flag}
                    src={country.flags.svg}
                    alt={flagAlt}
                    width={320}
                    height={200}
                />
                
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        {country.name.common}
                    </h2>

                    <dl className={styles.details}>
                        <div className={styles.detail}>
                            <dt>Capital</dt>
                            <dd>{capital}</dd>
                        </div>

                        <div className={styles.detail}>
                            <dt>Region</dt>
                            <dd>{country.region}</dd>
                        </div>

                        <div className={styles.detail}>
                            <dt>Population</dt>
                            <dd>
                                {country.population.toLocaleString("en")}
                            </dd>
                        </div>
                    </dl>
                </div>
            </article>
        </Link>
    );
}
