import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";
import { Box, display, Stack, width } from "@mui/system";
import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";

const StyledBox = styled(Box)({
  height: "100vh",
  scrollSnapAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media only screen and (max-width:771px)": {
    height: "200vh",
    paddingTop: "400px",
  },
});

const Right = styled(Box)({
  flex: "3",

  height: "100%",
  width: "100%",

  "@media only screen and (max-width: 758px)": {
    flex: "1",
  },
});
const Left = styled(Box)({
  flex: 2,
  display: "flex",
  paddingLeft: "5rem",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px", // reduce the gap between items
  "@media only screen and (max-width: 758px)": {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    paddingLeft: "0",
  },
});
const Section = styled(Box)({
  height: "100vh",
  marginInline: "",
  scrollSnapAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  paddingX: "4rem",

  "@media only screen and (max-width: 768px)": {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Aboutus() {
  return (
    <StyledBox>
      <Section>
        <Left>
          <Typography variant="h2" sx={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
            {" "}
            ABOUT US{" "}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            {" "}
            Who we are{" "}
          </Typography>
          <Typography variant="body2">
            we are the valkyries : a team of students working together to find
            innovative solutions to social issues within local and international
            communities contribiuting to achieving the UN suistainable
            development goals
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            {" "}
            What we Do{" "}
          </Typography>
          <Typography variant="body2">
          we are a community of students ,academic and business leaders who strive to use the power of our knowledge and out entrepreuneurial spirit to improve lives and shape a more sustainable world
          </Typography>
        </Left>

        <Right>
          <Spline scene="https://prod.spline.design/TABIk2vBmHUsMcg0/scene.splinecode" />
        </Right>
      </Section>
    </StyledBox>
  );
}
