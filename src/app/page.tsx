"use client";

import styles from "./page.module.scss";
import LandingPageBanner from "../assets/images/Landing Page Banner Image.webp"
import MaskedImage from "@/components/Shared/MaskedImage";
import Colors from "@/shared/enum/colors";
import Typography, { TextAsTypes, TextColors, TextFontSizes } from "@/components/Shared/Typography/Typography";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";
import Services from "@/components/HomePage/Services";
import AboutMe from "@/components/HomePage/AboutMe";
import USP from "@/components/HomePage/USP";

export default function Home() {
    return (
        <div>
            <section className={styles.bannerWrapper}>
                <MaskedImage
                    source={LandingPageBanner}
                    imageClassName={styles.bannerImage}
                    altText="Aile Danışmanlığı Örnek Fotoğrafı"
                    opacity="0.3"
                    maskColor={Colors["light-blue"]}
                    priority={true}
                />
                <div className={styles.bannerTextWrapper}>
                    <Typography text="Huzurlu ve sağlıklı bir aile hayatına sahip olun."
                        as={TextAsTypes.h1}
                        fontSizeDesktop={TextFontSizes["48px"]}
                        fontSizeMobile={TextFontSizes["28px"]}
                        color={TextColors.light}
                        textClassName={styles.bannerText}
                    />
                    <Button
                        title="Randevu Al"
                        ariaLabel="Randevu Al"
                        handleClick={() => null}
                        size={ButtonSizes.lg}
                    />
                </div>
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
        </div>
    );
}
