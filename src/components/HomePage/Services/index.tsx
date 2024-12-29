import Typography, {
  TextAsTypes,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import React from "react";
import styles from "./services.module.scss";
import Image from "next/image";
import Service1Image from "../../../assets/images/services-1.webp";
import Service2Image from "../../../assets/images/services-2.webp";
import Link from "next/link";
import Button, { ButtonVariants } from "@/components/Shared/Button/Button";

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
        <Link href="hizmetler">
          <div className={styles.serviceWrapper}>
            <Image
              src={Service1Image}
              alt="Aile Danışmanlığı Servisi Fotoğrafı"
              className={styles.serviceImage}
              loading="eager"
            />
            <div className={styles.serviceBody}>
              <Typography
                text="Aile Danışmanlığı"
                as={TextAsTypes.h3}
                fontWeight={TextFontWeights.semibold}
              />
              <Typography
                text="Aile ilişkilerinizi güçlendirin"
                fontWeight={TextFontWeights.regular}
                as={TextAsTypes.p}
              />
              <Button
                title="Bilgi Al"
                className={styles.serviceBodyAction}
                variant={ButtonVariants.yellow}
                ariaLabel="Aile Danışmanlığı hakkında bilgi al."
              />
            </div>
          </div>
        </Link>
        <div className={styles.divider} />
        <Link href="hizmetler">
          <div className={styles.serviceWrapper}>
            <Image
              src={Service2Image}
              alt="Aile Danışmanlığı Servisi Fotoğrafı"
              className={styles.serviceImage}
              loading="eager"
            />
            <div className={styles.serviceBody}>
              <Typography
                text="Evlilik Öncesi Danışmanlık"
                as={TextAsTypes.h3}
                fontWeight={TextFontWeights.semibold}
              />
              <Typography
                text="Huzurlu bir evliliğe doğru sağlıklı adımlar atın"
                fontWeight={TextFontWeights.regular}
                as={TextAsTypes.p}
              />
              <Button
                title="Bilgi Al"
                className={styles.serviceBodyAction}
                variant={ButtonVariants.yellow}
                ariaLabel="Evlilik Öncesi Danışmanlık hakkında bilgi al."
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Services;
