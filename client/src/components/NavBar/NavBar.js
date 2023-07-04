import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CollectionsIcon from "@mui/icons-material/Collections";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import "./NavBar.css";
import { jwtParser } from "../../utils/utils";
const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const naviagate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    naviagate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    async function checkToken(token) {
      if (token) {
        const t = await jwtParser(token);
        if (t.exp * 1000 < new Date().getTime()) {
          logout();
        }
      }
    }
    checkToken(token);
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="appBarMain">
        <Typography
          className="heading"
          variant="h2"
          align="center"
          component={Link}
          to="/"
        >
          <span id="title-character">P</span>
          <span id="title-rest">ix</span>
          <span id="title-Second-character">M</span>
          <span id="title-word">ix</span>
        </Typography>
      </div>
      <Toolbar>
        {user ? (
          <div className="toolBar">
            <Avatar
              className="purple"
              alt={user.userInfo ? user.userInfo.name : user.result.username}
              src={user.userInfo ? user.userInfo.imageUrl : null}
            >
              {user.userInfo
                ? user.userInfo.name.charAt(0)
                : user.result.username.charAt(0)}
            </Avatar>
            <Typography className="userName" variant="h6">
              Hello, {user.userInfo ? user.userInfo.name : user.result.username}
            </Typography>
            <Button
              variant="contained"
              className="nav-btn"
              color="secondary"
              component={Link}
              to="/"
            >
              Home
            </Button>

            <Button
              variant="contained"
              className="nav-btn"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button component={Link} to="/" className="navBarButton">
              <span className="box">
                <HomeIcon className="nav-icon" />
              </span>
              HOME
            </Button>
            <Button
              component={Link}
              to="/posts"
              style={{ margin: "0px 10px" }}
              className="navBarButton"
            >
              <span className="box">
                <CollectionsIcon className="nav-icon" />
              </span>
              GALLERY
            </Button>
            <Button component={Link} to="/auth" className="navBarButton">
              <span className="box">
                <LoginIcon className="nav-icon" />
              </span>
              sign in
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
