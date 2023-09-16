import "@/styles/globals.scss";
import "@/styles/utils.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Container, SSRProvider } from "react-bootstrap";
import styles from "@/styles/App.module.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NextNPProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blog - Share </title>
        <meta name="description" content="blog with nextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SSRProvider>
        <div className={inter.className}>
          <NavBar />
          <NextNPProgress color="#21FA90" />
          <main>
            <Container className={styles.pageContainer}>
              <Component {...pageProps} />
            </Container>
          </main>
          <Footer />
        </div>
      </SSRProvider>
    </>
  );
}