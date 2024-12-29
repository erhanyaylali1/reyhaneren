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
            title="Aile Danışmanlığı"
            body="Aile üyelerinin iletişim becerilerini ge-liştirmelerine, çatışmaları çözmelerine ve ilişkilerini güçlendirmelerine yardımcı olan bir terapi sürecidir. Bu süreçte, aile içindeki dinamikler analiz edilerek bireylerin sorunlarına yönelik çözüm odaklı yaklaşımlar sunulur. Amaç, aile üyelerinin sağlıklı ve mutlu bir şekilde bir arada yaşamalarını sağlamak için gerekli beceri ve farkındalığı kazandırmaktır."
          />
          <Service
            title="Evlilik Öncesi Danışmanlığı"
            body="Çiftlerin evlilik öncesinde ilişkilerindeki güçlü ve zayıf yönleri keşfetmelerine ve sağlıklı bir evlilik için gerekli becerileri kazanmalarına yardımcı olan bir süreçtir. Bu danışmanlıkta, iletişim, çatışma çözümü, değerler ve gelecek planları gibi konular ele alınarak çiftlerin birbirlerini daha iyi anlamaları sağlanır. Amacı, çiftlerin evliliğe sağlam bir temel atarak başlamalarına destek olmaktır."
          />
        </div>
      </div>
    </div>
  );
}
