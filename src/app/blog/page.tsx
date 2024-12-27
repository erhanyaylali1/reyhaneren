"use client";

import { useState, useEffect } from "react";
import styles from "./blog.module.scss";
import Image from "next/image";
import Typography, { TextAsTypes, TextColors, TextFontSizes, TextFontWeights, TextType } from "@/components/Shared/Typography/Typography";

interface IPost {
  title: string;
  content: string;
  date?: string;
  image: string;
  readingTime?: number;
};


export default function Blog() {

  const [blogData, setBlogData] = useState<IPost[]>([]);

  useEffect(() => {
    const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;
    fetch(url).then((res) => res.json()).then((data) => {
      const posts = data.items.map((item: any) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(item.content, "text/html");
        const image = document.querySelector("img")?.src;
        const readingTime = Math.ceil(document.body.textContent?.split(" ").length / 200) || 0;
        return {
          title: item.title,
          content: document.body.textContent,
          date: item.published,
          image,
          readingTime
        }
      });
      setBlogData(posts);
    });
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Format the date in Turkish locale
    const formattedDate = new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);

    return formattedDate.replace(/ (\d{4})$/, ', $1');
  };

  let posts = blogData;
  
  if (!posts.length) {
    const placeholderImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

    posts = Array(5).fill().map((_, index) => ({
      title: `${" ".repeat(index)}`,
      content: "Yükleniyor...",
      image: placeholderImage
    }));
  };
  
  const firstPost = posts[0];
  const selectedItems = posts.slice(1, 4);
  const remainingPosts = posts.slice(4);


  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.latestPostsWrapper}>
          <div className={styles.latestPost}>
            <Image 
              src={firstPost?.image || "/placeholder.jpg"} 
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
                  text={firstPost?.readingTime ? firstPost?.readingTime + " dakika okuma" : ""}
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
          {selectedItems.length && (
            <div className={styles.latestPosts}>
              {selectedItems.map((post) => (
                <div className={styles.latestPostItem} key={post?.title}>
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
                        text={post?.readingTime ? post?.readingTime + " dakika okuma" : ""}
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
              <div key={post?.title} className={styles.postItem}>
                <div className={styles.postItemImage}>
                  <Image 
                    src={post?.image} 
                    alt={post?.title} 
                    className={styles.postItemImage}
                    width={500}
                    height={300}
                    priority
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
                      text={post?.readingTime ? post?.readingTime + " dakika okuma" : ""}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
