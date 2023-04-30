import { Card } from "@mui/material";
import React from "react";
import PagesHeaders from "../componentsDashboard/PagesHeaders";

export default function DashboardComponent() {
  return (
    <Card style={{ padding: "20px", margin: "20px", boxSizing: "border-box" }}>
      <PagesHeaders
        title="DASHBOARD"
        subtitle="Monitor Your Performance and Progress"
      />
      <h1>here we will add some charts</h1>
    </Card>
  );
}
