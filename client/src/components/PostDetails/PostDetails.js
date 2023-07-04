import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import { fetchPost, fetchPostsBySearch, likePost } from "../../actions/posts";
import Comments from "./Comments";
import Likes from "../Posts/Post/Likes";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  //useSelector at first will return an empty posts: [] object, then will return from the API call the rest of data,
  //for that we need isLoading, while we wait for the data to comeback.

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); //get the /posts/this->:id<-this
  const user = JSON.parse(localStorage.getItem("profile"));
  let recommendedPosts = [];

  //filters recommended posts and checks that it wont recommend the current post.
  //all posts fetched using useSelector() which returns all the posts.
  // if (post) {
  //   recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);
  // }

  //useEffect for fetching the specific post on clicking a card.
  //id is taken is useParams() from the url.
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  //fetches posts by tags automatically for the recommended posts section.
  useEffect(() => {
    if (post) {
      dispatch(
        fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);
  //Opens a post from the recommended tab.
  const openPost = (postID) => {
    navigate(`/posts/${postID}`);
  };

  if (!post && posts) return null;
  if (isLoading && !posts)
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em" />
      </Paper>
    );

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className="mainCard">
        <div className="cardSection">
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Tags: {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Description: <br></br>
            {post.message}
          </Typography>
          <Typography variant="h6">Created By: {post.name}</Typography>
          <Typography variant="body1">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>

          <Button
            onClick={() => dispatch(likePost(id))}
            color="primary"
            variant="contained"
            disabled={user ? false : true}
          >
            <Likes post={posts[0] ? posts[0] : post} />
          </Button>
          <Divider style={{ margin: "20px 0" }} />
          <Comments post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="cardImageSection">
          <img src={post.selectedFile} alt="postImage" className="imageMedia" />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className="cardSection">
          <Typography gutterBottom variant="h5">
            Also Might Interest You
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => {
                    openPost(_id);
                  }}
                  className="recommendedCard"
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    By: {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt={title} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
