"use client";

import Image from "next/image";
import styles from "./booking.module.scss";
import Banner from "@/assets/images/randevu-al.webp";
import CalendarIcon from "@/assets/logo/Calendar Icon.svg";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Button, { ButtonSizes } from "@/components/Shared/Button/Button";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Notification from "@/components/Shared/Notification";

export default function BookAppointment() {
  const form = useRef<HTMLFormElement | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
            console.error(error.text);
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
        <Image
          src={Banner}
          width={300}
          height={500}
          className={styles.image}
          alt="Randevu Al Fotoğrafı"
        />
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
            text="* Lütfen randevu almak için aşağıdaki formu doldurun. En kısa sürede size ulaşacağız."
            as={TextAsTypes.p}
            color={TextColors.dark}
            fontSizeDesktop={TextFontSizes["18px"]}
            fontWeight={TextFontWeights.light}
            type={TextType.body}
          />
          <form onSubmit={onSubmit} ref={form}>
            <div className={styles.formInputContainer}>
              <label htmlFor="name">
                <Typography
                  text="* Ad Soyad"
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
              <label htmlFor="phone">
                <Typography
                  text="* Telefon Numarası"
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
                  text="E-posta Adresi"
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
            <div className={styles.formInputContainer}>
              <label htmlFor="type">
                <Typography
                  text="Danışmanlık Tipi"
                  as={TextAsTypes.span}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontWeight={TextFontWeights.regular}
                  type={TextType.body}
                />
              </label>
              <div className={styles.formSelectContainer}>
                <select className={styles.formSelect} name="type" required>
                  <option value="çift" selected>
                    Çift Odaklı Danışmanlık
                  </option>
                  <option value="tek">Bireysel Odaklı Danışmanlık</option>
                </select>
              </div>
            </div>
            <div className={styles.formInputContainer}>
              <label htmlFor="message">
                <Typography
                  text="Ekstra Not"
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
                placeholder="Eğer bana iletmek istediğiniz ekstra bir not varsa, buraya yazabilirsiniz."
              />
            </div>
            <Button
              title="Randevu İçin Başvur"
              ariaLabel="Randevu İçin Başvur"
              className={styles.submitButton}
              size={ButtonSizes.lg}
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
