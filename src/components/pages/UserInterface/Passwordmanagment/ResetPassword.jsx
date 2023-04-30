import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, LinearProgress, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { passwordResetAction } from "../../../../ReduxB/slices/users/usersSlices";
import { calculatePasswordStrength } from "../../../shared/calculatePasswordStrength";
import imagebg from "../LoginAndRegister/hd.jpg";
const formSchema = Yup.object({
  password: Yup.string()
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
});
export default function ResetPassword() {
  const token =  useParams();
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const isnonMobile = useMediaQuery("(min-width :600px)");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      console.log(values)
      const data = {
        password: values?.password,
        token:token?.token,
      };
      console.log(  data);
      dispatch(passwordResetAction(data));
    },
    validationSchema: formSchema,
  });
  const users = useSelector((state) => state?.users);
  const { passwordReset, loading, appErr, serverErr } = users;

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset)  navigate("/login") ;
    }, 5000);
  }, [passwordReset]);
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
  
    <Box  sx={{
      background: `url(${imagebg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box
        p="2rem"
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
    
      {appErr || serverErr ? (
        <h3>
          {serverErr} {appErr}
        </h3>
      ) : null}
      {passwordReset && (
        <Typography>
          Password Reset Successfully. You will be redirected to login in 5
          seconds
        </Typography>
      )}


     
     <form onSubmit={formik.handleSubmit}>
     <Typography variant="body1" color="initial"> Enter Your New Password</Typography>
     <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
      >
        
        <TextField
          sx={{ gridColumn: "span 4" }}
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
              </Box>
      {loading ? (
          <Button
            sx={{  width: "100%",   p: "1rem",  mt:"1rem",
            mb:"2rem", }}
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
          
              mt:"1rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
          >
                Reset Password
          </Button>
        )}
        </form>
        </Box>
        </Box>
  );
}
