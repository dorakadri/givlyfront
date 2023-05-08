import { Box, Button, Card, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import PagesHeaders from "../componentsDashboard/PagesHeaders";
import StatBox from "../charts/Statbox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../charts/LineChart";
import ProgressCircle from "../charts/pie";
import BarChart from "../charts/barchart";
export default function DashboardComponent() {
 
  return (
    <Card style={{ padding: "20px", margin: "20px", boxSizing: "border-box" }}>
     
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <PagesHeaders
        title="DASHBOARD"
        subtitle="Monitor Your Performance and Progress"
      />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box 
          
          gridColumn="span 3"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color:' #d3d4de', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Transaction"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color:' #d3d4de',  fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color:' #d3d4de', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color:' #d3d4de', fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          p="15px"
        >
       
             <Typography variant="h5" fontWeight="600">
            Ecofriendly Partners
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
          
              sx={{ mt: "15px" }}
            >
             30% of all existing brands are our partners
            </Typography>
    
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
      
            p="15px"
          >
            <Typography  variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
        
              p="15px"
            >
              <Box>
                <Typography
                 
                  variant="h5"
                  fontWeight="600"
                >
                 {transaction.txId}
                </Typography>
                <Typography >
                    {transaction.user}
                </Typography>
              </Box>
              <Box>{transaction.date}</Box>
              <Box
    
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
     
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          borderRadius= "8px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
      
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
             
              >
               User Distribution by City
              </Typography>
         
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
     
       
      </Box>

    </Card>
  );
}

export const mockTransactions = [
  {
    txId: "dorra kadri",
    user: "sarra harguem",
    date: "2023-09-01",
    cost: "ariana",
  },
  {
    txId: "sarra harguem",
    user: "dorra kadri",
    date: "2023-04-01",
    cost: "ariana",
  },
  {
    txId: "chayma mehrzi",
    user: "eya khechine",
    date: "2023-09-01",
    cost: "mourouj",
  },
  {
    txId: "dorra kadri",
    user: "eya khechine",
    date: "2023-11-05",
    cost: "bardo",
  },
  {
    txId: "yacine najar",
    user: "chayma mehrzi",
    date: "2023-11-02",
    cost: "manouba",
  },

];