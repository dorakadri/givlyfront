import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import mainpostReducer from "../slices/posts/mainPostsSlice";
import globalReducer from "../../components/pages/Dashboard/state/index";
import accountVerification from "../slices/accountVerification/accVerificationSlices";
import deliveryReducer from "../slices/delivery/deliverysSlices";import diyReducer from "../slices/IA/diySlice"
import globalthemeReducer from "../../ReduxB/slices/Themeglobal/index";import postForum from "../slices/postsForum/postForumSlices";
import comment from "../slices/comments/commentSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: globalReducer,
    globaltheme:globalthemeReducer,
    accountVerification,
    delivery:deliveryReducer,
    mainpost:mainpostReducer,
   diy :diyReducer,
    postForum,
    comment,
  },
});

export default store;
