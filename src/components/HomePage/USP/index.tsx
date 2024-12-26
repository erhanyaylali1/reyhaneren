import React from 'react'
import styles from './usp.module.scss'
import USPImage1 from '../../../assets/images/Top Left Image.png'
import USPImage2 from '../../../assets/images/Top Right Image.png'
import USPImage3 from '../../../assets/images/Bottom Image.png'
import Image from 'next/image'
import Typography, { TextAsTypes, TextColors } from '@/components/Shared/Typography/Typography'
import Button from '@/components/Shared/Button/Button'

const USP = () => {

  return (
    <div className={`${styles.container}`}>
        <div className={styles.usp1}>
            <Image 
                src={USPImage1} 
                alt="" 
                className={styles.uspImage}    
            />
        </div>
        <div className={styles.usp2}>
            <Typography 
                as={TextAsTypes.h2} 
                textClassName={styles.uspFrontTitle} 
                text="Aileniz ile" 
                color={TextColors.light}
            />
            <Typography 
                as={TextAsTypes.h3} 
                textClassName={styles.uspTitle} 
                text="Mutlu Hissedin" 
                color={TextColors.yellow}
            />
            <Typography 
                as={TextAsTypes.p} 
                textClassName={styles.uspBody} 
                text="Daha sağlıklı ve mutlu bir aile ortam yaratmak için profesyonel olarak danışmanlık hizmeti alın." 
                color={TextColors.light}
            />
            <Button
                title="Randevu al"
                ariaLabel='Randevu al'
                className={styles.uspButton}
                handleClick={() => console.log('button clicked')}
            />
        </div>
        <div className={styles.usp3}>
            <Image 
                src={USPImage2} 
                alt="" 
                className={styles.uspImage}    
            />
        </div>
        <div className={styles.usp4}>
            <Typography 
                as={TextAsTypes.h2} 
                textClassName={styles.uspFrontTitle} 
                text="Partneriniz ile" 
                color={TextColors.light}
            />
            <Typography 
                as={TextAsTypes.h3} 
                textClassName={styles.uspTitle} 
                text="İlişkinizi güçlendirin" 
                color={TextColors.yellow}
            />
            <Typography 
                as={TextAsTypes.p} 
                textClassName={styles.uspBody} 
                text="Düzgün iletişim ile birbirinizin düşünce-lerini ve hislerini daha iyi anlayıp aranızdaki sorunların aşın." 
                color={TextColors.light}
            />
            <Button
                title="Bilgi al"
                ariaLabel='Bilgi al'
                className={styles.uspButton}
                handleClick={() => console.log('button clicked')}
            />
        </div>
        <div className={styles.usp5}>
            <Image 
                src={USPImage3} 
                alt="" 
                className={styles.uspImage}    
            />
        </div>
        <div className={styles.usp6}>
            <Typography 
                as={TextAsTypes.h2} 
                textClassName={styles.uspFrontTitle} 
                text="Hayattan aldığınız" 
                color={TextColors.light}
            />
            <Typography 
                as={TextAsTypes.h3} 
                textClassName={styles.uspTitle} 
                text="Zevki arttırın" 
                color={TextColors.yellow}
            />
            <Typography 
                as={TextAsTypes.p} 
                textClassName={styles.uspBody} 
                text="Mutlu bir aile ortamıyle birlikte hayattan aldığınız zevki arttırın ve daha tatmin edici deneyimler yaşayın." 
                color={TextColors.light}
            />
            <Button
                title="Şimdi Başvur"
                ariaLabel='Şimdi Başvur'
                className={styles.uspButton}
                handleClick={() => console.log('button clicked')}
            />
        </div>
    </div>
  )
}

export default USP