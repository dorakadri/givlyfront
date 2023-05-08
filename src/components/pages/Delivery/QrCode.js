import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
} from "@mui/material";

import React, { useRef, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import QrReader from "react-qr-reader";

import { useDispatch, useSelector } from "react-redux";
import { updateOwnerAction, updateTakenAction } from "../../../ReduxB/slices/delivery/deliverysSlices";

export default function QrCode(props) {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [alert, setAlert] = useState(false);
  const [scanResultFile, setScanResultFile] = useState("");
  const qrRef = useRef(null);
  const dispatch =useDispatch();
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      const result1 = result.split("_").reduce((acc, curr) => {
        const [key, value] = curr.split("-");
        acc[key] = value;
        return acc;
      }, {});

      setScanResultFile(result);
     
   if (userAuth._id === result1.Owner) {

      dispatch(updateOwnerAction(result1))
      setAlert(true);
  }else
  if (userAuth._id === result1.Taker){
    dispatch(updateTakenAction(result1))
    setAlert(true);
  }

   
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      const result1 = result.split("_").reduce((acc, curr) => {
        const [key, value] = curr.split("-");
        acc[key] = value;
        return acc;
      }, {});

      setScanResultFile(result);
       
   if (userAuth._id === result1.Owner) {

      dispatch(updateOwnerAction(result1))
      setAlert(true);
  }else
  if (userAuth._id === result1.Taker){
    dispatch(updateTakenAction(result1))
    setAlert(true);
  }

   
    }
  };

  return (
    <Container sx={{ mt: "2rem" }}>
      {    alert && <Alert icon={false}
      >
     ❤   Code Scanned successfully  ❤
      </Alert>}
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Button
                mt="2rem"
                mb="2rem"
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan Qr Code
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
        
            </Grid>

            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ mt: "2rem" }}>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
         
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}