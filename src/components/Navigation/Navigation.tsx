import Link from "next/link";   
import styles from "./Navigation.module.css";

export function Navigation() {
    return (
        <nav aria-label="Main navigation">
            <ul className={styles.list}>
                <li>
                    <Link className= {styles.link} href="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link className={styles.link} href="/countries">
                        Countries
                    </Link>
                </li>

                <li>
                    <Link className={styles.link} href="/about">
                        About
                    </Link>
                </li>
            </ul>

        </nav>
    );
}