import React, { useEffect } from "react";

import TabProfile from "./TabProfile";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../ReduxB/slices/users/usersSlices";


import { Box, Grid, Paper } from "@mui/material";

import { ProfileUserV2 } from "./Profilepagecomponents/ProfileUserV2";

export default function ProfilePage() {
  const store = useSelector((state) => state?.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction(store.userAuth._id));
  }, [store.userAuth._id, dispatch]);
  const { profile } = store;

  return (
    <Box height={"100%"}>
      <Box
        sx={{
          width: "100%",
          maxHeight: "219px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          style={{ width: "100%" }}
          alt="cover"
          src="https://lh3.googleusercontent.com/BbD96u55FGod7SlkIfbNArPXvNOUiySJkRAOMGGvCJTp2ew0SYPQ28nq9U6FjayriZ9MpYpLTYM4GZtTjszTzGVpkObvKbsZALApoMWcaiPetTQLAK59ZYtvkSg7"
        />
      </Box>

      <Grid
        container
        spacing={3}
     
       sx={{ pl: "39px", pr: "39px", pt: "26px", pb: "26px" }}
      >
        
        <Grid item xs={3}>
          <ProfileUserV2 data={profile} />
        </Grid>
        <Grid item xs={8}>
          <TabProfile />
        </Grid>
      </Grid>
    </Box>
  );
}
