import React from "react";
import styles from "./service.module.scss";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Button, {
  ButtonSizes,
  ButtonVariants,
} from "@/components/Shared/Button/Button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type ServicepProps = {
  title: string;
  body: string;
  image: StaticImageData;
};

const Service = ({ title, body, image }: ServicepProps) => {
  return (
    <div className={styles.serviceWrapper}>
      <Image className={styles.image} src={image} alt={title} priority />
      <div className={styles.contentWrapper}>
        <Typography
          text={title}
          type={TextType.title}
          as={TextAsTypes.h2}
          fontSizeDesktop={TextFontSizes["24px"]}
          fontSizeMobile={TextFontSizes["22px"]}
          fontWeight={TextFontWeights.bold}
          color={TextColors.dark}
        />
        <Typography
          text={body}
          type={TextType.body}
          as={TextAsTypes.p}
          fontSizeDesktop={TextFontSizes["20px"]}
          fontSizeMobile={TextFontSizes["18px"]}
          fontWeight={TextFontWeights.regular}
          textClassName={styles.serviceBody}
          color={TextColors.dark}
        />
        <Link href="randevu-al" className={styles.buttonWrapper}>
          <Button
            title="Randevu Al"
            variant={ButtonVariants.yellow}
            ariaLabel="Randevu Al"
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
    </div>
  );
};

export default Service;
