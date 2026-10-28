import styles from "./Loading.module.css";

export default function Loading() {
    return (
        <section
            className={styles.container}
            aria-live="polite"
            aria-busy="true"
        >
            <div
                className={styles.spinner}
                aria-hidden="true"
            />

            <h1>
                Loading countries
            </h1>

            <p>
                Country information is being retrived.
            </p>
        </section>
    )
}