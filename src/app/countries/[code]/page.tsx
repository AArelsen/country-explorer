import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/lib/countriesApi";
import styles from "./CountryDetailsPage.module.css";

interface CountryDetailPageProps{
    params: Promise<{
        code: string;
    }>;
}

export default async function CountryDetailsPage({
    params,
}: CountryDetailPageProps) {
    const { code } = await params;
    const country = await getCountryByCode(code);

    if(!country){
        notFound();
    }

    const capital = 
    country.capital?.join(", ") ?? 
    "No capital available.";

    const flagAlt = 
    country.flags.alt ?? 
    `Flag of${country.name.common}`;

    return (
        <article className={styles.page}>
            <Link 
                className={styles.backLink}
                href="/countries">

                Back to countries

            </Link>
            <div className={styles.layout}>

                <Image
                    className={styles.flag}
                    src={country.flags.svg}
                    alt={flagAlt}
                    width={640}
                    height={400}
                />

                <div className={styles.content}>
                    <h1>
                        {country.name.common}
                    </h1>
                    <p className={styles.officialName}>
                        {country.name.official}
                    </p>

                    <dl className={styles.details}>

                        <div className={styles.detail}>
                            <dt>Country code</dt>
                            <dd>{country.cca3}</dd>
                        </div>

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
            </div>   
        </article>
    );
}

