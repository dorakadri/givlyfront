import React, { useState, useContext, useEffect } from "react";
import * as yup from "yup";
import { Field, Form, Formik, useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../../ReduxB/slices/users/usersSlices";
import { Navigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
// chat 
import { AppContext } from "../../../../context/appContext";
import { updateuserlocation } from "../../../../ReduxB/slices/delivery/deliverysSlices";
const validationSchema = yup.object({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required(" password is required"),
});
export default function Loginform() {
  const [showPassword, setShowPassword] = useState(false);

  const isnonMobile = useMediaQuery("(min-width :600px)");
  const dispatch = useDispatch();




  const initialValues = {
    email: "",
    password: "",
  };
const { socket } = useContext(AppContext);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
        socket.emit("new-user");
      dispatch(loginUserAction(values))

    },
    validationSchema: validationSchema,
  });
  const store = useSelector((state) => state?.users);

  const { userAuth, loading, serverErr, appErr } = store;
  
  if (userAuth) {
    if (userAuth?.role === "Admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    if (userAuth?.role === "SimpleUser") {
      return <Navigate to="/user/home" />;
    }
    if (userAuth?.role === "Association") {
      return <Navigate to="/association/forum" />;
    }
    if (userAuth?.role === "Livreur") {
      return <Navigate to="/livreur/homeLiv" />;
    }

    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="grid"
        gap="30px"
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
          sx={{ gridColumn: "span 4" }}
          id="name"
          label=" email"
          placeholder="exemple@gmail.com "
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="text"
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          sx={{ gridColumn: "span 4" }}
          type={showPassword ? "text" : "password"}
          id="outlined-basic"
          label="password"
          placeholder="password "
          variant="filled"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
      </Box>
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
        <FormControlLabel control={<Checkbox />} label="Remember Me" />

        <Typography
          sx={{
            fontStyle: "italic",
            color: "grey",
            "&:hover": {
              cursor: "pointer",
              color: "green",
            },
          }}
        >
          <Link to="/password-reset-token" style={{ textDecoration: "none" }}>
            forget password ?
          </Link>
        </Typography>
      </Box>
      <Box>
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
            type="submit"
            sx={{
              backgroundColor: "#06A696",
              color: " white",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              mt: "0",
              mb: "2rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
          >
            LOGIN
          </Button>
        )}
      </Box>
    </form>
  );
}
