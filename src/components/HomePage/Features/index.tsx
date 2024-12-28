import React from 'react'
import styles from './features.module.scss'
import Typography, { TextAsTypes, TextFontSizes, TextFontWeights, TextType } from '@/components/Shared/Typography/Typography'
import Image from 'next/image';
import FeatureListIcon from '@/assets/logo/Users.svg';
import Button, { ButtonSizes } from '@/components/Shared/Button/Button';
import Link from 'next/link';

const Features = () => {

  const features = [
    "Aile içinde iletişim kopuklukları yaşıyorsanız",
    "Aile üyeleri arasında güven sorunları varsa",
    "Aile içinde duygusal bağlar zayıflamışsa",
    "Ayrılık, boşanma veya yeniden evlenme sürecinde sorunlar yaşıyorsanız",
    "Eşinizle veya partnerinizle sık sık tartışıyorsanız",
    "Çocuklarınızla aranızda çatışmalar artıyorsa",
    "Ebeveynlik sorumluluklarını paylaşmakta zorluk çekiyorsanız",
    "Stres, kaygı veya duygusal sorunlar aile içindeki ilişkileri etkiliyorsa"
  ];

  return (
    <div className={`container ${styles.container}`}>
        <Typography 
            as={TextAsTypes.h2} 
            type={TextType.title} 
            fontSizeDesktop={TextFontSizes['40px']}     
            fontSizeMobile={TextFontSizes['30px']}
            fontWeight={TextFontWeights.semibold}
            text='Aile terapisi sizin için uygun mu?' 
        />
        <Typography 
            as={TextAsTypes.p} 
            type={TextType.body} 
            textClassName={styles.description}
            fontWeight={TextFontWeights.light}
            fontSizeDesktop={TextFontSizes['24px']} 
            fontSizeMobile={TextFontSizes['18px']}
            text='Eğer aşağıdaki durumları yaşıyorsanız, aile terapisi size ve ailenize yardımcı olabilir.' 
        />
        <div className={styles.featuresContainer}>
            {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.iconContainer}>
                    <Image
                      src={FeatureListIcon}
                      width={20}
                      height={20}
                      alt='Özellik İkonu'
                      objectFit='contain'
                      />    
                  </div>
                  <Typography 
                      as={TextAsTypes.p} 
                      type={TextType.body} 
                      fontWeight={TextFontWeights.light}
                      fontSizeDesktop={TextFontSizes['18px']} 
                      text={feature} 
                  />
                </div>
            ))}

        </div>
        <Link href="/randevu-al">
          <Button 
            title='Randevu Al'
            ariaLabel='Randevu Al'
            className={styles.button}
            size={ButtonSizes.lg}
          />
        </Link>
    </div>
  )
}

export default Features