import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getImageProps } from 'next/image';
import React from 'react';
import styles from "./maskedImage.module.scss";

export type MaskedImageInterface = {
    source: string | StaticImport;
    mobileSource: string | StaticImport;
    altText: string;
    maskColor: string;
    opacity: string;
    imageClassName: string;
}

const MaskedImage = ({ source, mobileSource, altText, maskColor, opacity, imageClassName }: MaskedImageInterface) => {
    
    const { props: { srcSet: OwnerPictureSrcSet } } = getImageProps({
        alt: altText,
        src: source,
    })

    const { props: { srcSet: OwnerPictureMobileSrcSet } } = getImageProps({
        alt: altText,
        src: mobileSource,
    })

    return (
        <div className={styles.wrapper}>
            <picture>
                <source media="(min-width: 1400px)" srcSet={OwnerPictureSrcSet} />
                <source media="(min-width: 300px)" srcSet={OwnerPictureMobileSrcSet} />
                <img className={imageClassName} alt={altText} loading='eager' />
            </picture>
            <div className={styles.mask} style={{ backgroundColor: maskColor, opacity }} />
        </div>
    )
}

export default MaskedImage