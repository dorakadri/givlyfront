import React, { useEffect } from "react";
import ProfileCrad from "./ProfileCrad";

import TabProfile from "./TabProfile";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../ReduxB/slices/users/usersSlices";

import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";

//qsdsqdqsd
const Item = styled(Paper)(() => ({
  padding: "1rem",
  textAlign: "center",
  color: "black",
}));
export default function ProfilePage() {
  const store = useSelector((state) => state?.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction(store.userAuth._id));
  }, [store.userAuth._id, dispatch]);
  const { profile } = store;
  return (
    <Box sx={{ p: "2rem", backgroundColor: "#F0F2F5" }} mx="auto">
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={3}
          style={{ position: "sticky", top: "70px", height: "743px" }}
        >
          <ProfileCrad data={profile} />
        </Grid>
        <Grid item xs={5}>
          <TabProfile />
        </Grid>
      </Grid>
    </Box>
  );
}
