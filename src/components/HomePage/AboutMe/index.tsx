import React from 'react';
import styles from "./aboutme.module.scss";
import OwnerPicture from "../../../assets/images/Owner Picture.webp";
import Image from 'next/image';
import Typography, { TextFontSizes, TextFontWeights, TextType } from '@/components/Shared/Typography/Typography';

const AboutMe = () => {
    return (
        <div className={styles.aboutMeWrapper}>
            <div className={styles.aboutMeContent}>
                <Typography
                    text="Merhaba, ben Reyhan."
                    textClassName={styles.title}
                    type={TextType.title}
                    fontSizeDesktop={TextFontSizes['28px']}
                    fontSizeMobile={TextFontSizes['22px']} />
                <Typography
                    text='İnsan ilişkilerine ve aile bağlarına büyük önem veren bir aile danışmanıyım. 
                        Ailelerin ve bireylerin daha sağlıklı ve dengeli ilişkiler kurmalarına yardımcı olmayı amaçlıyorum.'
                    textClassName={styles.firstText}
                    fontSizeDesktop={TextFontSizes['22px']}
                    fontSizeMobile={TextFontSizes['16px']}
                    fontWeight={TextFontWeights.light} />
                <Typography
                    text="Amacım, aile içi iletişimde yaşanan zorlukları birlikte aşarak, daha mutlu ve 
                        huzurlu bir yaşam yolculuğu sunmak. Sorunların çözüme kavuşması için birlikte çalışarak, yeni bir bakış 
                        açısı ve farkındalık yaratmayı hedefliyorum."
                    fontSizeDesktop={TextFontSizes['22px']}
                    fontSizeMobile={TextFontSizes['16px']}
                    fontWeight={TextFontWeights.light} />
            </div>
            <Image
                className={styles.aboutMeImage}
                src={OwnerPicture}
                alt='Reyhan Eren fotoğrafı'
            />
        </div>
    )
}

export default AboutMe