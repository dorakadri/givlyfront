import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
} from "@mui/material";

import React, { useRef, useState } from "react";

import QrReader from "react-qr-reader";
import { updateafterscan } from "../../../../../ReduxB/slices/posts/mainPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Scanqrcode(props) {
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [scanResultFile, setScanResultFile] = useState("");
  const qrRef = useRef(null);
  const dispatch = useDispatch();
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
      if (
        result1.Taker === userAuth._id &&
        result1.Post === props.data._id &&
        result1.Owner === props.data.userId.id
      ) {
        dispatch(updateafterscan(result1));
        setTimeout(() => {
          props.close();
        }, 2000);
    
   
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

      setScanResultWebCam(result);
      if (
        result1.Taker === userAuth._id &&
        result1.Post === props.data._id &&
        result1.Owner === props.data.userId.id
      ) {
        dispatch(updateafterscan(result1));
        setTimeout(() => {
          props.close();
        }, 2000);
      } else {
        console.log("nope");
      }
    }
  };

  return (
    <Container sx={{ mt: "2rem" }}>
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
              <h3>Scanned Code: {scanResultFile}</h3>
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
