'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./blog.module.scss";
import { formatDate, IPost } from '../page';
import { getAllPosts, getPost } from '@/shared/helpers/apiCall';
import Image from 'next/image';
import Typography, { TextAsTypes, TextColors, TextFontSizes, TextFontWeights, TextType } from '@/components/Shared/Typography/Typography';
import Link from 'next/link';

const Blog = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [blog, setBlog] = useState<IPost | null>(null);
  const [otherPosts, setOtherPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (id) {
      getPost(id)
        .then((data) => setBlog(data))
    }
    getAllPosts(true)
      .then(data => setOtherPosts(data.filter((item: IPost) => item.id != id)));
  }, [id]);

  if (!blog) return null;

  return (
    <div className={styles.blogWrapper}>
      <Image
        src={blog.image}
        alt={blog.title}
        className={styles.blogImage}
        width={500}
        height={300}
        />
        <div className={styles.contentWrapper}>          
          <Typography
            textClassName={styles.blogDate}
            as={TextAsTypes.p}
            type={TextType.body}
            fontWeight={TextFontWeights.semibold}
            text={blog?.date ? formatDate(blog?.date) : ""}
            color={TextColors.gray}
            fontSizeDesktop={TextFontSizes["18px"]}  
            fontSizeMobile={TextFontSizes["16px"]}  
          />

          <Typography
              as={TextAsTypes.h2}
              type={TextType.title}
              fontWeight={TextFontWeights.semibold}
              text={blog.title}
              color={TextColors.dark}
              fontSizeDesktop={TextFontSizes["28px"]}  
              fontSizeMobile={TextFontSizes["22px"]}  
              textClassName={styles.latestPostTitle}
            />
          
          <Typography
            as={TextAsTypes.p}
            type={TextType.body}
            fontWeight={TextFontWeights.regular}
            text={blog?.readingTime ? blog?.readingTime + " dakika okuma" : ""}
            color={TextColors.lightGray}
            fontSizeDesktop={TextFontSizes["16px"]}  
            fontSizeMobile={TextFontSizes["16px"]}  
          />

          <div 
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className={styles.content}
          ></div>

          <div className={styles.extraWrapper}>
            <div className={styles.extrasTitleWrapper}>
              <Typography
                as={TextAsTypes.h1}
                type={TextType.title}
                fontWeight={TextFontWeights.semibold}
                text={"Diğer Yazılarım"}
                color={TextColors.dark}
                fontSizeDesktop={TextFontSizes["28px"]}  
                fontSizeMobile={TextFontSizes["20px"]}  
              />
              <Link href="/blog" className={styles.seeAllButton}>
                <Typography
                  text='Hepsini Gör'
                  as={TextAsTypes.h3}
                  color={TextColors.dark}
                  fontWeight={TextFontWeights.semibold}
                  fontSizeDesktop={TextFontSizes['18px']}
                  type={TextType.body}
                />
              </Link>
            </div>
            <div className={styles.extraContainer}>
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.title.replaceAll(" ", "-")}?id=${post.id}`} className={styles.extraPostLink}>
                  <div className={styles.extraPost}>
                      <Image
                        src={post.image}
                        className={styles.extraPostImage}
                        height={200}
                        alt={post.title}
                        width={150}
                        />
                        <div className={styles.extraPostContentWrapper}>
                          <Typography
                            as={TextAsTypes.h3}
                            type={TextType.title}
                            fontWeight={TextFontWeights.semibold}
                            text={post?.title}
                            color={TextColors.dark}
                            fontSizeDesktop={TextFontSizes["24px"]}  
                            fontSizeMobile={TextFontSizes["18px"]}  
                            textClassName={styles.extraPostItemTitle}
                          />
                          <Typography
                            as={TextAsTypes.p}
                            type={TextType.body}
                            fontWeight={TextFontWeights.light}
                            text={post?.content}
                            color={TextColors.lightGray}
                            fontSizeDesktop={TextFontSizes["18px"]}  
                            fontSizeMobile={TextFontSizes["16px"]}  
                            textClassName={styles.extraPostItemContent}
                          />
                          <div className={styles.extraPostItemFooter}>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Blog;