import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import useAuthenticateduser from "@/hooks/useAuthenticatedUser";
import styles from "@/styles/App.module.css";
import "@/styles/globals.scss";
import "@/styles/utils.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNPProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { Container, SSRProvider } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useOnboardingRedirect();
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

function useOnboardingRedirect() {
  const { user } = useAuthenticateduser();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.username && router.pathname !== "/onboarding") {
      router.push("/onboarding?returnTo=" + router.asPath);
    }
  }, [user, router.pathname]);
}
