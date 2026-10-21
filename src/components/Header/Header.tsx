import Link from "next/link";
import { Navigation } from "../Navigation/Navigation";
import styles from "./Header.module.css";

export function Header () {

    return(
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link className={styles.logo} href="/">
                    Country Explorer
                </Link>

                <Navigation />
            </div>
        </header>
    );
}

