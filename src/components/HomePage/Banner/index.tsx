import styles from "./banner.module.scss";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";
import LandingPageBanner from "../../../assets/images/Landing Page Banner Image.webp";
import MaskedImage from "@/components/Shared/MaskedImage";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
} from "@/components/Shared/Typography/Typography";
import Colors from "@/shared/enum/colors";
import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <React.Fragment>
      <MaskedImage
        source={LandingPageBanner}
        mobileSource={LandingPageBanner}
        imageClassName={styles.bannerImage}
        altText="Aile Danışmanlığı Örnek Fotoğrafı"
        opacity="0.3"
        maskColor={Colors["light-blue"]}
      />
      <div className={styles.bannerTextWrapper}>
        <Typography
          text="Huzurlu ve sağlıklı bir aile hayatına sahip olun."
          as={TextAsTypes.h1}
          fontSizeDesktop={TextFontSizes["48px"]}
          fontSizeMobile={TextFontSizes["28px"]}
          color={TextColors.light}
          textClassName={styles.bannerText}
        />
        <Link href="randevu-al">
          <Button
            title="Randevu Al"
            ariaLabel="Randevu Al"
            handleClick={() => null}
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Banner;
