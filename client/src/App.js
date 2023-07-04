import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Intro from "./components/Introduction/Intro";
import "./App.css";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
      </Container>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          exact
          path="/auth"
          element={user ? <Navigate replace to="/posts" /> : <Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
