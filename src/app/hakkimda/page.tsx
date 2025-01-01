import Image from "next/image";
import styles from "./about.module.scss";
import OwnerPicture from "@/assets/images/reyhan eren.webp";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Link from "next/link";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";

export default function AboutMe() {
  return (
    <div className={styles.aboutMeWrapper}>
      <Image
        className={styles.ownerPicture}
        src={OwnerPicture}
        alt="Reyhan Eren"
        width={1200}
        height={800}
        priority
      />
      <div className={styles.aboutMeTextWrapper}>
        <Typography
          as={TextAsTypes.h2}
          type={TextType.title}
          color={TextColors.dark}
          text="Merhaba,"
          fontSizeDesktop={TextFontSizes["32px"]}
          fontSizeMobile={TextFontSizes["24px"]}
          fontWeight={TextFontWeights.semibold}
        />
        <Typography
          as={TextAsTypes.h2}
          type={TextType.title}
          color={TextColors.dark}
          text="Ben Reyhan Eren"
          fontSizeDesktop={TextFontSizes["32px"]}
          fontSizeMobile={TextFontSizes["24px"]}
          fontWeight={TextFontWeights.semibold}
        />
        <hr className={styles.line} />
        <Typography
          as={TextAsTypes.p}
          type={TextType.body}
          color={TextColors.dark}
          textClassName={styles.aboutMeText}
          text="Akdeniz Üniversitesi Sosyoloji bölümünden 2022 yılında yüksek onur derecesiyle mezun olmuştur. Lisans döneminde aileye ve ilişkilere duyduğu merak neticesinde tez çalışmasını Flört Kültürü üzerine yaparak Aile Sosyolojisi'nin alt başlıklarına dair çalışmıştır."
          fontSizeDesktop={TextFontSizes["24px"]}
          fontSizeMobile={TextFontSizes["20px"]}
        />

        <Typography
          as={TextAsTypes.p}
          type={TextType.body}
          color={TextColors.dark}
          textClassName={styles.aboutMeText}
          text="2025 itibariyle Marmara Üniversitesi Aile Danışmanlığı eğitimini başarıyla tamamlayarak, Aile Danışmanı ünvanıyla ailelerde istikrarın ve dengenin sağlanmasına eşlik etmeyi amaçlamaktadır. İzmir’de yüzyüze ve tüm Türkiye’de çevrimiçi aile danışmanlığı hizmetleri sunmaktadır."
          fontSizeDesktop={TextFontSizes["24px"]}
          fontSizeMobile={TextFontSizes["20px"]}
        />

        <Link href="randevu-al">
          <Button
            title="Randevu Al"
            ariaLabel="Randevu Al"
            className={styles.aboutMeButton}
            size={ButtonSizes.lg}
          />
        </Link>
      </div>
    </div>
  );
}
