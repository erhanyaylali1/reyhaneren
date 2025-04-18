"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../Shared/Button/Button";
import styles from "./header.module.scss";
import Logo from "../../assets/logo/logo.svg";
import HambugerMenuIcon from "../../assets/logo/hamburger_menu.svg";
import CloseIcon from "../../assets/logo/close_icon.svg";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileActionsWrapper = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.headerWrapper} container`}>
      <div className={styles.headerLogoLinkWrapper}>
        <Link
          href="/"
          className={styles.headerLogoLink}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            alt="Reyhan Eren Aile Danışmanlığı Logosu"
            src={Logo}
            height={50}
            aria-description="Reyhan Eren Aile Danışmanlığı Logosu"
          />
        </Link>
        <div className={styles.mobileHambugerMenuWrapper}>
          <Image
            alt="Mobil Menü Simgesi"
            src={isMobileMenuOpen ? CloseIcon : HambugerMenuIcon}
            height={isMobileMenuOpen ? 20 : 25}
            onClick={toggleMobileActionsWrapper}
            aria-description="Mobil menüyü açıp kapatma işine yarar."
          />
        </div>
      </div>
      <div
        className={`d-flex flex-align-center gap-sm desktop-actions-wrapper ${styles.desktopActionsWrappper}`}
      >
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/hizmetler"
          className={styles.headerLinks}
        >
          Hizmetler
        </Link>
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/blog"
          className={styles.headerLinks}
        >
          Blog Yazılarım
        </Link>
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/hakkimda"
          className={styles.headerLinks}
        >
          Hakkımda
        </Link>
        <Link href="/randevu-al">
          <Button
            className="ui-ml-3xl"
            title="Randevu Al"
            ariaLabel="Randevu Al"
            handleClick={() => setIsMobileMenuOpen(false)}
          />
        </Link>
      </div>
      <div
        className={styles.mobileModalWrapper}
        style={{ display: isMobileMenuOpen ? "flex" : "none" }}
      >
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/hizmetler"
          className={styles.headerLinks}
        >
          Hizmetler
        </Link>
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/blog"
          className={styles.headerLinks}
        >
          Blog Yazılarım
        </Link>
        <Link
          onClick={() => setIsMobileMenuOpen(false)}
          href="/hakkimda"
          className={styles.headerLinks}
        >
          Hakkımda
        </Link>
        <Link href="/randevu-al">
          <Button
            className="ui-mt-md"
            title="Randevu Al"
            ariaLabel="Randevu Al"
            handleClick={() => setIsMobileMenuOpen(false)}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
