import React from "react";
import styles from "./aboutme.module.scss";
import OwnerPicture from "../../../assets/images/reyhan eren.webp";
import Image from "next/image";
import Typography, {
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Link from "next/link";
import Button, {
  ButtonSizes,
  ButtonVariants,
} from "@/components/Shared/Button/Button";

const AboutMe = () => {
  return (
    <div className={styles.aboutMeWrapper}>
      <div className={styles.aboutMeContent}>
        <Typography
          text="Aile Danışmanı"
          type={TextType.title}
          textClassName={styles.preTitle}
          fontSizeDesktop={TextFontSizes["28px"]}
          fontSizeMobile={TextFontSizes["22px"]}
        />
        <Typography
          text="Reyhan Eren"
          textClassName={styles.title}
          type={TextType.title}
          fontSizeDesktop={TextFontSizes["40px"]}
          fontSizeMobile={TextFontSizes["28px"]}
        />
        <Typography
          text="Aile üyelerinin ve bireylerin daha sağlıklı ve dengeli ilişkiler kurmalarına destek olmak için seanslar yürütüyorum."
          textClassName={styles.firstText}
          fontSizeDesktop={TextFontSizes["22px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
        <Typography
          text="Sorunlar çözüme kavuşurken danışanlarımda yeni bir bakış açısı ve farkındalık yaratmayı hedefliyorum."
          textClassName={styles.firstText}
          fontSizeDesktop={TextFontSizes["22px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
        <div className={styles.buttonWrapper}>
          <Link href={"/hakkimda"}>
            <Button
              title="Beni Tanıyın"
              ariaLabel="Beni Tanıyın"
              size={ButtonSizes.lg}
              className={styles.aboutMeButton}
            />
          </Link>
          <Link href={"/randevu-al"}>
            <Button
              title="Randevu Oluşturun"
              ariaLabel="Randevu Oluşturun"
              variant={ButtonVariants.yellow}
              size={ButtonSizes.lg}
            />
          </Link>
        </div>
      </div>
      <Image
        className={styles.aboutMeImage}
        alt="Reyhan Eren Fotoğrafı"
        src={OwnerPicture}
      />
    </div>
  );
};

export default AboutMe;
