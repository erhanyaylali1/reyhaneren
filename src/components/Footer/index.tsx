import styles from "./footer.module.scss";
import Logo from "../../assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Contact from "./Contact";
import Typography, {
  TextColors,
  TextFontWeights,
} from "../Shared/Typography/Typography";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        <Link href="/" className={styles.footerLogoWrapper}>
          <Image
            priority
            src={Logo}
            className={styles.logo}
            alt="Reyhan Eren Aile Danışmanlığı Logosu"
            height={50}
            aria-description="Reyhan Eren Aile Danışmanlığı Logosu"
          />
        </Link>
        <div className={styles.linkContainer}>
          <Contact />
          <div className={styles.linksWrapper}>
            <Link
              href="/"
              className={styles.linkWrapper}
              aria-label="Gizlilik Politikası Linki"
            >
              <Typography
                text="Gizlilik Politikası"
                fontWeight={TextFontWeights.semibold}
              />
            </Link>
            <Link
              href="/"
              className={styles.linkWrapper}
              aria-label="Şartlar ve Koşullar Linki"
            >
              <Typography
                text="Şartlar ve Koşullar"
                fontWeight={TextFontWeights.semibold}
              />
            </Link>
            <Link
              href="/randevu-al"
              className={styles.linkWrapper}
              aria-label="Randevu Al"
            >
              <Typography
                text="Randevu Al"
                fontWeight={TextFontWeights.semibold}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.copyRightText}>
        <Typography
          text="© 2024 Reyhan Eren. Tüm hakları saklıdır."
          color={TextColors.light}
        />
      </div>
    </footer>
  );
};

export default Footer;
