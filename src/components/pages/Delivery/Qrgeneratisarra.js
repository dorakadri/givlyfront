
import { Box, Button, Typography } from "@mui/material";

import { QRCodeCanvas } from "qrcode.react";
import React, {  useState } from "react";
import {  AiOutlineDownload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { transactionAction } from "../../../ReduxB/slices/delivery/deliverysSlices";
export default function Qrgeneratisarra(props) {
    const [url2, seturl2] = useState("");
    const dispatch = useDispatch();

const generate = () => {
  const toGenerate = "Owner-" + props.data.post.userId.id + "_Taker-" + props.data.user.id + "_Post-" + props.data.post._id +"_Delivery-" + props.data._id;


  seturl2( toGenerate )
  
dispatch(transactionAction(props.data._id))
  
  };

  
return (
<Box  display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"2rem"} >

  <Typography pt="2rem" >Generate QrCode</Typography>


<Button
    onClick={() => generate()}
  >
    <AiOutlineDownload />
    generate
  </Button>
{ url2 &&  <Box sx={{ border:"thick double #32a1ce;"}} >
  <QRCodeCanvas
    value={url2}
    size={300}
    bgColor={"#ffffff"}
    fgColor={"#000"}
    level={"H"}
    includeMargin={false}
    imageSettings={{
      src:  props.data.post.userId.profilePhoto,
      x: undefined,
      y: undefined,
      height: 40,
      width: 40,
      excavate: true,
    }}
  />
</Box>}
<Box>
</Box>

</Box>
)
}
