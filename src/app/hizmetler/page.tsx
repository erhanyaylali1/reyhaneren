import MaskedImage from "@/components/Shared/MaskedImage";
import Colors from "@/shared/enum/colors";
import ServicesBanner from "@/assets/images/Services Banner.webp";
import styles from "./services.module.scss";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
} from "@/components/Shared/Typography/Typography";
import Service from "@/components/Services/Service";
import ServiceImage1 from "@/assets/images/service1.webp";
import ServiceImage2 from "@/assets/images/service2.webp";

export default function Services() {
  return (
    <div>
      <div className={styles.bannerWrapper}>
        <MaskedImage
          source={ServicesBanner}
          mobileSource={ServicesBanner}
          imageClassName={styles.bannerImage}
          altText="Sunduğumuz Hizmetler"
          opacity="0.3"
          maskColor={Colors["light-blue"]}
        />
        <Typography
          as={TextAsTypes.h1}
          textClassName={styles.bannerText}
          text="Sunduğumuz Hizmetler"
          fontWeight={TextFontWeights.bold}
          fontSizeDesktop={TextFontSizes["32px"]}
          fontSizeMobile={TextFontSizes["24px"]}
          color={TextColors.light}
        />
      </div>
      <div className="container">
        <div className={styles.servicesWrapper}>
          <Service
            title="Birey Odaklı Aile Danışmanlığı"
            body="Birey Odaklı Aile Danışmanlığı, aile sistemindeki bireyin duygu, düşünce ve davranışlarına odaklanarak, aile içindeki dinamikleri anlamayı ve bu dinamikleri daha sağlıklı hale getirmeyi amaçlayan bir danışmanlık yaklaşımıdır. Bu yaklaşım, bireylerin kendi duygusal ihtiyaçlarını anlamalarını, sorun çözme becerilerini geliştirmelerini ve aile içindeki ilişkilerinde daha etkili bir şekilde iletişim kurmalarını sağlamayı hedefler."
            image={ServiceImage1}
          />
          <Service
            title="Çift Odaklı Aile Danışmanlığı"
            body="Çift Odaklı Aile Danışmanlığı, çiftlerin arasındaki ilişkisel dinamiklere odaklanan, çiftler arasındaki iletişimi, duygusal bağları ve sorun çözme becerilerini güçlendirmeyi hedefleyen bir aile danışmanlığı yaklaşımıdır. Bu yaklaşım, çiftlerin birbirlerini daha iyi anlamalarına, ilişkilerinde daha sağlıklı sınırlar oluşturmalarına ve ortak hedeflere ulaşmalarına yardımcı olur."
            image={ServiceImage2}
          />
        </div>
      </div>
    </div>
  );
}
