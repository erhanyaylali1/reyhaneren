import React from "react";
import styles from "./typography.module.scss";
import { Noto_Sans, Saira } from 'next/font/google'

type ITypography = {
    text: string;
    type?: TextType;
    as?: TextAsTypes;
    color?: TextColors;
    fontWeight?: TextFontWeights;
    fontSizeDesktop?: TextFontSizes;
    fontSizeMobile?: TextFontSizes;
}

export enum TextColors {
    "light" = "light",
    "black" = "black",
    "dark" = "dark",
    "yellow" = "yellow",
    "secondary" = "secondary"
}

export enum TextFontWeights {
    "light" = "light",
    "regular" = "regular",
    "medium" = "medium",
    "semibold" = "semibold",
    "bold" = "bold",
}

export enum TextFontSizes {
    "12px" = "12px",
    "14px" = "14px",
    "16px" = "16px",
    "18px" = "18px",
    "20px" = "20px",
    "22px" = "22px",
    "24px" = "24px",
    "28px" = "28px",
    "30px" = "30px",
    "32px" = "32px",
    "48px" = "48px",
    "64px" = "64px"
}

export enum TextType {
    "body" = "body",
    "title" = "title"
}

export enum TextAsTypes {
    "h1" = "h1",
    "h2" = "h2",
    "h3" = "h3",
    "h4" = "h4",
    "h5" = "h5",
    "h6" = "h6",
    "p" = "p",
    "span" = "span",
}

const noto_sans = Noto_Sans({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

const saira = Saira({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

const Typography = ({ text, type = TextType.body, as = TextAsTypes.p, color = TextColors.dark, fontWeight = TextFontWeights.regular, fontSizeDesktop = TextFontSizes["18px"], fontSizeMobile = TextFontSizes["16px"] }: ITypography): React.ReactNode => {

    const TextComponent = as;

    return (
        <TextComponent className={`${styles["text-" + color]} ${styles["text-" + fontWeight]} ${type === TextType.body ? noto_sans.className : saira.className}`}>
            {text}
        </TextComponent>
    )
}

export default Typography;