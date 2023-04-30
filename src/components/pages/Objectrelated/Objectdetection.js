import React, { useEffect, useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import UploadIcon from '@mui/icons-material/Upload';
import { addPostAction, updatePostAction } from "../../../ReduxB/slices/posts/mainPostsSlice";
import { useNavigate } from "react-router-dom";
const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required(" description is required"),
});
export default function Objectdetection(props) {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imagecloud, setImagecloud] = useState(null);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const imageRef = useRef();
  
  const [selectedValue, setSelectedValue] = useState("");
  const store = useSelector((state) => state?.mainpost);
  
  const {  loading, serverErr, appErr } = store;

console.log(props)
  
  const initialValues = props.data
    ? {
      title:  selectedValue || props.data.title || '',
      description: props.data.description || '',
      postpicture: props.data.postPicture || '',
      location: props.data.location || '',
      isTaken: props.data.isTaken ,
      type:props.data.type || '',
      }
    : {
      title: selectedValue || "",
      description: "",
      postpicture: "",
      location: "tunisia",
      isTaken: false,
      type: props.type || "",
      };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      let url = null;
      if(imagecloud){
       url = await uploadImageToCloudinary(imagecloud);
      }
      else {
        url=props.data.postPicture
      }
    
   
      const v = {
        ...values,
        postPicture: url,
      };
if(props.update){

 dispatch(updatePostAction( {id : props.data._id , post:v} )).then(props.close)
}else{
  console.log(v)
  dispatch(addPostAction(v)).then(navigate('/user/home'))
}
  
    
    },
    validationSchema: validationSchema,
  });
  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("file", imagecloud);
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

  const handleChipClick = (value) => {
    console.log(value);
    setSelectedValue(value);
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      setImagecloud(e.target.files[0]);
    } else {
      setImageURL(null);
    }
  };

  const identify = async () => {
    const results = await model.classify(imageRef.current);

    const classNames = results.map((result) => result.className.split(","));
    const flattenedClassNames = [].concat.apply([], classNames);
    console.log(flattenedClassNames);
    setResults(flattenedClassNames);
  };

  useEffect(() => {

  loadModel();

  
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>

          <Box  display={"flex"} flexDirection={"column"} gap={"1rem"}  >
            <Button component="label" variant="outlined" startIcon={<UploadIcon />}>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                className="uploadInput"
                hidden
                onChange={uploadImage}
              />
              upload your photo
            </Button>

            <div>
              <div>
                {(imageURL || props?.data?.postPicture) && (
                  <img
                    src={imageURL || props?.data?.postPicture}
                    alt="Upload Preview"
                    crossOrigin="anonymous"
                    ref={imageRef}
                    style={{ width: "500px", height: "500px" }}
                  />
                )}
              </div>
              {results.length > 0 &&  (
                <Box sx={{ display: "flex" }}>
                  {results.map((result, index) => (
                    <Box key={index}>
                      <Chip
                        label={result}
                        clickable
                        onClick={() => handleChipClick(result)}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </div>
            
{imageURL &&  (
  <Button onClick={identify} disabled={isModelLoading} variant="outlined">
    Identify Image
  </Button>
)}
          
         
           
            <TextField
              fullWidth
              id="title"
              label=" title"
              placeholder="Wooden table"
              value={formik.values.title}
              onChange={formik.handleChange}
              type="text"
              name="title"
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              
             
            />
            <TextField
                 fullWidth
              id="description"
              
              label=" description"
              placeholder="old wooden table "
              value={formik.values.description}
              onChange={formik.handleChange}
              type="text"
              name="description"
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={formik.touched.description && formik.errors.description}
            />
        
               
                {loading ? (
          <Button
            sx={{ width: "100%", p: "1rem", mt: "0", mb: "2rem" }}
            variant="contained"
            size="large"
            color="error"
            disabled
          >
            Loading....
          </Button>
        ) : (
          <Button
            fullWidth
            type="submit" variant="contained"
            sx={{
              backgroundColor: "primary",
              color: " white",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              mt: "0",
              mb: "2rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "secondary" },
            }}
          >
        {props.update ? "save changes" : "Post"}
          </Button>
  
        )}
           </Box>

    </form>
  );
}
