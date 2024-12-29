"use client";

import { useState, useEffect } from "react";
import styles from "./blogs.module.scss";
import Image from "next/image";
import Typography, {
  TextAsTypes,
  TextColors,
  TextFontSizes,
  TextFontWeights,
  TextType,
} from "@/components/Shared/Typography/Typography";
import Link from "next/link";
import { getAllPosts } from "@/shared/helpers/apiCall";

export interface IPost {
  id: string;
  title: string;
  content: string;
  date?: string;
  image: string;
  readingTime?: number;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Format the date in Turkish locale
  const formattedDate = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate.replace(/ (\d{4})$/, ", $1");
};

export default function Blogs() {
  const [blogData, setBlogData] = useState<IPost[]>([]);

  useEffect(() => {
    getAllPosts().then((posts) => setBlogData(posts));
  }, []);

  let posts = blogData;

  if (!posts.length) {
    const placeholderImage =
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

    posts = Array(5)
      .fill(null)
      .map((_, index) => ({
        id: index.toString(),
        title: `${" ".repeat(index)}`,
        content: "Yükleniyor...",
        image: placeholderImage,
      }));
  }

  const firstPost = posts[0];
  const selectedItems = posts.slice(1, 4);
  const remainingPosts = posts.slice(4);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.latestPostsWrapper}>
          <Link
            href={`/blog/${firstPost.title.replaceAll(" ", "-")}?id=${
              firstPost.id
            }`}
            className={styles.latestPostLink}
          >
            <div className={styles.latestPost}>
              <Image
                src={firstPost?.image}
                alt={firstPost?.title || "Post image"}
                className={styles.latestPostImage}
                width={500}
                height={300}
                priority
              />
              <div className={styles.latestPostContentWrapper}>
                <Typography
                  as={TextAsTypes.h2}
                  type={TextType.title}
                  fontWeight={TextFontWeights.semibold}
                  text={firstPost?.title}
                  color={TextColors.dark}
                  fontSizeDesktop={TextFontSizes["28px"]}
                  fontSizeMobile={TextFontSizes["16px"]}
                  textClassName={styles.latestPostTitle}
                />
                <Typography
                  as={TextAsTypes.p}
                  type={TextType.body}
                  fontWeight={TextFontWeights.light}
                  text={firstPost?.content}
                  color={TextColors.lightGray}
                  fontSizeDesktop={TextFontSizes["20px"]}
                  fontSizeMobile={TextFontSizes["16px"]}
                  textClassName={styles.latestPostContent}
                />

                <div className={styles.latestPostFooter}>
                  <Typography
                    as={TextAsTypes.p}
                    type={TextType.body}
                    fontWeight={TextFontWeights.semibold}
                    text={
                      firstPost?.readingTime
                        ? firstPost?.readingTime + " dakika okuma"
                        : ""
                    }
                    color={TextColors.gray}
                    fontSizeDesktop={TextFontSizes["16px"]}
                    fontSizeMobile={TextFontSizes["14px"]}
                  />
                  <Typography
                    as={TextAsTypes.p}
                    type={TextType.body}
                    fontWeight={TextFontWeights.semibold}
                    text={firstPost?.date ? formatDate(firstPost?.date) : ""}
                    color={TextColors.gray}
                    fontSizeDesktop={TextFontSizes["16px"]}
                    fontSizeMobile={TextFontSizes["14px"]}
                  />
                </div>
              </div>
            </div>
          </Link>
          {selectedItems.length && (
            <div className={styles.latestPosts}>
              {selectedItems.map((post) => (
                <Link
                  href={`/blog/${post.title.replaceAll(" ", "-")}?id=${
                    post.id
                  }`}
                  className={styles.selectedItems}
                  key={post?.id}
                >
                  <div className={styles.latestPostItem}>
                    <div className={styles.latestPostItemImage}>
                      <Image
                        src={post?.image}
                        alt={post?.title}
                        className={styles.latestPostItemImage}
                        width={500}
                        height={300}
                        priority
                      />
                    </div>
                    <div className={styles.latestPostItemContentWrapper}>
                      <Typography
                        as={TextAsTypes.h3}
                        type={TextType.title}
                        fontWeight={TextFontWeights.semibold}
                        text={post?.title}
                        color={TextColors.dark}
                        fontSizeDesktop={TextFontSizes["24px"]}
                        fontSizeMobile={TextFontSizes["16px"]}
                        textClassName={styles.latestPostItemTitle}
                      />
                      <Typography
                        as={TextAsTypes.p}
                        type={TextType.body}
                        fontWeight={TextFontWeights.light}
                        text={post?.content}
                        color={TextColors.lightGray}
                        fontSizeDesktop={TextFontSizes["18px"]}
                        fontSizeMobile={TextFontSizes["16px"]}
                        textClassName={styles.latestPostItemContent}
                      />
                      <div className={styles.latestPostItemFooter}>
                        <Typography
                          as={TextAsTypes.p}
                          type={TextType.body}
                          fontWeight={TextFontWeights.semibold}
                          text={
                            post?.readingTime
                              ? post?.readingTime + " dakika okuma"
                              : ""
                          }
                          color={TextColors.gray}
                          fontSizeDesktop={TextFontSizes["16px"]}
                          fontSizeMobile={TextFontSizes["14px"]}
                        />
                        <Typography
                          as={TextAsTypes.p}
                          type={TextType.body}
                          fontWeight={TextFontWeights.semibold}
                          text={post?.date ? formatDate(post?.date) : ""}
                          color={TextColors.gray}
                          fontSizeDesktop={TextFontSizes["16px"]}
                          fontSizeMobile={TextFontSizes["14px"]}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {remainingPosts.length && (
          <div className={styles.postsWrapper}>
            <Typography
              as={TextAsTypes.h1}
              type={TextType.title}
              fontWeight={TextFontWeights.semibold}
              text={"Diğer Yazılarım"}
              color={TextColors.dark}
              fontSizeDesktop={TextFontSizes["28px"]}
              textClassName={styles.latestPostTitle}
            />

            {remainingPosts.map((post) => (
              <Link
                key={post?.id}
                href={`/blog/${post.title.replaceAll(" ", "-")}?id=${post.id}`}
              >
                <div className={styles.postItem}>
                  <div className={styles.postItemImage}>
                    <Image
                      src={post?.image}
                      alt={post?.title}
                      className={styles.postItemImage}
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className={styles.postItemContentWrapper}>
                    <Typography
                      as={TextAsTypes.h3}
                      type={TextType.title}
                      fontWeight={TextFontWeights.semibold}
                      text={post?.title}
                      color={TextColors.dark}
                      fontSizeDesktop={TextFontSizes["24px"]}
                      fontSizeMobile={TextFontSizes["16px"]}
                      textClassName={styles.latestPostItemTitle}
                    />
                    <Typography
                      as={TextAsTypes.p}
                      type={TextType.body}
                      fontWeight={TextFontWeights.light}
                      text={post?.content}
                      color={TextColors.lightGray}
                      fontSizeDesktop={TextFontSizes["18px"]}
                      fontSizeMobile={TextFontSizes["16px"]}
                      textClassName={styles.postItemContent}
                    />
                    <div className={styles.postItemFooter}>
                      <Typography
                        as={TextAsTypes.p}
                        type={TextType.body}
                        fontWeight={TextFontWeights.semibold}
                        text={
                          post?.readingTime
                            ? post?.readingTime + " dakika okuma"
                            : ""
                        }
                        color={TextColors.gray}
                        fontSizeDesktop={TextFontSizes["16px"]}
                        fontSizeMobile={TextFontSizes["14px"]}
                      />
                      <Typography
                        as={TextAsTypes.p}
                        type={TextType.body}
                        fontWeight={TextFontWeights.semibold}
                        text={post?.date ? formatDate(post?.date) : ""}
                        color={TextColors.gray}
                        fontSizeDesktop={TextFontSizes["16px"]}
                        fontSizeMobile={TextFontSizes["14px"]}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
