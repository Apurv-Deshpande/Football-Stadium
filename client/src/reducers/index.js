import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import stadium from "./stadium";

export default combineReducers({
  alert,
  auth,
  stadium
});
