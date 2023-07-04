import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import PostOptions from "./PostOptions";
import { MoreVert, ChatBubbleOutline } from "@mui/icons-material";
import Likes from "./Likes";
import { likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Post.css";
const Post = ({ post, setCurrentId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function that handles the 3 Vertical dots, opens a menu.
  const handleOpenModal = () => {
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  //opens and closes the menu, and anchors it to the e.target which is the 3 vertical dots.
  const handleMenu = (e) => {
    if (!menuOpen) {
      setAnchorEl(e.target);
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
      setAnchorEl(null);
    }
  };

  //this function "opens" a post, navigates to PostDetails component.
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <Card className="card" raised elevation={6}>
      <ButtonBase className="cardAction" onClick={openPost}>
        <CardMedia
          className="media"
          image={post?.selectedFile}
          title={post.title}
        />
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </ButtonBase>
      <div className="overlay2">
        {/*This one checks if the user is the post creator, therfore it allows the user to Edit Or Delete a post. */}

        {(user?.userInfo?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            id="more-btn"
            style={{ color: "white" }}
            size="small"
            onClick={handleMenu}
          >
            <MoreVert id="more-ico" fontSize="default" />
          </Button>
        )}
        <PostOptions
          handleMenu={handleMenu}
          post={post}
          menuOpen={menuOpen}
          anchorEl={anchorEl}
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          setMenuOpen={setMenuOpen}
          setCurrentId={setCurrentId}
          setOpenModal={setOpenModal}
        />
      </div>

      {/*Post Details, Tags/Titles/Date/Likes */}

      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <Button
          size="small"
          id="like-btn"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={user ? false : true}
        >
          <Likes post={post} />
        </Button>
        <Button size="small" color="secondary" onClick={openPost}>
          <ChatBubbleOutline fontSize="small" />
          &nbsp; {post.postComments.length} Comments
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
