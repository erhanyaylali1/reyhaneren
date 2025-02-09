import React from "react";
import styles from "./usp.module.scss";
import USPImage1 from "../../../assets/images/Top Left Image.webp";
import USPImage2 from "../../../assets/images/Top Right Image.webp";
import USPImage3 from "../../../assets/images/Bottom Image.webp";
import Image from "next/image";
import Typography, {
  TextAsTypes,
  TextColors,
} from "@/components/Shared/Typography/Typography";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";
import Link from "next/link";

const USP = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.usp1}>
        <Image
          src={USPImage1}
          alt="Aileniz ile mutlu hissedin"
          className={styles.uspImage}
        />
      </div>
      <div className={styles.usp2}>
        <Typography
          as={TextAsTypes.h2}
          textClassName={styles.uspFrontTitle}
          text="Aileniz ile"
          color={TextColors.light}
        />
        <Typography
          as={TextAsTypes.h3}
          textClassName={styles.uspTitle}
          text="Mutlu Hissedin"
          color={TextColors.yellow}
        />
        <Typography
          as={TextAsTypes.p}
          textClassName={styles.uspBody}
          text="Daha sağlıklı ve mutlu bir aile ortamı yaratmak için profesyonel olarak danışmanlık hizmeti alın."
          color={TextColors.light}
        />
        <Link href="randevu-al" aria-label="Randevu al">
          <Button
            title="Randevu al"
            ariaLabel="Randevu al"
            className={styles.uspButton}
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
      <div className={styles.usp3}>
        <Image
          src={USPImage2}
          alt="Partneriniz ile ilişkinizi güçlendirin"
          className={styles.uspImage}
        />
      </div>
      <div className={styles.usp4}>
        <Typography
          as={TextAsTypes.h2}
          textClassName={styles.uspFrontTitle}
          text="Partneriniz ile"
          color={TextColors.light}
        />
        <Typography
          as={TextAsTypes.h3}
          textClassName={styles.uspTitle}
          text="İlişkinizi güçlendirin"
          color={TextColors.yellow}
        />
        <Typography
          as={TextAsTypes.p}
          textClassName={styles.uspBody}
          text="Kaliteli iletişim ile birbirinizin düşüncelerini ve hislerini daha iyi anlayarak aranızdaki sorunları aşın."
          color={TextColors.light}
        />
        <Link href="randevu-al" aria-label="Bilgi al">
          <Button
            title="Bilgi al"
            ariaLabel="Bilgi al"
            className={styles.uspButton}
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
      <div className={styles.usp5}>
        <Image
          src={USPImage3}
          alt="Hayattan Aldığınız Zevki Arttırın"
          className={styles.uspImage}
        />
      </div>
      <div className={styles.usp6}>
        <Typography
          as={TextAsTypes.h2}
          textClassName={styles.uspFrontTitle}
          text="Hayattan aldığınız"
          color={TextColors.light}
        />
        <Typography
          as={TextAsTypes.h3}
          textClassName={styles.uspTitle}
          text="Zevki arttırın"
          color={TextColors.yellow}
        />
        <Typography
          as={TextAsTypes.p}
          textClassName={styles.uspBody}
          text="Mutlu bir aile ortamıyla birlikte hayattan aldığınız zevki arttırın ve daha tatmin edici deneyimler yaşayın."
          color={TextColors.light}
        />
        <Link href="randevu-al" aria-label="Şimdi Başvur">
          <Button
            title="Şimdi Başvur"
            ariaLabel="Şimdi Başvur"
            className={styles.uspButton}
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
    </div>
  );
};

export default USP;
