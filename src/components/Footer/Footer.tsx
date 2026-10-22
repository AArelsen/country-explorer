import styles from "./Footer.module.css"
export function Footer () {
    const currentYear = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <p>© {currentYear} Country Explorer</p>
                <p>
                    Country data provided by{" "}
                    <a  
                        className={styles.link}
                        href="http://restcountries.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        REST Countries
                    </a>
                </p>
            </div>
            
        </footer>
    );
}
