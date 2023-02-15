import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

//gets all posts.
export const getPosts = async (req, res) => {
  const { page } = req.query; //get page.
  //i am using pagination, so:
  try {
    const pagesLimit = 8; //number of return posts per page is 8.
    const startIndex = (Number(page) - 1) * pagesLimit; //start index of every page;
    const total = await PostMessage.countDocuments({}); //total amount of posts.
    const posts = await PostMessage.find()
      .sort({ _id: -1 }) //_id:-1 sort from newest.
      .limit(pagesLimit) //limits to return 8 pages per find().
      .skip(startIndex); //skips from the last index so it wont return us posts we already had.
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalNumberOfPages: Math.ceil(total / pagesLimit),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//create post.
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//update the post.
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const updatedPost = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Such Post ID.");
  try {
    const newPost = await PostMessage.findByIdAndUpdate(_id, {
      ...updatedPost,
      _id,
    });
    res.json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//deletes the post.
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Such Post ID");
  try {
    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post Deleted Succesfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//likes a post.
export const likePost = async (req, res) => {
  const { id } = req.params; //destructure ID from req.params.
  if (!req.userId)
    //check if this ID exsists in the database.
    return res.json({ message: "Such User Doesn't Exsists" }); //no user? problemo.
  if (!mongoose.Types.ObjectId.isValid(id))
    //no user? problemo.
    return res.status(404).send("No Such Post ID");
  try {
    const post = await PostMessage.findById(id); //try to find post by ID.
    const index = post.likes.findIndex((id) => id === String(req.userId)); //find user's INDEX by its ID.
    //Likes of users saved by their ID so if index is -1 the users didnt like the post.
    if (index === -1) {
      post.likes.push(req.userId); //push 1 like into the post's like array. (inserts user's ID).
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
      //if user already like the posts previously and clicked the liked again, unlike it(removes the like from the array)
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    }); //find post and update it with the like.
    res.json(updatedPost); //return the updated post.
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//fetch posts by search of search input or tags input or both.
export const fetchPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); //makes all lower case.
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }], //find title or find tags.
    });
    //$or - either find the title or find me the tags. matches one of those (title or tags).
    //$in - check if there is a tag that matches the query.
    res.json({ data: posts });
  } catch (error) {
    throw new Error(error);
  }
};

//fetch specific post by id.
export const fetchPost = async (req, res) => {
  const { id } = req.params; //destructure ID from req.params.
  try {
    const post = await PostMessage.findById(id); //try to find the post by id, if exsists return the posts.
    res.json(post);
  } catch (error) {
    throw new Error(error);
  }
};

export const postComment = async (req, res) => {
  const { id } = req.params; //check fir post ID.
  const { comment } = req.body; //destructure the data.
  console.log(req.body);
  try {
    const post = await PostMessage.findById(id); //find post.
    post.postComments.comments.push(comment); //push comment into the comments of post's data.
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    }); //find and update it.
    res.json(updatedPost); //finally return the updated post.
  } catch (error) {
    throw new Error(error);
  }
};
