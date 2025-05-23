const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface IPostRespose {
  kind: string;
  id: string;
  blog: {
    id: string;
  };
  published: Date;
  updated: Date;
  url: string;
  selfLink: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    image: {
      url: string;
    };
  };
  replies: {
    totalItems: string;
    selfLink: string;
  };
}

const getAllPosts = (limit?: boolean) => {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}${
    limit ? "&maxResults=6" : ""
  }`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.items.map((item: IPostRespose) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(item.content, "text/html");
        const image = document.querySelector("img")?.src;
        const readingTime =
          Math.ceil(
            document.body.textContent
              ? document.body.textContent.split(" ").length / 200
              : 0
          ) || 0;
        return {
          id: item.id,
          title: item.title,
          content: document.body.textContent,
          date: item.published,
          image,
          readingTime,
        };
      });
    });
};

const getAllPostsForSiteMap = () => {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.items.map((item: IPostRespose) => {
        return {
          id: item.id,
          title: item.title,
        };
      });
    });
};

const getPost = (id: string) => {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const parser = new DOMParser();
      const document = parser.parseFromString(data.content, "text/html");
      const image = document.querySelector("img")?.src;
      document.querySelector("img")?.parentElement?.remove();
      const readingTime =
        Math.ceil(
          document.body.textContent
            ? document.body.textContent.split(" ").length / 200
            : 0
        ) || 0;

      return {
        id: data.id,
        title: data.title,
        date: data.published,
        content: document.body.innerHTML,
        image: image || "",
        readingTime,
      };
    });
};

export { getAllPosts, getPost, getAllPostsForSiteMap };
