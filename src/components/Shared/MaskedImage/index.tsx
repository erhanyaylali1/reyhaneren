import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import styles from "./maskedImage.module.scss";

export type MaskedImageInterface = {
    source: string | StaticImport;
    altText: string;
    maskColor: string;
    opacity: string;
    imageClassName: string;
    priority?: boolean;
}

const MaskedImage = ({ source, altText, maskColor, opacity, imageClassName, priority = false }: MaskedImageInterface) => {
    return (
        <div className={styles.wrapper}>
            <Image
                src={source}
                alt={altText}
                priority={priority}
                className={imageClassName}
            />
            <div className={styles.mask} style={{ backgroundColor: maskColor, opacity }} />
        </div>
    )
}

export default MaskedImage