import axios from "axios";

//Api call, uses interceptors to check if actions is allowed.
const API = axios.create({ baseURL: "http://localhost:3001/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  console.log(req);
  return req;
});

//Posts

//Crud Operations.
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); //fetches all posts, used on the main screen.
export const createPost = (newPost) => API.post("/posts", newPost); //creates a post.
export const updatePost = (
  postID,
  updatedPost //updates a post.
) => API.patch(`/posts/${postID}`, updatedPost);
export const deletePost = (postID) => API.delete(`/posts/${postID}`, postID); //deletes a post.
export const likePost = (postID) => API.patch(`/posts/${postID}/likePost`); //liking a post.
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchInput || "none"}&tags=${
      searchQuery.tags
    }`
  ); //Search query for searching a post, could be improved on the backend to return posts that are close to the search
//query, as for now returns only posts that match 1:1 to the searched post. (ex: if post has a tag of #pets
// and user searches for #pet, it wont return the post with the tag of #pets.)
export const fetchPost = (postID) => API.get(`/posts/${postID}`); //Fetching singular post when user clicks on post.
export const postComment = (comment, postID) =>
  API.post(`/posts/${postID}/commentPost`, { comment }); //adds a comment on a post.

//User Auth
export const signIn = (formInputs) => API.post("/users/signin", formInputs);
export const signUp = (formInputs) => API.post("/users/signup", formInputs);
