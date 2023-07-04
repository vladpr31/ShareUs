import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};
//In the reducer we should not modify the original state.
//Doing so will create issues in your application and so it's not recommended.

//auth reducer gets a state of authData. which is an object.
// authData = data = {token,userInfo};
export default authReducer;
