import Link from "next/link";
import styles from "./NotFound.module.css";

export default function CountryNotFound(){
    return(
        <section className={styles.container}>
            <p className={styles.eyebrow}>
                Country not found
            </p>

            <h1>We cound not find this country</h1>

            <p>
                The country code may be invalid, or the
                requested country may no longer be available.
            </p>

            <Link 
                className={styles.link}
                href="/countries"
            >
                Back to countries
            </Link>
        </section>
    );
}

