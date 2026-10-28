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
    
    const [selectedRegion, setSelectedRegion] = 
        useState("all");
    
    const regions = useMemo(() => {
        return Array.from(
            new Set(
                countries
                    .map((country) => country.region)
                    .filter(Boolean),
            ),
        ).sort();
    }, [countries]);

    const filteredCountries = useMemo(()=> {
        const normalizedSearchTerm =
            searchTerm.trim().toLowerCase();

        return countries.filter((country) => {
            const matchesSearch = 
                !normalizedSearchTerm || 
                country.name.common
                .toLowerCase()
                .includes(normalizedSearchTerm);
            
            const matchesRegion =
                selectedRegion === "all" ||
                country.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });
    }, [countries, searchTerm, selectedRegion]);
            
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

                <label htmlFor="region-filter">
                    Filter by region
                </label>
                <select 
                    id="region-filter"
                    value={selectedRegion}
                    onChange={(event) =>
                        setSelectedRegion(event.target.value)
                    }
                >
                    <option value="all">All regions</option>

                    {regions.map((region) =>(
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
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