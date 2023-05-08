import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { addtowishlistAction } from "../../../../../ReduxB/slices/posts/mainPostsSlice";
import { Box } from "@mui/system";
import { calculateDistance } from "../../../../shared/Distance";

export default function Cardpost(props) {
  const [post, setPost] = useState(props.data);
  const [info, setInfo] = useState(false);
  const user=useSelector((state)=>state?.users.profile)
  
  const displayinfo = () => {
    setInfo(!info);
  };
  const handleWishlist = () => {
    props.onButtonClick("right");
  };

  const handlePass = () => {
    props.onButtonClick("left");
  };

  const handleTake = () => {
    props.onButtonClick("down");
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        width: 400,
        minHeight: 500,
        height: 650,
        userSelect: "none",
        backgroundColor: "transparent",
        overflow: "hidden",
        borderColor: "transparent",
        px: "0.6rem",
        position: "relative",
        backgroundImage: `url(${post.postPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundImage: "linear-gradient(to top, #000000, transparent)",
        }}
      >
        <CardContent sx={{ pointerEvents: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ pointerEvents: "none", color: "white" }}
              gutterBottom
              variant="h3"
              component="div"
            >
              {post.title}
            </Typography>
            <IconButton
              sx={{ color: "white", pointerEvents: "auto" }}
              onClick={displayinfo}
            >
              <InfoIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="white">
            {post.description}
          </Typography>
          {info && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "1rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ mr: 1 }} src={post.userId?.profilePhoto} />

                <Typography sx={{ color: "white" }}>
                  {post.userId.firstName} {post.userId.lastName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon sx={{ color: "white", mr: 0.5 }} />
                <Typography sx={{ color: "white" }}>{calculateDistance(post.userId.location.latitude
, post.userId.location.longitude, user?.location.latitude, user?.location.longitude)} km </Typography>
              </Box>
            </Box>
          )}
        </CardContent>

        <CardActions
          disableSpacing
          sx={{
            justifyContent: "space-around",
            mb: "1rem",
          }}
        >
          <IconButton
            aria-label="pass"
            size="large"
            id="pass"
            sx={{ border: " 1px solid red" }}
            onClick={handlePass}
          >
            <CloseIcon color="error" />
          </IconButton>

          <Fab
            aria-label="like"
            sx={{
              background: " linear-gradient(to right, #67b26f, #4ca2cd)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            id="take"
            onClick={handleTake}
          >
            <FavoriteIcon sx={{ color: "white" }} />
          </Fab>
          <IconButton
            aria-label="wishlist"
            size="large"
            id="wishlist"
            className="lala"
            onClick={handleWishlist}
            sx={{ border: " 1px solid #0288d1" }}
          >
            <StarIcon color="info" />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}
