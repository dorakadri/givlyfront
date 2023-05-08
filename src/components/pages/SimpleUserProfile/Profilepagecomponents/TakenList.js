import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsTakenAction } from "../../../../ReduxB/slices/posts/mainPostsSlice";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function TakenList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsTakenAction());
  }, [dispatch]);

  const { taken, isLoading, error } = useSelector((state) => state?.mainpost);
  return (
    <Grid container>
      {taken?.map((post, i) => (
        <Grid
          key={post?._id}
          item
          xs={12}
          md={6}
          sm={12}
          xl={6}
          style={{ padding: "1rem  1rem" }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar alt="ownerphoto" src={post?.userId.profilePhoto} />
              }
              title={
                <Typography>
                  {" "}
                  {post?.userId.firstName} {post?.userId.lastName}
                </Typography>
              }
              subheader={new Date(post.createdAt).toLocaleDateString()}
            />
            <CardMedia
              component="img"
              height="194"
              src={post.postPicture}
              alt="Paella dish"
            />

            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Typography gutterBottom variant="body1" component="div">
                  {post.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.description}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
