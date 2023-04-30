import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteMatchAction,
  deletePostAction,
  fetchPostsMatchedAction,

} from "../../../../ReduxB/slices/posts/mainPostsSlice";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,

  Grid,

  Typography,
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import { Delete, Edit } from "@mui/icons-material";
import { deliveryAction } from "../../../../ReduxB/slices/delivery/deliverysSlices";
import { useNavigate } from "react-router-dom";

export default function MatchedList() {
  const dispatch = useDispatch();
const navigate=useNavigate();
const [alert,setAlert]=useState(false);

  useEffect(() => {
    dispatch(fetchPostsMatchedAction());
  }, [dispatch]);

  const { usersmatchposts, isLoading, error} = useSelector(
    (state) => state?.mainpost
  );

  const { serverErr,appErr } = useSelector(
    (state) => state?.delivery
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user posts</div>;
  }

  const clickMe = (id) => {
    dispatch(deleteMatchAction(id));
  };
  function AddDelevery(e){
 console.log(e)
    let post=e._id

  let locationOwner=e.userId.location
   // let locationUser="36.8245413, 10.179704"
    const data={post,locationOwner}
    console.log(data)
    dispatch(deliveryAction(data)).then((response) => {
      if (response.type === "delivery/rejected") {
        setAlert(true);
     
      } else if (response.type === "delivery/fulfilled") {
        navigate("/user/delivery");
      }
    }).catch((error) => {
      setAlert(true);
    });

   }


  return (
    <div>
       { alert  && <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Sorry, there are no available deliverymen at the moment  — <strong> please try again later!</strong>
      </Alert>}
      <Grid container>
        {usersmatchposts?.map((post, i) => (
          <Grid
            key={post?._id}
            item
            xs={12}
            md={4}
            xl={4}
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
                image={post.postPicture}
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
                {post.isTaken && <VerifiedIcon color="primary" />}
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-evenly", flexWrap: "wrap" }}
              >
                <Button
                  onClick={() => clickMe(post._id)}
                  sx={{ mt: 1 }}
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                >
                  Remove
                </Button>

                <Button
                  sx={{ mt: 1 }}
                  variant="contained"
                  disabled={post.isTaken ? true : false}
                  onClick={() => AddDelevery(post) }
                >
                  Ship
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
