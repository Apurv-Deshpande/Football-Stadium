import {
  GET_STADIUM,
  GET_STADIUMS,
  STADIUM_ERROR,
  ADD_STADIUM,
  EDIT_STADIUM,
  DELETE_STADIUM,
  FILTER_STADIUMS,
  CLEAR_FILTER,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_STADIUM
} from "../actions/types";

const initialState = {
  stadium: null,
  stadiums: [],
  loading: true,
  filtered: null,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STADIUMS:
      return {
        ...state,
        stadiums: payload,
        loading: false
      };
    case GET_STADIUM:
    case UPDATE_STADIUM:
      return {
        ...state,
        stadium: payload,
        loading: false
      };

    case ADD_STADIUM:
      return {
        ...state,
        stadiums: [payload, ...state.stadiums],
        loading: false
      };

    case EDIT_STADIUM:
      return {
        ...state,
        stadiums: state.stadiums.map(stadium =>
          stadium._id === payload._id ? payload : stadium
        )
      };

    case DELETE_STADIUM:
      return {
        ...state,
        stadiums: state.stadiums.filter(stadium => stadium._id !== payload),
        stadium: null,
        loading: false
      };
    case FILTER_STADIUMS:
      return {
        ...state,
        filtered: state.stadiums.filter(stadium => {
          const regex = new RegExp(`${payload}`, "gi");
          return stadium.name.match(regex);
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case STADIUM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ADD_COMMENT:
      return {
        ...state,
        stadium: { ...state.stadium, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        stadium: {
          ...state.stadium,
          comments: state.stadium.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };

    case UPDATE_LIKES:
      return {
        ...state,
        stadium: {
          ...state.stadium,
          comments: state.stadium.comments.map(comment =>
            comment._id === payload.id
              ? {
                  ...comment,
                  likes: payload.likes
                }
              : comment
          )
        },
        loading: false
      };

    default:
      return state;
  }
}
