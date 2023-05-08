import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  CardContent,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";


export const ProfileUserV2 = ({ data }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setProgress((data?.Rankpoints / MAX_RANK_POINTS) * 1000); // Update the progress based on rankPoints
  }, [data?.Rankpoints]);

  const MAX_RANK_POINTS = 100000;

  let level = 0; // Default level
const rankPoints = data?.Rankpoints;

if (rankPoints >= 100 && rankPoints <= 2000) {
level = 1;
} else if (rankPoints >= 3000 && rankPoints <= 6000) {
level = 2;
} else if (rankPoints >= 7000 && rankPoints <= 10000) {
level = 3;
} else if (rankPoints == 100000) {
level=4;
}

  const updatedHightlightdata = [
    ...Hightlightdata.slice(0, 1), // Keep the existing elements before the level
    { name: "Level", value: level }, // Update the level value
    ...Hightlightdata.slice(2), // Keep the existing elements after the level
  ];
  return (
    <Container disableGutters={true}>
 
      <Avatar
        alt="Profile pic"
        src={data?.profilePhoto}
        sx={{
          mt: "-7rem",
          width: "12rem",
          height: "12rem",
          borderRadius: "104.667px",
          alignSelf: "center",
        }}
      />
      

      <Box sx={{ p: 0, position: "relative", top: "2rem", border: "white" }}>
        <Stack gap={3}>
          <Typography variant="subtitle1" sx={{ fontSize: "22px" }}>
            {data?.firstName} {data?.lastName}
          </Typography>

          <Stack direction={"row"} alignItems="center" justifyContent="left" gap={1}>
            <EmailOutlinedIcon fontSize="small" />
            <Typography sx={{ color: "rgba(58, 53, 65, 0.87)" }}>{data?.email}</Typography>
          </Stack>

          <Typography gutterBottom sx={{ fontSize: "13", fontWeight: "600" }}>
            Highlights
          </Typography>

          <Grid container direction="row" justifyContent="space-between" gap={1}>
            {updatedHightlightdata.map((el, i) => (
              <Grid key={i} item xl={2} lg={2} xs={12} md={4} sm={3}>
                <Stack spacing={2}>
                  <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>{el.value}</Typography>
                  <Typography sx={{ fontSize: "0.75rem" }}>{el.name}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
      <LinearProgress variant="determinate" value={progress} />

          <CardContent sx={{ p: 0 }}>
            <Typography gutterBottom sx={{ fontSize: "13", fontWeight: "600" }}>
              About me
            </Typography>

            <Typography variant="body2" sx={{ textAlign: "justify" }} color="text.primary">
              {data?.bio}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "justify" }} color="text.primary">
             Level: {level}
            </Typography>
          </CardContent>

          <Button
            variant="outlined"
            color="success"
            sx={{ height: "100%", width: "100%" }}
            onClick={() => navigate(`./update/${data?._id}`)}
          >
            Edit Profile
          </Button>
        </Stack>
      </Box>


    </Container>
  );
};

export const Hightlightdata = [
  {
    name: "Rating",
    value: 4.9,
  },
  {
    name: "Posts",
    value: "2.5K",
  },
  {
    name: "Taken",
    value: 23,
  },
];


export default ProfileUserV2;