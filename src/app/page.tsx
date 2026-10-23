import Link from "next/link";
import styles from "./HomePage.module.css";

export default function HomePage(){
  return (
    <>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Discover the world</p>

          <h1 className={styles.title}>Explorer countries around the world</h1>
          
          <p className={styles.description}>
            Explore countries, compare key facts and learn more 
            about different parts of the world.
          </p>
          
          <Link 
            className={styles.button}
            href="/countries"
          >
            Explore countries

          </Link>

        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>
            What can you explore?
          </h2>

          <div className={styles.grid} >

            <article className={styles.card}>
              <h3>Countries</h3>

              <p>
                Browse contries and discover their flags,
                capitals, regions, populations and more.
              </p>
            </article>

            <article className={styles.card}>
              <h3>Country details</h3>
              <p>
                Open a country to se more information,
                including languages nad currencies.
              </p>
            </article>

            <article className={styles.card}>
              <h3>Find what you need</h3>
              <p>
                Use search, filtering, and sortering to find
                related countries more easily.
              </p>
            </article>
            
          </div>
        </section>
    </>
  );
}