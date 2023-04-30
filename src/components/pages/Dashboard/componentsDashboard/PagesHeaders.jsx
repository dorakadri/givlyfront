//hathi n3aytoulha files les page fiha title mte3 page

import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";

export default function PagesHeaders({ title, subtitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.primary.Text}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary.Title}
        sx={{ mb: "10px" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
