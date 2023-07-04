import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signUp = (formInputs, location) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formInputs);
    dispatch({ type: AUTH, data });
    location("/");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signIn = (formInputs, location, next) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formInputs);
    dispatch({ type: AUTH, data });
    location("/");
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
