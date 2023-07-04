import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts, fetchPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination/Pagination";
import "./Home.css";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentID, setCurrentID] = useState(0);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const postSearch = () => {
    if (searchInput.trim() || tags) {
      tags.length > 0
        ? dispatch(
            fetchPostsBySearch({
              searchInput,
              tags: tags.join(","),
            })
          )
        : dispatch(fetchPostsBySearch({ searchInput, tags: tagInput }));
      navigate(
        `/posts/search?${searchQuery}=${searchInput || null}&tags=${
          tags.join(",") || null
        }`
      );
    } else {
      navigate("/");
    }
  };
  const handleSearch = () => {
    postSearch();
    setSearchInput("");
    setTagInput("");
    setTags([]);
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing="3"
          className="gridContainer"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search"
                fullWidth
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Search by Tags"
                style={{ margin: "10px 0px" }}
                value={tagInput}
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? (handleAdd(tagInput), setTagInput(""))
                    : null
                }
                onChange={(e) => setTagInput(e.target.value)}
              />
              {tags.length > 0
                ? tags.map((tag, index) => {
                    return (
                      <div key={index}>
                        <Chip
                          style={{
                            width: "fit-content",
                          }}
                          variant="outlined"
                          label={tag}
                          onDelete={() => handleDelete(tag)}
                        />
                      </div>
                    );
                  })
                : null}
              <Button
                color="primary"
                variant="contained"
                onClick={handleSearch}
              >
                Search Post
              </Button>
            </AppBar>
            {user ? (
              <Form currentId={currentID} setCurrentId={setCurrentID} />
            ) : null}
            <Paper className="pagination" elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
