import React from 'react'
import styles from "./service.module.scss"
import Typography, { TextAsTypes, TextColors, TextFontSizes, TextFontWeights, TextType } from '@/components/Shared/Typography/Typography'
import Button, { ButtonVariants } from '@/components/Shared/Button/Button'
import Link from 'next/link'

type ServicepProps = {
    variant: string,
    title: string,
    body: string,
    index: number,
}

const Service = ({ variant, title, body, index }: ServicepProps) => {
  return (
    <div className={styles.serviceWrapper}>
        <div className={`${styles.serviceIndexWrapper} ${variant === 'left' ? styles.leftAlign : styles.rightAlign}`}>
            <Typography 
                text={index.toString()} 
                as={TextAsTypes.h2} 
                textClassName={styles.serviceIndex}
                fontSizeDesktop={TextFontSizes['24px']} 
                fontSizeMobile={TextFontSizes['20px']} 
                fontWeight={TextFontWeights.bold}    
            />
        </div>
        <Typography 
            text={title} 
            type={TextType.title} 
            as={TextAsTypes.h2} 
            fontSizeDesktop={TextFontSizes['24px']} 
            fontSizeMobile={TextFontSizes['18px']} 
            fontWeight={TextFontWeights.bold}    
            color={TextColors.light}
        />
        <Typography 
            text={body} 
            type={TextType.body} 
            as={TextAsTypes.p} 
            fontSizeDesktop={TextFontSizes['20px']} 
            fontSizeMobile={TextFontSizes['16px']} 
            fontWeight={TextFontWeights.regular}
            textClassName={styles.serviceBody}
            color={TextColors.light}    
        />
        <Link href="randevu-al" className={styles.buttonWrapper}>
            <Button
                title="Randevu Al"
                variant={ButtonVariants.yellow}
                ariaLabel='Randevu Al'
            />  
        </Link>
    </div>
  )
}

export default Service