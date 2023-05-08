import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../../ReduxB/slices/comments/commentSlices";


import { Box, Button, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postForumId }) => {
 

  //dispatch
  const dispatch = useDispatch();

  //select data from store
  const comment = useSelector((state) => state?.comment);
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        postForumId,
        description: values?.description,
      };
      //dispatch action
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });

  return (
    <Box  >
      {/* Err msg */}
      <Box>
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
      </Box>
      <form onSubmit={formik.handleSubmit} >
        <TextField
         sx={{
        
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px", // add border radius to the outer container of the input element
            borderColor: "#ccc",
            backgroundColor: "#f5f5f5" // set border color
          },
        }}
          multiline
          fullWidth
     
          id="description"
          name="description"
          label="Add New Comment"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
            
                >
              <SendIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    {/*     {loading ? (
          <Button
     
            variant="contained"
            color="default"
            disabled={serverErr}
            startIcon={<CircularProgress size={20} />}
          >
            Loading...
          </Button>
        ) : (
          <Button
            disabled={serverErr}
  
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )} */}
      </form>
    </Box>
  );
};

export default AddComment;
