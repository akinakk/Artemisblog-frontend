import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error while fetching the post');
      });
    // eslint-disable-next-line
  }, []);


  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  console.log(data.imageUrl);

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Artemi Baburin",
              avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
            },
            text: "Test Comment",
          },
          {
            user: {
              fullName: "akinakk",
              avatarUrl: "https://mui.com/static/images/avatar/4.jpg",
            },
            text: "Commenting is not available yet, sorry :)",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
