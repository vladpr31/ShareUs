import { ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material";
import React from "react";
const Likes = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(post);
  if (post.likes.length > 0) {
    return post.likes.find(
      (like) => like === (user?.result?._id || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAlt fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} liked this`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""} `}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }
  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;Like
    </>
  );
};

export default Likes;
