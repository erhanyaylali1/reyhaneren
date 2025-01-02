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
          text="İnsan ilişkilerine ve etkileşimlerine verdiğim değer ile ailelerin ve bireylerin daha sağlıklı ve dengeli ilişkiler kurmalarına yardımcı olmayı amaçlıyorum."
          textClassName={styles.firstText}
          fontSizeDesktop={TextFontSizes["22px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
        <Typography
          text="Amacım, aile içi iletişimde yaşanan zorlukları birlikte aşarak, daha mutlu ve huzurlu bir yaşam yolculuğu sunmak. Sorunların çözüme kavuşması için, danışanlarımda yeni bir bakış açısı ve farkındalık yaratmayı hedefliyorum."
          textClassName={styles.firstText}
          fontSizeDesktop={TextFontSizes["22px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
        <Typography
          text="Bireylerin ve çiftlerin sağlıklı ilişkiler kurmalarına destek olurken onlara güvenli ve rahat bir alan sunarak online ve yüzyüze danışmanlık süreçleri yürütüyorum."
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
