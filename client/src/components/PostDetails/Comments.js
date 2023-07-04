import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { postComment } from "../../actions/posts";
import { Link } from "react-router-dom";
import "./Comments.css";

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.postComments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();
  let user = JSON.parse(localStorage.getItem("profile"));

  let userName = "";
  user
    ? (userName = user.result ? user.result.username : user.userInfo.name)
    : (userName = null);

  const finalComment = `${userName}:${comment}`;
  const handleCommentClick = async (e) => {
    if (userName && comment) {
      //Adds user "Avatar" near Comment.
      const userImg = user?.userInfo
        ? user.UserInfo.name.charAt(0)
        : user.result.username.charAt(0);

      //posts the comment.
      const updatedComments = await dispatch(
        postComment(finalComment, post._id)
      );
      //sets comments and "Cleans" the comment TextField.
      setComments(updatedComments);
      setComment("");
      //scrolls to latest comment so the user wont need to scroll.
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="outerContainer">
        <div className="innerContainer">
          <Typography gutterBottom variant="h6" width="100%">
            Comments: <br></br>
            {comments.length > 0 ? null : (
              <>No Comments Yet, Be The First To Comment!</>
            )}
          </Typography>
          {comments?.map((comment, index) => (
            <div className="comment" key={index}>
              <Avatar className="commentAvatar" src={comment[0]}>
                {comment[0]}
              </Avatar>
              <Typography variant="subtitle1">
                <strong>{comment.split(":")[0]}: </strong>
                {comment.split(":")[1]}
              </Typography>
            </div>
          ))}
          <div ref={commentsRef} />
          {/*If there are comments, map them and show them. */}
        </div>
        {/*Writing a comment only allowed for logged in users, disabled if user is not logged in. */}

        {user ? (
          <div>
            <Typography gutterBottom variant="h6">
              Write a Comment...
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              onClick={handleCommentClick}
            >
              Add Comment
            </Button>
          </div>
        ) : (
          <>
            <Link to="/auth" id="logInRef">
              Log in
            </Link>{" "}
            To Comment On This Post.
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
