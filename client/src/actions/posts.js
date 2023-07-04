import * as api from "../api";
import {
  FETCH_ALL,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
  POSTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  POST_COMMENT,
} from "../constants/actionTypes";
//Action Creators

//get all the posts.
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("this error:", error);
    throw new Error(error);
  }
};
//fetch posts by a search input, can be improved to search for "close enough" posts
//(ex: Input:#pets, output:#pets,#pet,#cat #dog etc. for now if input:#pets will search only #pets. wont return for #pet)
export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: POSTS_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    throw new Error(error);
  }
};
//fetch specific post by ID.
export const fetchPost = (postID) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(postID);
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    throw new Error(error);
  }
};

//create post.
export const createPost = (newPost, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE_POST, payload: data });
    dispatch({ type: END_LOADING });
    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
//update post.
export const updatePost = (postID, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postID, updatedPost);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    throw new Error(error);
  }
};
//delete post.
export const deletePost = (postID) => async (dispatch) => {
  try {
    await api.deletePost(postID);
    dispatch({ type: DELETE_POST, payload: postID });
  } catch (error) {
    throw new Error(error);
  }
};
//liking a post.
export const likePost = (postID) => async (dispatch) => {
  //first we check if there is a user, so no token = no like.
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(postID, user?.token);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    throw new Error(error);
  }
};

//posts a comment on a post
export const postComment = (comment, postID) => async (dispatch) => {
  try {
    const { data } = await api.postComment(comment, postID);
    dispatch({ type: POST_COMMENT, payload: data });
    return data.postComments;
  } catch (error) {
    throw new Error(error);
  }
};
