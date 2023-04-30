import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import myService from "../servicedash/Service";

export default function GiftCard({ gift, handleDelete }) {
  const gold =
    "linear-gradient( -72deg,#ffde45,#ffffff 16%, #ffde45 21%, #ffffff 24%, #e5e5e5 27%, #ffde45 36%, #ffffff 45%,#ffffff 60%, #ffde45 72%,#ffffff 80%,#ffde45 84%,#ffffff00)";
  const silver =
    "linear-gradient(-72deg,#dedede, #ffffff 16%,#dedede 21%,#ffffff 24%, #454545 27%,#dedede 36%, #ffffff 45%, #ffffff 60%, #dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)";
  const bronze =
    "  linear-gradient(-72deg,#ca7345,#ffdeca 16%,#ca7345 21%,#ffdeca 24%,#a14521 27%,#ca7345 36%,#ffdeca 45%,#ffdeca 60%,#ca7345 72%,#ffdeca 80%,#ca7345 84%,#732100)";

  const chipColor =
    gift.giftType === "basic"
      ? silver
      : gift.giftType === "luxurious"
      ? gold
      : bronze;

  return (
    <Card
      sx={{
        padding: "15px",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      <Chip
        label={gift.giftType}
        sx={{
          position: "absolute",
          top: "22px",
          left: "23px",
          background: chipColor,
          color: "black",
          fontWeight: "bold",
          height: "18px",
        }}
      />
      <CardMedia
        component="img"
        height="200"
        src={gift.giftPhoto}
        alt={gift.name}
        sx={{
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant=" h5" fontWeight="500" fontSize="22px">
          {gift.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ApartmentIcon />
          <Typography
            variant=" h5"
            fontWeight="500"
            fontSize="16px"
            sx={{ flexGrow: 1, pl: "0.5rem" }}
          >
            {gift.company}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ pt: "0.5rem" }} component="p">
          Type: {gift.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-evenly", flexWrap: "wrap" }}>
        <Button
          onClick={() => handleDelete(gift._id)}
          sx={{ mt: 1 }}
          variant="outlined"
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>

        <Button
          sx={{ mt: 1 }}
          component={Link}
          to={`./update/${gift._id}`}
          variant="contained"
          color="info"
          startIcon={<Edit />}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
