import styled from "@emotion/styled";
import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { MuiTelInput } from "mui-tel-input";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleIcon from "@mui/icons-material/Google";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  Avatar,
  Badge,
  Tooltip,
  LinearProgress,
  InputAdornment,
  Typography,
} from "@mui/material";

import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../../ReduxB/slices/users/usersSlices";
import { Navigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { calculatePasswordStrength } from "../../../shared/calculatePasswordStrength";

const validationSchema = yup.object({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required(" Company Name is required"),
  email: yup.string().required("Type is required"),
  // bio: yup.string().required("Type is required"),
  password: yup
    .string()
    .required("Type is required")
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .test("has-uppercase", "Add at least one uppercase letter", (password) => {
      return /[A-Z]/.test(password);
    })
    .test("has-lowercase", "Add at least one lowercase letter", (password) => {
      return /[a-z]/.test(password);
    })
    .test("has-number", "Add at least one number", (password) => {
      return /\d/.test(password);
    })
    .test(
      "has-special-char",
      "Add at least one special character",
      (password) => {
        return /[!@#$%^&*()_+}{"':;?/>.<,]/.test(password);
      }
    ),
  role: yup.string().required("Type is required"),
  associationName: yup.string(),
  associationAdress: yup.string(),
  associationPhone: yup.string(),
});
export default function RegisterDesign() {
  const googleAuth = () => {
		window.open(
			'https://givly-api.onrender.com/auth/google/callback',
			"_self"
		);
	};
  const [verified, setVerified] = useState(false);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const [role, setRole] = useState("");
  const [phone, setPhone] = React.useState("+216");
  const dispatch = useDispatch();
  const isnonMobile = useMediaQuery("(min-width :600px)");

  const initialValues = {
    firstName:   "",
    lastName:  "",
    email: "",
    password: "",
    bio: "",
    role: "",
    associationName: "",
    associationAdress: "",
    associationPhone: "",
  };
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      const url = await uploadImage(image);

      const v = {
        ...values,
        profilePhoto: url,
        associationPhone: +phone.split(" ").slice(1).join(""),
      };
      console.log(v);
      dispatch(registerUserAction(v));
    },
    validationSchema: validationSchema,
  });
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

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
  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;
  if (registered) {
    return <Navigate to="/login" />;
  }

  const handleChange = (event) => {
    formik.handleChange(event);
    setRole(event.target.value);
  };

  const handleChangePhone = (event) => {
    formik.handleChange(event);
    setPhone(event);
  };


  const progress = calculatePasswordStrength(formik.values.password);

  let progressBarColor;

  if (progress < 33) {
    progressBarColor = "error";
  } else if (progress < 66) {
    progressBarColor = "warning";
  } else {
    progressBarColor = "success";
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Badge
        sx={{ mb: "1rem" }}
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
          src={ image ? URL.createObjectURL(image) : undefined}
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
        gap="1rem"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
      >
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
          id="lastName"
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
          sx={{ gridColumn: "span 2" }}
          fullWidth
          id="email"
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
          sx={{ gridColumn: "span 2" }}
          fullWidth
          id="password"
          type={showPassword ? "text" : "password"}
          label="password"
          placeholder="Enter your password "
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password &&
            formik.errors.password && (
              <span>
                <span style={{ marginRight: "10px" }}>
                  {formik.errors.password}
                </span>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  color={progressBarColor}
                />
              </span>
            )
          }
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl
          error={formik.touched.role && Boolean(formik.errors.role)}
          sx={{ gridColumn: "span 4" }}
        >
          <InputLabel id="demo-simple-select-label"> Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.role}
            onBlur={formik.handleBlur}
            onChange={handleChange}
            label="Role"
            name="role"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            <MenuItem value={"SimpleUser"}>SimpleUser</MenuItem>
            <MenuItem value={"Association"}>Association</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.role && formik.errors.role}
          </FormHelperText>
        </FormControl>
        {role === "Association" && (
          <>
            <TextField
              sx={{ gridColumn: "span 2" }}
              fullWidth
              id="outlined-basic"
              label=" associationName"
              placeholder="The sun"
              variant="outlined"
              value={formik.values.associationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.associationName &&
                Boolean(formik.errors.associationName)
              }
              helperText={
                formik.touched.associationName && formik.errors.associationName
              }
              name="associationName"
            />
            <TextField
              sx={{ gridColumn: "span 2" }}
              fullWidth
              id="outlined-basic"
              label="associationAdress"
              placeholder="Ariana 29 "
              variant="outlined"
              value={formik.values.associationAdress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.associationAdress &&
                Boolean(formik.errors.associationAdress)
              }
              helperText={
                formik.touched.associationAdress &&
                formik.errors.associationAdress
              }
              name="associationAdress"
            />
            <MuiTelInput
              sx={{ gridColumn: "span 4" }}
              fullWidth
              variant="outlined"
              value={phone}
              onChange={handleChangePhone}
              onBlur={formik.handleBlur}
              error={
                formik.touched.associationPhone &&
                Boolean(formik.errors.associationPhone)
              }
              helperText={
                formik.touched.associationPhone &&
                formik.errors.associationPhone
              }
              name="associationPhone"
            />
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ReCAPTCHA
          sitekey="6Lekee4kAAAAAKm9bvcVtM9o4qeDS1hga6FrNaUc"
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        {loading ? (
          <Button
            sx={{ mt: "1rem", width: "100%" }}
            variant="contained"
            size="large"
            color="error"
            disabled
          >
            loading please wait...
          </Button>
        ) : (
          <Button
            sx={{
              mt: "1rem",
              width: "100%",
              backgroundColor: "#06A696",
              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
            variant="contained"
            size="large"
            type="submit"
            disabled={!verified}
          >
            Sign Up
          </Button>
        )}
        <Button
          disabled={!verified}
          onClick={googleAuth}
          sx={{ mt: "1rem", width: "100%" }}
          variant="contained"
          size="large"
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
      </Box>
    </form>
  );
}