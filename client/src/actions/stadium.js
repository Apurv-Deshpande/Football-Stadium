import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_STADIUMS,
  STADIUM_ERROR,
  DELETE_STADIUM,
  ADD_STADIUM,
  GET_STADIUM,
  EDIT_STADIUM,
  FILTER_STADIUMS,
  CLEAR_FILTER,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_LIKES
} from "./types";

export const getCurrentStadium = () => async dispatch => {
  try {
    const res = await axios.get("/api/stadium/me");

    dispatch({
      type: GET_STADIUM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStadiums = () => async dispatch => {
  try {
    const res = await axios.get("/api/stadium");

    dispatch({
      type: GET_STADIUMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStadium = id => async dispatch => {
  try {
    const res = await axios.get(`/api/stadium/${id}`);

    dispatch({
      type: GET_STADIUM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteStadium = id => async dispatch => {
  try {
    await axios.delete(`/api/stadium/${id}`);

    dispatch({
      type: DELETE_STADIUM,
      payload: id
    });

    dispatch(setAlert("Stadium Removed", "success"));
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addStadium = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/stadium", formData, config);

    dispatch({
      type: ADD_STADIUM,
      payload: res.data
    });

    dispatch(setAlert("Stadium Created", "success"));
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editStadium = (formData, id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/api/stadium/${id}`, formData, config);

    dispatch({
      type: EDIT_STADIUM,
      payload: res.data
    });

    dispatch(setAlert("Stadium Updated", "success"));
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const filterStadiums = text => async dispatch => {
  dispatch({
    type: FILTER_STADIUMS,
    payload: text
  });
};

export const clearFilter = () => async dispatch => {
  dispatch({
    type: CLEAR_FILTER
  });
};

// Add comment
export const addComment = (stadiumId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/stadium/comment/${stadiumId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (stadiumId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/stadium/comment/${stadiumId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLike = (stadiumId, commentId) => async dispatch => {
  try {
    const res = await axios.put(`/api/stadium/like/${stadiumId}/${commentId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { commentId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (stadiumId, commentId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/stadium/unlike/${stadiumId}/${commentId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { commentId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: STADIUM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
