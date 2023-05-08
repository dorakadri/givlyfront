import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Typography from "@mui/material/Typography";

import { Box, Stack } from "@mui/system";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileCrad({ data }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        height: "100%",
        boxShadow: " 0 1px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={data?.profilePhoto}
            onClick={(e) => setOpen(true)}
          ></Avatar>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {data?.associationName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EmailOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              {data?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <HomeIcon />
            <Typography variant="body2" color="text.secondary">
              {data?.associationAdress}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PhoneIcon />
            <Typography variant="body2" color="text.secondary">
              {data?.associationPhone}
            </Typography>
          </Box>

          <Typography textAlign="left" variant="body2" color="text.secondary">
            {data?.bio}
          </Typography>

          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#06A696",
              color: " #fff",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              p: "1rem",
              textAlign: "center",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#06A696",
              },
            }}
            style={{ marginTop: "50px" }}
            onClick={() => navigate(`./update/${data?._id}`)}
          >
            edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
