import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box } from "@mui/system";
import {updateUserAction, userProfileAction} from "../../../ReduxB/slices/users/usersSlices";
const formSchema = Yup.object({
  associationName: Yup.string().required("associationName is required"),
  associationAdress: Yup.string().required("associationAdress is required"),
  associationPhone: Yup.number().required("associationphone is required"),
  email: Yup.string().required("Email is required"),
  profilePhoto: "",
  bio: Yup.string().required("Bio is required"),
});

export default function UpdateProfile() {
  const [image1, setImage1] = useState(null);

  const dispatch = useDispatch();
  const id = useParams();
  const navigate = useNavigate();
  const isnonMobile = useMediaQuery("(min-width :600px)");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    dispatch(userProfileAction(id.id));
  }, [id.id, dispatch]);

  const users = useSelector((state) => state.users);
  const { profile, loading, appErr, serverErr } = users;
console.log(profile);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      associationName: profile?.associationName || "",
      associationAdress: profile?.associationAdress || "",
      associationPhone: profile?.associationPhone || 0,
      email: profile?.email || "",
      profilePhoto: profile?.profilePhoto || "",
      bio: profile?.bio || "",
    },

    onSubmit: async (values) => {
      const url = await uploadImage(image1);
      console.log(values);
      const va = {
        ...values,
        profilePhoto: url,
        firstName:profile.firstName,
        lastName:profile.lastName
      };

 
      dispatch(updateUserAction(va));
      navigate("/association/profile");
    },
    validationSchema: formSchema,
  });
  async function uploadImage() {
    console.log("upload")
    const data = new FormData();
    data.append("file", image1);
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
    console.log("hanfdl imaghe")
    const file = e.target.files[0];
    if (file.size >= 1048576) {
    } else {
      setImage1(file);
    }
  };
  return (
    <Box display="flex" justifyContent="center">
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
        <form onSubmit={formik.handleSubmit}>
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
              src={
                image1 ? URL.createObjectURL(image1) : formik.values.profilePhoto
              }
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
              disabled
              sx={{ gridColumn: "span 2" }}
              id="associationName"
              label="associationName"
              placeholder="foulen ben foulen "
              value={formik.values.associationName}
              onChange={formik.handleChange}
              type="text"
              name="associationName"
              onBlur={formik.handleBlur}
              error={
                formik.touched.associationName && Boolean(formik.errors.associationName)
              }
              helperText={formik.touched.associationName && formik.errors.associationName}
            />
            <TextField
              sx={{ gridColumn: "span 2" }}
              id="associationAdress"
              label="associationAdress"
              disabled
              placeholder="21 Wall Street "
              type="text"
              value={formik.values.associationAdress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.associationAdress && Boolean(formik.errors.associationAdress)}
              helperText={formik.touched.associationAdress && formik.errors.associationAdress}
              name="associationAdress"
            />
            <TextField
                sx={{ gridColumn: "span 2" }}
                id="associationPhone"
                label="associationPhone"
                placeholder="12345678 "
                type="number"
                disabled
                value={formik.values.associationPhone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.associationPhone && Boolean(formik.errors.associationPhone)}
                helperText={formik.touched.associationPhone && formik.errors.associationPhone}
                name="associationPhone"
            />
            <TextField
              sx={{ gridColumn: "span 4" }}
              fullWidth
              id="outlined-basic"
              label="email"
              type="text"
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
              label="Bio"
              value={formik.values.bio}
              type="text"
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
  );
}
