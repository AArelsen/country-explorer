import Image from "next/image"
import type { Country } from "@/types/Country";

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
        <article>
            <Image
                src={country.flags.svg}
                alt={flagAlt}
                width={320}
                height={200}
            />
            <h2>{country.name.common}</h2>

            <dl>
                <div>
                    <dt>Capital</dt>
                    <dd>{capital}</dd>
                </div>

                <div>
                    <dt>Region</dt>
                    <dd>{country.region}</dd>
                </div>

                <div>
                    <dt>Population</dt>
                    <dd>
                        {country.population.toLocaleString("en")}
                    </dd>
                </div>
            </dl>
        </article>
    );
}
