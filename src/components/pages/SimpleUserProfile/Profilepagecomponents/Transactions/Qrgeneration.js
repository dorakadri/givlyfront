import { Box, Button, Typography } from "@mui/material";

import { QRCodeCanvas } from "qrcode.react";
import React, {  useState } from "react";
import {  AiOutlineDownload } from "react-icons/ai";


export default function Qrgeneration(props) {
  const [url2, seturl2] = useState("");

  const generate = () => {
    const toGenerate =
      "Owner-" +
      props.post.userId.id +
      "_Taker-" +
      props.data.id +
      "_Post-" +
      props.post._id;

  
    seturl2(toGenerate);
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={"2rem"}
    >
      <Typography pt="2rem">Generate QrCode</Typography>

      <Button onClick={() => generate()}>
        <AiOutlineDownload />
        generate
      </Button>
      {url2 && (
        <Box>
          <QRCodeCanvas
            value={url2}
            size={300}
            bgColor={"#ffffff"}
            fgColor={"#000"}
            level={"H"}
            includeMargin={false}
            imageSettings={{
              src: props.post.userId.profilePhoto,
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </Box>
      )}
      <Box></Box>
    </Box>
  );
}
