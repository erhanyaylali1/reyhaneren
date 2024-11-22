"use client";

import styles from "./page.module.scss";
import LandingPageBanner from "../assets/images/Landing Page Banner Image.webp"
import MaskedImage from "@/components/Shared/MaskedImage";
import Colors from "@/shared/enum/colors";
import Typography, { TextAsTypes, TextColors, TextFontSizes } from "@/components/Shared/Typography/Typography";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";

export default function Home() {
    return (
        <div>
            <div className={styles.bannerWrapper}>
                <MaskedImage
                    source={LandingPageBanner}
                    imageClassName={styles.bannerImage}
                    altText="Aile Danışmanlığı Örnek Fotoğrafı"
                    opacity="0.4"
                    maskColor={Colors["light-blue"]}
                    priority={true}
                />
                <div className={styles.bannerTextWrapper}>
                    <Typography text="Huzurlu ve sağlıklı bir aile hayatına sahip olun."
                        as={TextAsTypes.h1}
                        fontSizeDesktop={TextFontSizes["48px"]}
                        fontSizeMobile={TextFontSizes["24px"]}
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
            </div>
        </div>
    );
}
