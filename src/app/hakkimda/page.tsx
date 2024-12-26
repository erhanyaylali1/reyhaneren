import Image from "next/image";
import styles from "./about.module.scss";
import OwnerPicture from "@/assets/images/reyhan eren.webp";
import Typography, { TextAsTypes, TextColors, TextFontSizes, TextFontWeights, TextType } from "@/components/Shared/Typography/Typography";
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
                    text="Merhaba, ben Reyhan 👋🏾"
                    fontSizeDesktop={TextFontSizes["32px"]}
                    fontSizeMobile={TextFontSizes["24px"]}
                    fontWeight={TextFontWeights.semibold}
                />
                <Typography
                    as={TextAsTypes.p}
                    type={TextType.body}
                    color={TextColors.dark}
                    textClassName={styles.aboutMeText}
                    text="Akdeniz Üniversitesi’ndeki sosyoloji lisans eğitimimi tamamladıktan sonra, Marmara Üniversitesi’nde aile   danışmanlığı eğitimi aldım. İzmir’de yüzyüze ve tüm Türkiye’de  çevrimiçi aile danışmanlığı hizmetleri sunmaktayım."
                    fontSizeDesktop={TextFontSizes["24px"]}
                    fontSizeMobile={TextFontSizes["20px"]}
                />

                <Typography
                    as={TextAsTypes.p}
                    type={TextType.body}
                    color={TextColors.dark}
                    textClassName={styles.aboutMeText}
                    text="İnsan ilişkilerine her zaman büyük bir değer verdim; bireylerin ve ailelerin yaşadıkları duygusal ve sosyal zorlukları aşmalarına yardımcı olmanın beni mutlu ettiğini fark ettim. Bu içten gelen istek, beni aile danışmanlığı alanında uzmanlaşmaya yönlendirdi."
                    fontSizeDesktop={TextFontSizes["24px"]}
                    fontSizeMobile={TextFontSizes["20px"]}
                />

                <Typography
                    as={TextAsTypes.p}
                    type={TextType.body}
                    color={TextColors.dark}
                    textClassName={styles.aboutMeText}
                    text="İlişkilerde karşılıklı güven, anlayış ve saygının ne kadar önemli olduğunu gördükçe, bu değerlere dayalı bir danışmanlık süreci sunmak için profesyonel olarak bu kariyerde hizmet etmekteyim."
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
