import React from 'react';
import styles from "./contact.module.scss";
import MailIcon from "../../../assets/logo/mailIcon.svg";
import PhoneIcon from "../../../assets/logo/phoneIcon.svg";
import LocationIcon from "../../../assets/logo/locationIcon.svg";
import FacebookIcon from "../../../assets/logo/facebookIcon.svg";
import InstagramIcon from "../../../assets/logo/instagramIcon.svg";
import LinkedinIcon from "../../../assets/logo/linkedInIcon.svg";
import Image from 'next/image';

const Contact = () => {
    return (
        <div className={styles.contact}>
            <div className={styles.contactListWrapper}>
                <a href='mailto:ailedanismani@reyhaneren.com.tr' className={styles.contactListItemWrapper}>
                    <Image
                        src={MailIcon}
                        height={20}
                        alt='Mail Simgesi'
                        aria-label='Reyhan Eren Mail Adres Bağlantısı'
                    />
                    <p>
                        ailedanismani@reyhaneren.com.tr
                    </p>
                </a>
                <a href='tel:+905411620827' className={styles.contactListItemWrapper}>
                    <Image
                        src={PhoneIcon}
                        height={20}
                        alt='Telefon Simgesi'
                        aria-label='Reyhan Eren Telefon Numarası Bağlantısı'
                    />
                    <p>
                        +90 541 162 0827
                    </p>
                </a>
                <a href='https://maps.app.goo.gl/Xts7HiSaptfNrVx5A' className={styles.contactListItemWrapper}>
                    <Image
                        src={LocationIcon}
                        height={20}
                        alt='Adres Simgesi'
                        aria-label='Reyhan Eren Ofis Adresi Bağlantısı'
                    />
                    <p>
                        Bayraklı, İzmir
                    </p>
                </a>
            </div>
            <div className={styles.contactListWrapper}>
                <a href='https://www.facebook.com/reyhan.eren.7' className={styles.contactListItemWrapper}>
                    <Image
                        src={FacebookIcon}
                        height={20}
                        alt='Facebook Simgesi'
                        aria-label='Reyhan Eren Facebook Hesabının Bağlantısı'
                    />
                    <p>
                        @reyhaneren
                    </p>
                </a>
                <a href='https://www.instagram.com/reyhaaaneren/' className={styles.contactListItemWrapper}>
                    <Image
                        src={InstagramIcon}
                        height={20}
                        alt='Instagram Simgesi'
                        aria-label='Reyhan Eren Instagram Hesabının Bağlantısı'
                    />
                    <p>
                        @reyhanerenailedanışmanı
                    </p>
                </a>
                <a href='https://www.linkedin.com/in/reyhan-eren-aile-danismani/' className={styles.contactListItemWrapper}>
                    <Image
                        src={LinkedinIcon}
                        height={20}
                        alt='Linkedin Simgesi'
                        aria-label='Reyhan Eren Linkedin Hesabının Bağlantısı'
                    />
                    <p>
                        @reyhaneren
                    </p>
                </a>
            </div>
        </div>
    )
}

export default Contact