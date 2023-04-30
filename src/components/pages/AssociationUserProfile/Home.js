import { Avatar, Box, Button, Card } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import PostsForumList from "../postsForum/PostsForumList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
const navigate =useNavigate()
const selector =useSelector((state)=>state?.users.profile)


  return (
    <Box width="700px" margin={"auto"} pt="1rem">
      <Card variant="elevation" pt="1rem" >
        <Stack direction={"row"} alignItems="center" gap={1} sx={{ p: "15px" }}>
          <Avatar alt="yourphoto" src={selector?.profilePhoto} sx={{ width: 45, height: 45 }} />
          <Button
          onClick={()=>navigate("../createpost")}
            display={"flex"}
            variant="outlined"
            sx={{
              borderColor: "#E7E7E8",

              color: "#979797",
              height: "3rem",

              justifyContent: "flex-start",
              p: "6px 15px",
              width: "100%",
            }}
          >
            Start a post
          </Button>
        </Stack>
      </Card>
      <PostsForumList />
    </Box>
  );
}
