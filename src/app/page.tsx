import styles from "./page.module.scss";
import LandingPageBanner from "../assets/images/Landing Page Banner Image.webp"
import MaskedImage from "@/components/Shared/MaskedImage";
import Colors from "@/shared/enum/colors";

export default function Home() {
    return (
        <div>
            <div>
                <MaskedImage
                    source={LandingPageBanner}
                    imageClassName={styles.bannerImage}
                    altText="Aile Danışmanlığı Örnek Fotoğrafı"
                    opacity="0.15"
                    maskColor={Colors.pink}
                />
            </div>
        </div>
    );
}
