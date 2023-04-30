
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import {
  fetchPostDetailsAction,
  updatePostAction,
} from "../../../ReduxB/slices/postsForum/postForumSlices";


import { Box } from "@mui/material";
import Navbar from "../AssociationUserProfile/Navbar";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  dropzone: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px dashed ${theme.palette.text.secondary}`,
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1, 3),

    backgroundColor: "#06A696",
  },
}));

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
 
});

export default function UpdatePostForum(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  //Fetch the post in the url
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);
  //selet post
  const postData = useSelector((state) => state.postForum);
  const { postDetails } = postData;

  //select updated post from store;
  const postUpdate = useSelector((state) => state.postForum);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title || "",
      description: postDetails?.description || "",
      image: postDetails?.image || "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        image: values.image,
        id,
      };
      dispatch(updatePostAction(data));
    },
    validationSchema: formSchema,
  });
  const classes = useStyles();

  if (isUpdated) return navigate("../forum");

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
              error={formik.touched.image && Boolean(formik.errors.image)}
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
            {loading ? "Loading please wait..." : "update"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
