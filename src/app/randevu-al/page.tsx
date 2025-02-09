"use client";

import Image from "next/image";
import styles from "./booking.module.scss";
import CalendarIcon from "@/assets/logo/Calendar Icon.svg";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Notification from "@/components/Shared/Notification";

export default function BookAppointment() {
  const form = useRef<HTMLFormElement | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<string>(
    "Çift Odaklı Danışma"
  );
  const [radioButtonValue, setRadioButtonValue] =
    useState<string>("Online Danışma");

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setNotification(null);
    }, 3000);

    if (form.current && serviceId && templateId) {
      setLoading(true);
      emailjs
        .sendForm(serviceId, templateId, form.current, {
          publicKey,
        })
        .then(
          () => {
            setNotification({
              message:
                "Talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğim!",
              type: "success",
            });
            form.current?.reset();
          },
          (error) => {
            console.error(error);
            setNotification({
              message:
                "Bir hata meydana geldi, lütfen daha sonra tekrar deneyin!",
              type: "error",
            });
          }
        )
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        });
    }
  };

  return (
    <div className="container">
      <div className={`${styles.container} ${loading ? styles.loading : ""}`}>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <Image
              src={CalendarIcon}
              width={30}
              height={30}
              alt="Randevu Al İkonu"
            />
            <Typography
              text="Randevu Al"
              as={TextAsTypes.h1}
              color={TextColors.dark}
              fontSizeDesktop={TextFontSizes["30px"]}
              fontSizeMobile={TextFontSizes["24px"]}
              fontWeight={TextFontWeights.regular}
              type={TextType.title}
            />
          </div>
          <Typography
            text="Lütfen randevu almak için aşağıdaki formu doldurun. En kısa sürede size ulaşacağız."
            as={TextAsTypes.p}
            color={TextColors.dark}
            fontSizeDesktop={TextFontSizes["20px"]}
            fontWeight={TextFontWeights.regular}
            type={TextType.body}
          />
          <form onSubmit={onSubmit} ref={form}>
            <div className={styles.formInputContainer}>
              <label htmlFor="name">
                <Typography
                  text="* Adınız Soyadınız"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <input
                type="text"
                className={styles.formInput}
                name="name"
                required
                placeholder="Adınızı ve soyadınızı giriniz."
              />
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="age">
                <Typography
                  text="* Yaşınız"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <input
                type="number"
                className={styles.formInput}
                name="age"
                required
                placeholder="Yaşınızı giriniz."
              />
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="occupancy">
                <Typography
                  text="* Mesleğiniz"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <input
                type="text"
                className={styles.formInput}
                name="occupancy"
                required
                placeholder="Mesleğinizi giriniz."
              />
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="type">
                <Typography
                  text="* Danışmanlık Tipi"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <div className={styles.formSelectContainer}>
                <select
                  className={styles.formSelect}
                  name="type"
                  required
                  value={dropdownValue}
                  onChange={(e) => setDropdownValue(e.target.value)}
                >
                  <option value="Çift Odaklı Danışma">
                    Çift Odaklı Danışmanlık
                  </option>
                  <option value="Birey Odaklı Danışma">
                    Birey Odaklı Danışmanlık
                  </option>
                  <option value="Aile Odaklı Danışma">
                    Aile Odaklı Danışmanlık
                  </option>
                </select>
              </div>
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="style">
                <Typography
                  text="* Danışmanlık Şekli"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <div className={styles.radioGroup}>
                <label
                  className={`${styles.radioOption} ${
                    radioButtonValue === "Online Danışma" ? styles.checked : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="style"
                    value="Online Danışma"
                    checked={radioButtonValue === "Online Danışma"}
                    onChange={() => setRadioButtonValue("Online Danışma")}
                  />
                  Online Danışma
                </label>
                <label
                  className={`${styles.radioOption} ${
                    radioButtonValue === "Yüzyüze Danışma" ? styles.checked : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="style"
                    value="Yüzyüze Danışma"
                    checked={radioButtonValue === "Yüzyüze Danışma"}
                    onChange={() => setRadioButtonValue("Yüzyüze Danışma")}
                  />
                  Yüzyüze Danışma
                </label>
              </div>
            </div>
            {(dropdownValue === "Çift Odaklı Danışma" ||
              dropdownValue === "Aile Odaklı Danışma") && (
              <React.Fragment>
                <div className={styles.formInputContainer}>
                  <label htmlFor="partner_name">
                    <Typography
                      text="* Partnerinizin Adı Soyadı"
                      as={TextAsTypes.span}
                      color={TextColors.dark}
                      fontSizeDesktop={TextFontSizes["20px"]}
                      fontWeight={TextFontWeights.regular}
                      type={TextType.body}
                    />
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    name="partner_name"
                    required
                    placeholder="Partnerinizin adını ve soyadını giriniz."
                  />
                </div>
                <div className={styles.formInputContainer}>
                  <label htmlFor="partner_age">
                    <Typography
                      text="* Partnerinizin Yaşı"
                      as={TextAsTypes.span}
                      color={TextColors.dark}
                      fontSizeDesktop={TextFontSizes["20px"]}
                      fontWeight={TextFontWeights.regular}
                      type={TextType.body}
                    />
                  </label>
                  <input
                    type="number"
                    className={styles.formInput}
                    name="partner_age"
                    required
                    placeholder="Partnerinizin yaşını giriniz."
                  />
                </div>
                <div className={styles.formInputContainer}>
                  <label htmlFor="partner_occupancy">
                    <Typography
                      text="* Partnerinizin Mesleği"
                      as={TextAsTypes.span}
                      color={TextColors.dark}
                      fontSizeDesktop={TextFontSizes["20px"]}
                      fontWeight={TextFontWeights.regular}
                      type={TextType.body}
                    />
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    name="partner_occupancy"
                    required
                    placeholder="Partnerinizin mesleğini giriniz."
                  />
                </div>
              </React.Fragment>
            )}
            <div className={styles.formInputContainer}>
              <label htmlFor="phone">
                <Typography
                  text="* Telefon Numaranız"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <input
                type="text"
                className={styles.formInput}
                name="phone"
                required
                placeholder="Telefon numaranızı giriniz."
              />
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="email">
                <Typography
                  text="E-posta Adresiniz"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <input
                type="text"
                className={styles.formInput}
                name="email"
                required
                placeholder="Eğer varsa e-posta adresinizi giriniz."
              />
            </div>
            <div
              className={`${styles.formInputContainer} ${styles.gridSpanRow}`}
            >
              <label htmlFor="message">
                <Typography
                  text="Neden Danışmanlık Almak İstiyorsunuz?"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <textarea
                className={styles.formInputTextArea}
                name="message"
                placeholder="Neden danışmanlık almak istediğinizi buraya yazabilirsiniz."
              />
            </div>
            <Button
              title="Randevu İçin Başvur"
              ariaLabel="Randevu İçin Başvur"
              className={styles.submitButton}
              size={ButtonSizes.lg}
              type="submit"
            />
          </form>
        </div>

        {loading && (
          <div className={styles.spinnerOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
}
