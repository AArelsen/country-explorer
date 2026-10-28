"use client"

import { useEffect } from "react"
import styles from "./Error.module.css";

interface CountriesErrorProps{
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function CountriesError({
    error,
    reset,
}: CountriesErrorProps){
    useEffect(() => {
        console.error(error);
    },[error]);

    return(
        <section
        className={styles.container}
        role="alert"
        >
            <p className={styles.eyebrow}>
                Somting went wrong
            </p>

            <h1>Countries could not be loaded</h1>
        
            <p>
                Please try again. If the problem continues,
                try later.
            </p>

            <button
                className={styles.button}
                type="button"
                onClick={reset}
            >
                Try again
            </button>

        </section>
    );
}