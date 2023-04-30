import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import { updateUserAction, userProfileAction } from '../../../../ReduxB/slices/users/usersSlices';
import Typography from '@mui/material/Typography'
import { Avatar, Badge, Button, IconButton, TextField, Tooltip, useMediaQuery } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box } from '@mui/system';
const formSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    profilePhoto:"",
    bio: Yup.string().required("Bio is required"),
  });
  
export default function UpdateProfile() {
  const [image, setImage] = useState(null);
  const isnonMobile = useMediaQuery("(min-width :600px)");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

    const dispatch = useDispatch();
    const id =useParams();


    //fetch user profile
    useEffect(() => {
      dispatch(userProfileAction(id.id));
    }, [id.id, dispatch]);
  
    //User data from store
    const users = useSelector(state => state.users);
    const { profile, loading, appErr, serverErr } = users;
console.log(profile)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstName:  profile?.firstName || '',
          lastName:  profile?.lastName || '',
          email:  profile?.email || '',
          profilePhoto:profile?.profilePhoto || '',
          bio:  profile?.bio || '',
        },
   
    
         
        onSubmit:async values => {
          console.log(values);
          const url = await uploadImage(image);
          const v = {
            ...values,
            profilePhoto: url,
           
          };
          console.log(v)
          dispatch(updateUserAction(v));
        },
        validationSchema: formSchema,
      });
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
     
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
        } else {
          setImage(file);
        }
      };
  return (
    <Box display="flex" justifyContent="center" alignContent="center">
  <Box
        p="1rem"
        mt="1rem"
        borderRadius="1.5rem"
        width={isNonMobileScreen ? "30%" : "80%"}
        textAlign="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          boxShadow:
            "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "2rem" }}
        >
          Account settings !
        </Typography>
 <form  onSubmit={formik.handleSubmit}>
 <Badge
  sx={{ mb: "2rem" }}
  overlap="circular"
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  badgeContent={
    <Tooltip title="Upload Picture">
      <IconButton component="label">
        <input hidden type="file" onChange={handleImageChange} />
        <CameraAltIcon sx={{ color: "#3aaca2" }} />
      </IconButton>
    </Tooltip>
  }
>
  <Avatar
    alt="Profile pic"
    src={image ? URL.createObjectURL(image) : formik.values.profilePhoto}
    sx={{
      width: "8rem",
      height: "8rem",
      borderRadius: "100%",
      alignSelf: "center",
    }}
  />
</Badge>
 <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
          >
            {appErr || serverErr ? (
              <Typography
                Typography
                variant="h6"
                color="error"
                align="center"
                sx={{ mt: 2, gridColumn: "span 4" }}
              >
                {serverErr} {appErr}{" "}
              </Typography>
            ) : null}  
 <TextField
          fullWidth
          sx={{ gridColumn: "span 2" }}
          id="name"
          label=" firstName"
          placeholder="Jhon "
          value={formik.values.firstName}
          onChange={formik.handleChange}
          type="text"
          name="firstName"
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
  <TextField
          sx={{ gridColumn: "span 2" }}
          id="outlined-basic"
          label="lastName"
          placeholder="Doe "
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          name="lastName"
        />  
         <TextField
        sx={{ gridColumn: "span 4" }}
        fullWidth
        id="outlined-basic"
        label="email"
        placeholder="exemple@gmail.com"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        name="email"
      />
               
               <TextField
               sx={{ gridColumn: "span 4" }}
          id="filled-multiline-flexible"
          label="Multiline"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          multiline
          maxRows={4}
          name="bio"
          variant="outlined"
        />


<Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gridColumn: "span 4",
                alignItems: "center",
                m: "1rem auto",
              }}
            >
   <Button
          sx={{
            mt: "2rem",
            width: "100%",
            backgroundColor: "#06A696",
            "&:hover": { color: "black", backgroundColor: "#06A696" },
          }}
          variant="contained"
          size="large"
          type="submit"
        >
          Save changes
          </Button>
            </Box>
          </Box>
      
        </form>
      </Box>
      </Box>
  
  )
}
