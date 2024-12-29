import React from "react";
import styles from "./aboutme.module.scss";
import OwnerPicture from "../../../assets/images/reyhan eren.webp";
import OwnerPictureMobile from "../../../assets/images/reyhan eren mobil.webp";
import { getImageProps } from "next/image";
import Typography, {
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";

const AboutMe = () => {
  const {
    props: { srcSet: OwnerPictureSrcSet },
  } = getImageProps({
    alt: "Reyhan Eren fotoğrafı",
    src: OwnerPicture,
  });

  const {
    props: { srcSet: OwnerPictureMobileSrcSet },
  } = getImageProps({
    alt: "Reyhan Eren fotoğrafı",
    src: OwnerPictureMobile,
  });

  return (
    <div className={styles.aboutMeWrapper}>
      <div className={styles.aboutMeContent}>
        <Typography
          text="Merhaba, ben Reyhan 👋🏻"
          textClassName={styles.title}
          type={TextType.title}
          fontSizeDesktop={TextFontSizes["28px"]}
          fontSizeMobile={TextFontSizes["22px"]}
        />
        <Typography
          text="İnsan ilişkilerine ve aile bağlarına büyük önem veren bir aile danışmanıyım. 
                        Ailelerin ve bireylerin daha sağlıklı ve dengeli ilişkiler kurmalarına yardımcı olmayı amaçlıyorum."
          textClassName={styles.firstText}
          fontSizeDesktop={TextFontSizes["24px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
        <Typography
          text="Amacım, aile içi iletişimde yaşanan zorlukları birlikte aşarak, daha mutlu ve 
                        huzurlu bir yaşam yolculuğu sunmak. Sorunların çözüme kavuşması için birlikte çalışarak, yeni bir bakış 
                        açısı ve farkındalık yaratmayı hedefliyorum."
          fontSizeDesktop={TextFontSizes["24px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.light}
        />
      </div>
      <picture>
        <source media="(min-width: 1400px)" srcSet={OwnerPictureSrcSet} />
        <source media="(min-width: 300px)" srcSet={OwnerPictureMobileSrcSet} />
        <img className={styles.aboutMeImage} alt="Reyhan Eren Fotoğrafı" />
      </picture>
    </div>
  );
};

export default AboutMe;
