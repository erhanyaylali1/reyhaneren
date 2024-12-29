"use client";

import styles from "./page.module.scss";
import Services from "@/components/HomePage/Services";
import AboutMe from "@/components/HomePage/AboutMe";
import USP from "@/components/HomePage/USP";
import Banner from "@/components/HomePage/Banner";
import Features from "@/components/HomePage/Features";

export default function Home() {
  return (
    <div>
      <section className={styles.bannerWrapper}>
        <Banner />
      </section>
      <section className={styles.servicesWrapper}>
        <Services />
      </section>
      <section className={styles.aboutMeWrapper}>
        <AboutMe />
      </section>
      <section className={styles.uspWrapper}>
        <USP />
      </section>
      <section className={styles.featuresWrapper}>
        <Features />
      </section>
    </div>
  );
}
