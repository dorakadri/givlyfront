import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userProfileAction } from "../../../ReduxB/slices/users/usersSlices";
import AccountVerificationAlertWarning from "../Navigation/Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../Navigation/Alerts/AccountVerificationSuccessAlert";
import Finalnavbar from "./Finalnavbar";


import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export default function Layout() {
  const store = useSelector((state) => state?.users);
 
  const dispatch = useDispatch();
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  const { profile, userAuth } = store;

  useEffect(() => {
    dispatch(userProfileAction(userAuth._id));
  }, [userAuth._id, dispatch]);
 
  return (
    <Box 
      display={"flex"}
      sx={{ 
     backgroundColor:"#f0f2f5",

     
      }}
    >
   
      <Box flexGrow={1}  >
        <Finalnavbar profileurl={profile?.profilePhoto} />

        {userAuth && !userAuth.isAccountVerified && (
          <AccountVerificationAlertWarning />
        )}
        {loading && <h2 className="text-center">Loading please wait...</h2>}
        {token && <AccountVerificationSuccessAlert />}
        {appErr || serverErr ? (
          <h2 className="text-center text-red-500">
            {serverErr} {appErr}
          </h2>
        ) : null}
         <Outlet />
      </Box>
   
    </Box>
    
  );
}
