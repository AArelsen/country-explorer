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

    const [sortOption, setSortOption] =
        useState("name-asc");   
    
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

    const sortedCountries = useMemo(() => {
        const countriesToSort = [...filteredCountries];

        switch(sortOption){
            case "name-desc":
                return countriesToSort.sort((first, second) =>
                    second.name.common.localeCompare(
                        first.name.common,
                    ),
                );

            case "population-asc":
                return countriesToSort.sort(
                    (first, second) =>
                        first.population - second.population,
                );

            case "population-desc":
                return countriesToSort.sort(
                    (first, second) =>
                        second.population - first.population,
                );
            
            default:
                return countriesToSort.sort((first, second) =>
                    first.name.common.localeCompare(
                        second.name.common,
                    ),
                );
            }
        }, [filteredCountries, sortOption]);

    const filtersAreReset = 
        searchTerm === "" &&
        selectedRegion === "all" &&
        sortOption === "name-asc";    

    function resetFilters(){
        setSearchTerm("");
        setSelectedRegion("all");
        setSortOption("naem-asc");
    }
            
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
                
                <label htmlFor="country-sort">
                    Sort Countries
                </label>

                <select
                    id="country-sort"
                    value={sortOption}
                    onChange={(event) =>
                        setSortOption(event.target.value)
                    }
                >
                    <option value="name-asc">Name : A-Z</option>
                    <option value= "name-desc">Name : Z-A</option>
                    <option value="population-desc">
                        Population: high to low
                    </option>
                    <option value="population-asc">
                        Population: low to high
                    </option>
                </select>

                <button 
                    className={styles.resetButton}
                    type="button"
                    onClick={resetFilters}
                    disabled={filtersAreReset}
                >
                    Reset filters
                </button>

            </div>

            <p 
                className={styles.resultCount}
                aria-live="polite"
            >
                {sortedCountries.length} {" "}
                {sortedCountries.length === 1
                    ? "country"
                    : "countries"}{" "}
                found
            </p>

            {sortedCountries.length ===0 ? (
                <p className={styles.emptyMessage}>
                    No countries match your search.
                </p>
            ) : ( 
                <div className={styles.grid}>
                    {sortedCountries.map((country)=> (
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