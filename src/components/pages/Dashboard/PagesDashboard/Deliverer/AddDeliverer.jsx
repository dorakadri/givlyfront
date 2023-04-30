import { Box, Card } from "@mui/material";

import { Field, Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import myService from "../../servicedash/Service";
import PagesHeaders from "../../componentsDashboard/PagesHeaders";
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  isAvailable: yup.boolean().required("Availability is required"),
  phone:yup.string().required("phone is required")
});
export default function AddDeliverer() {
  const [phone, setphone] = useState("+216");
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      isAvailable: "",
      phone:"",
    
    },
    onSubmit:  (values) => {

      const v = {
        ...values,
        phone: +phone.split(" ").slice(1).join(""),
      };
      console.log(v)
    myService.Add(v)
    .then((response) => {
      navigate("/admin/delivererlist")
    })
    .catch((error) => {
      console.log(error)
    });
  
    },

    validationSchema: validationSchema,
  });

  const handleChangephone = (event) => {
    formik.handleChange(event);
    console.log(event)
    formik.setFieldValue("phone",event)
    setphone(event);
  };
  return (
    <Card style={{ padding: "20px", margin: "20px", boxSizing: "border-box" }}>
      <PagesHeaders
        title="ADD DELIVERER"
        subtitle="Add a New Delivery Partner to Your Network"
      />
      <Box
        sx={{
         
          padding: "24px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
      
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={3}>
          <Typography variant="h6">First Name:</Typography>
            <TextField
            
              id="firstName"
              label="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              type="text"
              name="firstName"
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

             <Typography variant="h6">Availability :</Typography>
            <FormControl
              fullWidth
             
              error={
                formik.touched.isAvailable && Boolean(formik.errors.isAvailable)
              }
            >
              <InputLabel id="demo-simple-select-label"> Availability</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.isAvailable}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Availability"
                name="isAvailable"
              >
                <MenuItem value={true}>Available</MenuItem>
                <MenuItem value={false}>Not Available</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.isAvailable && formik.errors.isAvailable}
              </FormHelperText>
            </FormControl>
            <Typography variant="h6">phone Number:</Typography>
       
                   <MuiTelInput
              sx={{ gridColumn: "span 4" }}
              fullWidth
              variant="outlined"
              value={phone}
              onChange={handleChangephone}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phone &&
                Boolean(formik.errors.phone)
              }
              helperText={
                formik.touched.phone &&
                formik.errors.phone
              }
              name="phone"
              inputProps={{ maxLength: 15 }}
            />
            <Button
              /* onClick={() => }*/ sx={{
                marginTop: "24px",
                backgroundColor: "#28a745",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
              variant="contained"
              /*color="primary"*/ type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Card>
  );
}
