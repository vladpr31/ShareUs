import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Tag, ChatBubble } from "@mui/icons-material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router";
import "./Form.css";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const navigate = useNavigate();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  let user = JSON.parse(localStorage.getItem("profile"));

  user
    ? (user = user.result ? user.result.username : user.userInfo.name)
    : (user = null);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user }), navigate);
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  return (
    <Paper className="paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Updating" : "Sharing"} A Momment
        </Typography>

        <TextField
          className="textInput"
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        ></TextField>
        <TextField
          className="textInput"
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ChatBubble fontSize="small" />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          className="textInput"
          name="tags"
          variant="outlined"
          value={postData.tags}
          label="Tags"
          onChange={(e) => {
            setPostData({
              ...postData,
              tags: e.target.value.split(","),
            });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tag
                  fontSize="small"
                  style={{ height: "15px", width: "15px" }}
                />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className="submit-btn"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className="submit-btn"
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;
