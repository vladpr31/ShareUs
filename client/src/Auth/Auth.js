import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { LockOutlined } from "@mui/icons-material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import Inputs from "./Inputs";
import { jwtParser } from "../utils/utils";
import "./Auth.css";
import { signUp, signIn } from "../actions/auth";
import { useNavigate } from "react-router";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setSignUpMode] = useState(false);
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formInputs, navigate));
    } else {
      dispatch(signIn(formInputs, navigate));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };
  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const switchMode = () => {
    isSignup ? setSignUpMode(false) : setSignUpMode(true);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const token = res?.credential;
    const userInfo = await jwtParser(token);

    try {
      dispatch({ type: "AUTH", data: { token, userInfo } });
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    throw new Error("Google Signin Failed.");
  };

  return (
    <GoogleOAuthProvider clientId="480220420733-tfljie68rpkal6mi47fdgir8csjd6kcp.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className="paper" elevation={3}>
          <Avatar
            className="avatar"
            style={{ backgroundColor: "palevioletred" }}
          >
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Inputs
                    name="userName"
                    label="Username"
                    handleChange={handleChange}
                    autoFocus
                    type="text"
                  />
                </>
              )}
              <Inputs
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
              />
              <Inputs
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Inputs
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >
              {isSignup ? "Sign me up!" : "Sign me in!"}
            </Button>
            <GoogleLogin
              theme="filled_blue"
              type="standard"
              locale="english"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              text={isSignup ? "signup_with" : "signin_with"}
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode} className="no-account">
                  {isSignup
                    ? "Already Have an Account? Sign in now!"
                    : "Don't Have an Account? Sign Up Fast!"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};
export default Auth;
