import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from "react-tinder-card";

import {
  addmatches,
  addtowishlistAction,
  fetchPostsAction,
} from "../../../../../ReduxB/slices/posts/mainPostsSlice";
import Cardpost from "./Cardpost";
import { AppContext } from "../../../../../context/appContext";

const useStyles = makeStyles({
  swipe: {
    position: "absolute",
  },
});
export default function Cardswipe() {
  const [lastDirection, setLastDirection] = useState();
  const store = useSelector((state) => state?.users);
  const theme = useSelector((state) => state?.globaltheme);
  const [Posts, setPosts] = useState();
  const dispatch = useDispatch();
  const { socket } =
useContext(AppContext);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);

  const { postLists, loading, appErr, serverErr } = useSelector(
    (state) => state.mainpost
  );

  useEffect(() => {
    console.log(theme.mode);

    if (theme.mode === "light") {
      const objectposts = postLists?.filter((e) => e.type === "object");
      setPosts(objectposts);
    }
    if (theme.mode === "dark") {
      const objectposts = postLists?.filter((e) => e.type === "food");

      setPosts(objectposts);
    }
  }, [postLists, theme.mode]);

  const swiped = async (direction, thepost) => {
    setLastDirection(direction);
    if (direction === "right") {
      dispatch(
        addtowishlistAction({ id: store.userAuth._id, _id: thepost._id })
      );
    }
    if (direction === "down") {
      const data = {
        userId: store.userAuth._id,
        postId: thepost._id,
        ownerId: thepost.userId.id,
      };
      dispatch(addmatches(data)).then((result) => {
        console.log(result);
        socket.emit('match');
      });
    }

    setTimeout(() => {
      setPosts(Posts.filter((post) => post._id !== thepost._id));
    }, 100);
  };

  const cardRef = useRef(null);

  const handleButtonClick = async (buttonDirection) => {
    console.log(buttonDirection);
    await cardRef.current.swipe(buttonDirection);
  };

  const classes = useStyles();
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: {
            xs: "1vh",
            sm: "3vh",
            md: "5vh",
            lg: "7vh",
            xl: "10vh",
          },
        }}
      >
        {Posts?.map((p) => (
          <TinderCard
            ref={cardRef}
            className={classes.swipe}
            key={p._id}
            onSwipe={(dir) => swiped(dir, p)}
            preventSwipe={"down"}
          >
            <Cardpost data={p} onButtonClick={handleButtonClick} />
          </TinderCard>
        ))}
      </Box>
    </Box>
  );
}
