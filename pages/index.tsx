import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>

        <p className={styles.description}>
          It is a website to manage you films.
        </p>

        <div className={styles.grid}>
          <a href="/database" className={styles.card}>
            <h2>Get Start &rarr;</h2>
          </a>
        </div>
      </main>
    </div>
  )
}
