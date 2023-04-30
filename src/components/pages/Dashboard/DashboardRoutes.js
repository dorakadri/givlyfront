import React, { lazy, Suspense, useMemo } from "react";
import {
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";
import DelivererUpdate from "./PagesDashboard/Deliverer/DelivererUpdate";
import UserListDataGrid from "./PagesDashboard/UserListDataGrid";
import UpdateProfile from "./PagesDashboard/UpdateProfile"

const DashboardComponent = lazy(() =>
  import("./PagesDashboard/DashboardComponent")
);
const Layout = lazy(() => import("./PagesDashboard/Layout"));

const DelivererList = lazy(() =>
  import("./PagesDashboard/Deliverer/DelivererList")
);
const AddDeliverer = lazy(() =>
  import("./PagesDashboard/Deliverer/AddDeliverer")
);
const GiftList = lazy(() => import("./PagesDashboard/Gift/GiftList"));
const AddGift = lazy(() => import("./PagesDashboard/Gift/AddGift"));
const GiftUpdate = lazy(() => import("./PagesDashboard/Gift/GiftUpdate"));

function DashboardRoutes() {
  const mode = useSelector((state) => state.dashboard.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="index">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardComponent />} />
              <Route path="userslist" element={<UserListDataGrid />} />
              <Route path="delivererlist" element={<DelivererList />} />
              <Route path="adddeliverer" element={<AddDeliverer />} />
              <Route
                path="delivererlist/update/:id"
                element={<DelivererUpdate />}
              />
              <Route path="giftlist" element={<GiftList />} />
              <Route path="giftlist/update/:id" element={<GiftUpdate />} />
              <Route exact path="/update/:id" element={<UpdateProfile />} />
              <Route path="addgift" element={<AddGift />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default DashboardRoutes;
