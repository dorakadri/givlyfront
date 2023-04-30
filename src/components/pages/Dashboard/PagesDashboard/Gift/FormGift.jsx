import React, { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { PhotoCamera } from "@mui/icons-material";
import myService from "../../servicedash/Service";
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  company: yup.string().required(" Company Name is required"),
  type: yup.string().required("Type is required"),
  giftPhoto: "",
  giftType: yup.string().required("Type is required"),
});

export default function FormGift(props) {
  const [image, setImage] = useState(null);
const navigate=useNavigate();
  

  const initialValues = props.data
    ? {
        name: props.data.name || '',
        company: props.data.company || '',
        type: props.data.type || '',
        giftPhoto: props.data.giftPhoto || '',
        giftType: props.data.giftType || '',
      }
    : {
        name: "",
        company: "",
        type: "",
        giftPhoto: "",
        giftType: "",
      };
      async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "aup1uxxk");
        try {
          let res = await fetch(
            "https://api.cloudinary.com/v1_1/dbgphvyf9/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          const urlData = await res.json();
          console.log(urlData);
          return urlData.url;
        } catch (error) {
          console.log(error);
        }
      }
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
   
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const url = await uploadImage(image);
      const v = {
        ...values,
        giftPhoto: url,
      
      };

    if (props.update) {

  myService.update(props.data._id, v)
    .then((response) => {
      console.log(response)
   
    })
    .catch((error) => {
    });
} else {
  myService.postData(v)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    });

  }

     navigate("/admin/giftlist");
    },
    validationSchema: validationSchema,
  });


  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ gap: 3 }}>
            <Typography variant="h6">Name :</Typography>
            <TextField
              fullWidth
              sx={{ mt: 2, pb: "1rem" }}
              id="name"
              label="Name"
              placeholder="Biodegradable plate set "
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              name="name"
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Typography variant="h6">Company Name :</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="Company Name"
              placeholder="Eastman "
              variant="outlined"
              value={formik.values.company}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
              name="company"
            />
            <Typography variant="h6">Type :</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="Type"
              placeholder="Biodegradable  "
              variant="outlined"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              name="type"
            />

            <Typography variant="h6">Gift Type :</Typography>
            <FormControl
              fullWidth
              error={formik.touched.giftType && Boolean(formik.errors.giftType)}
              sx={{ mt: 2, pb: "1rem" }}
            >
              <InputLabel id="demo-simple-select-label"> Gift Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.giftType}
                onBlur={formik.handleBlur}
                label="Gift Type"
                onChange={formik.handleChange}
                name="giftType"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"luxurious"}>luxurious</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"basic"}>Basic</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.giftType && formik.errors.giftType}
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid grey",
              borderRadius: "5px",

              p: "1rem",
              height: "100%",
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden type="file" onChange={handleImageChange} />
              <PhotoCamera />
            </IconButton>
            {!image ? (
              <div>
                {formik.values.giftPhoto !== "" ? (
                  <Paper style={{ width: 200, height: 200 }}>
                    <img
                      src={formik.values.giftPhoto}
                      alt="selected"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                    />
                  </Paper>
                ) : (
                  <Typography>Upload the gift image</Typography>
                )}
              </div>
            ) : (
              <Paper style={{ width: 200, height: 200 }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pb: "2rem" }}>
        <Button
  sx={{ mt: "2rem", width: "100%" }}
  variant="contained"
  size="large"
  color="success"
  type="submit"
>
  {props.update ? "Update a gift" : "Add a gift"}
</Button>
        </Grid>
       
        
    
      </Grid>
    </form>
  );
}
