import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  fetchuserPostsAction,
} from "../../../../ReduxB/slices/posts/mainPostsSlice";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import { Delete, Edit } from "@mui/icons-material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Objectdetection from '../../Objectrelated/Objectdetection'
import { Box } from "@mui/system";
export default function PostsList() {
  const dispatch = useDispatch();
  const [editingPost, setEditingPost] = useState(null);
  const [open, setOpen] = React.useState(false);

  

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchuserPostsAction());
  }, [dispatch]);

  const { usersposts, isLoading, error } = useSelector(
    (state) => state?.mainpost
  );
  console.log("/////////////")
console.log(usersposts)
console.log("/////////////")
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user posts</div>;
  }

const clickMe = (id) => {
  dispatch(deletePostAction(id));
 
};


const handleEditClick = (post) => {
 
  setEditingPost(post);
  setOpen(true);
};

  return (
    <div>
      <Grid container>
        {usersposts?.map((post, i) => (
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
                  Delete
                </Button>

                <Button sx={{ mt: 1 }} variant="contained" disabled ={post.isTaken ? true :false} startIcon={<Edit /> }          onClick={() => handleEditClick(post)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {editingPost && <Dialog open={open} onClose={handleClose}>
      <Box sx={{display: "flex", justifyContent: "center",pr:"1rem",pl:"3rem" ,alignItems: "center"}}>
 
    <DialogTitle sx={{flex: 1, textAlign: "center" }}>Edit Post</DialogTitle>


    <IconButton onClick={handleClose}>
      <CloseOutlinedIcon/>
    </IconButton>

</Box>
   
        <Divider/>
        <DialogContent>
         <Objectdetection data={editingPost} update={true} close={handleClose} />
        </DialogContent>
  
      </Dialog>}
    </div>
  );
}
