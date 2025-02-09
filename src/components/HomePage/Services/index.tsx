import Typography, {
  TextAsTypes,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import React from "react";
import styles from "./services.module.scss";
import Image from "next/image";
import Service1Image from "../../../assets/images/service1.webp";
import Service2Image from "../../../assets/images/service2.webp";
import Service3Image from "../../../assets/images/service3.webp";
import Link from "next/link";

const Services = () => {
  return (
    <div className="container">
      <Typography
        textClassName={styles.title}
        text="Sunduğumuz Hizmetler"
        as={TextAsTypes.h2}
        fontSizeDesktop={TextFontSizes["32px"]}
        fontSizeMobile={TextFontSizes["24px"]}
        type={TextType.title}
      />
      <div className={styles.servicesWrapper}>
        <Link href="hizmetler" className={styles.serviceLink}>
          <div className={styles.serviceWrapper}>
            <Image
              src={Service1Image}
              alt="Aile Danışmanlığı Servisi Fotoğrafı"
              className={styles.serviceImage}
              loading="eager"
            />
            <div className={styles.serviceBody}>
              <Typography
                text="Birey Odaklı Aile Danışmanlığı"
                as={TextAsTypes.h3}
                fontWeight={TextFontWeights.semibold}
              />
              <Typography
                text="''Duygusal ihtiyaçlarınızı keşfedin''"
                fontWeight={TextFontWeights.regular}
                as={TextAsTypes.p}
              />
            </div>
          </div>
        </Link>
        <Link href="hizmetler" className={styles.serviceLink}>
          <div className={styles.serviceWrapper}>
            <Image
              src={Service2Image}
              alt="Aile Danışmanlığı Servisi Fotoğrafı"
              className={styles.serviceImage}
              loading="eager"
            />
            <div className={styles.serviceBody}>
              <Typography
                text="Çift Odaklı Aile Danışmanlığı"
                as={TextAsTypes.h3}
                fontWeight={TextFontWeights.semibold}
              />
              <Typography
                text="''Sağlıklı bir ilişki için adım atın''"
                fontWeight={TextFontWeights.regular}
                as={TextAsTypes.p}
              />
            </div>
          </div>
        </Link>
        <Link href="hizmetler" className={styles.serviceLink}>
          <div className={styles.serviceWrapper}>
            <Image
              src={Service3Image}
              alt="Aile Danışmanlığı Servisi Fotoğrafı"
              className={styles.serviceImage}
              loading="eager"
            />
            <div className={styles.serviceBody}>
              <Typography
                text="Aile Odaklı Aile Danışmanlığı"
                as={TextAsTypes.h3}
                fontWeight={TextFontWeights.semibold}
              />
              <Typography
                text="''Aile dinamiklerinizi yeniden yapılandırın''"
                fontWeight={TextFontWeights.regular}
                as={TextAsTypes.p}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Services;
