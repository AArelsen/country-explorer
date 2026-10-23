import styles from "./AboutPage.module.css";

export default function AboutPage(){
    return (
        <>
            <section className={styles.intro}>
                <p className={styles.eyebrow}>
                    About the project
                </p>

                <h1 className={styles.title}>
                    About Country Explorer
                </h1>

                <p className={styles.introText}>
                    Country Explorer is a website for discovering
                    countries and learning key facts about different
                    parts of the world.
                </p>
            </section>

            <div className={styles.content}>

                <section className={styles.card}>
                    <h2>Who is it for?</h2>
                    <p>
                        The website is designed for students, travellers,
                        and anyone who wants a simple way to explore
                        information about countries.
                    </p>
                </section>

                <section className={styles.card}>
                    <h2>Data source</h2>
                    <p>
                        Country informatin is retrieved from the REST 
                        Countries API. The API provides information such
                        as flags, capitals, regions, populations, 
                        languages, and currencies.
                    </p>

                    <a
                        className={styles.link}
                        href="http://restcountries.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Visit REST Countries
                    </a>
                </section>

                <section className={styles.card}>
                    <h2>Creater</h2>

                    <p>
                        Country Explorer was created by Adam Arelsen as 
                    part of a Next.js and TypeScript achool project.!§
                    </p>
                </section>
            </div>
        </>
    );
}