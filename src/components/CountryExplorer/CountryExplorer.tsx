"use client";

import { useMemo, useState } from "react";
import type { Country } from "@/types/Country";
import { CountryCard } from "@/components/CountryCard/CountryCard";
import styles from "./CountryExplorer.module.css";

interface CountryExplorerProps{
    countries: Country[];
}

export function CountryExplorer({
    countries,

}: CountryExplorerProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCountries = useMemo(()=> {
        const normalizedSearchTerm =
            searchTerm.trim().toLowerCase();

        if(!normalizedSearchTerm) {
            return countries;
        }

        return countries.filter((country) =>
            country.name.common
                .toLowerCase()
                .includes(normalizedSearchTerm),
        );
    }, [countries, searchTerm]);

    return (
        <>
            <div className={styles.controls}>
                <label htmlFor="country-search"> 
                    Search by country name
                </label>

                <input
                id="country-search"
                type="Search"
                value={searchTerm}
                onChange={(event) =>
                    setSearchTerm(event.target.value)
                    }
                    placeholder="For example, Norway"
                />
            </div>

            <p 
                className={styles.resultCount}
                aria-live="polite"
            >
                {filteredCountries.length} {" "}
                {filteredCountries.length === 1
                    ? "country"
                    : "countries"}{" "}
                found
            </p>

            {filteredCountries.length ===0 ? (
                <p className={styles.emptyMessage}>
                    No countries match your search.
                </p>
            ) : ( 
                <div className={styles.grid}>
                    {filteredCountries.map((country)=> (
                        <CountryCard
                            key={`${country.cca3}-${country.name.common}`}
                            country={country}
                        />
                    ))}
                </div>
            )}
        </>
    );
}