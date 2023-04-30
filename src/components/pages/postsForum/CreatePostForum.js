import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createpostAction } from "../../../ReduxB/slices/postsForum/postForumSlices";


import { DropzoneArea } from "material-ui-dropzone";
import { Box, Button, Container, TextField, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";





const useStyles = makeStyles((theme) => ({
 
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem",
 gap:"1rem"
  },
  textField: {
    margin: "2rem",
    
    width: "100%",
  },
  dropzone: {

    color: '#06A696',
    textAlign: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    borderRadius: "20px",
    border: `1px dashed grey`,
    cursor: "pointer",
  },
  button: {
    margin:"1rem",
    padding:"1rem",


    backgroundColor: "#06A696",
  },
}));

//Validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().required("image is required"),
});

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //select store data
  const postForum = useSelector((state) => state?.postForum);
  const { isCreated, loading, appErr, serverErr } = postForum;

  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    onSubmit: (values) => {
      //dispath the action

      const data = {
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      dispatch(createpostAction(data));
    },
    validationSchema: formSchema,
  });
  const classes = useStyles();
  //redirect
  if (isCreated) return navigate("../forum");


  return (
    <Box>
     
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            className={classes.textField}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            className={classes.textField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            multiline
     
          />
          <Container
            className={classes.dropzone}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <DropzoneArea
              acceptedFiles={["image/jpeg", "image/png"]}
              dropzoneText={"Drag and drop an image here or click"}
              error={
                formik.touched.image && Boolean(formik.errors.image)
              }
              onChange={(files) => {
                formik.setFieldValue("image", files[0]);
              }}
            />
          </Container>
          {/* Err msg */}
          <Container className="text-red-500">
            {formik?.touched?.image && formik.errors?.image}

            {appErr || serverErr ? (
              <Typography
                variant="h6"
                color="error"
                align="center"
                sx={{ mt: 2, gridColumn: "span 4" }}
              >
                {serverErr} {appErr}{" "}
              </Typography>
            ) : null}
          </Container>
          <Button
               type="submit"
               variant="contained"
               color="primary"
               size="large"
            className={classes.button}
            disabled={loading || serverErr}
   
            
          >
            {loading ? "Loading please wait..." : "Create"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
