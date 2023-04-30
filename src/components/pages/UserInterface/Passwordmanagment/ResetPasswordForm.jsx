import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import imagebg from "../LoginAndRegister/hd.jpg";
import { passwordResetTokenAction } from '../../../../ReduxB/slices/users/usersSlices';
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

export default function ResetPasswordForm() {
    const dispatch = useDispatch();
    
  const isnonMobile = useMediaQuery("(min-width :600px)");
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        onSubmit: values => {
    
          dispatch(passwordResetTokenAction(values?.email));
        },
        validationSchema: formSchema,
      });
      const users = useSelector(state => state?.users);
      const { passwordToken, loading, appErr, serverErr } = users;
      console.log(passwordToken)
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
            <Typography>
              {serverErr} {appErr}
            </Typography>
          ) : null}
      {passwordToken && (
            <Typography>
              Email is successfully sent to your email. Verify it within 10
              minutes.
            </Typography>
          )}
       <form   onSubmit={formik.handleSubmit}>
       <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
      >
      <TextField
          sx={{ gridColumn: "span 4",pb:"1rem" }}
          id="name"
          label=" email"
          placeholder="exemple@gmail.com "
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="text"
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
          </Box>
         {loading ? (
          <Button
            sx={{  width: "100%",   p: "1rem",  mt:"0",
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
              mt:"0",
              mb:"2rem",
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
  )
}
