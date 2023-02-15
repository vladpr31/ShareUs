import jwt from "jsonwebtoken";

//middleware is used to check if an action is possible by the user, such as liking a post.
// middleware checks if user can like the post, or delete the post, somewhat of permission check.

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1]; //checks token in the headers.authorization [Bearer[0] Token[1]]
    const isGoogleAuth = token.length < 500; //if bigger than 500 then it is a google token.
    let decodedData;

    if (token && isGoogleAuth) {
      decodedData = jwt.verify(token, "superSecretKey!@"); //verifies the token to jwt and the secret key.
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next(); //next to continue onward.
  } catch (error) {
    throw new Error(error.message);
  }
};
export default auth;

//the auth used mainly to check if a user is authorized to make changes, such a editing or deleting a post.
//creating a post, commenting or liking a post.
