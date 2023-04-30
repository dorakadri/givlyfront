import { Block, CheckCircle, Delete, Edit } from '@mui/icons-material';
import { Card, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PagesHeaders from '../../componentsDashboard/PagesHeaders';
import myService from '../../servicedash/Service';



export default function DelivererList() {
  const theme = useTheme();
  const [gridRows, setGridRows] = useState([]);

  useEffect(() => {
    myService.GetDeliverer().then((deliverers) => {
      console.log(deliverers);
      setGridRows(deliverers.data);
    });
  }, []);

  function handeldelete(id) {
    myService.DeleteDelivere(id).then(() => {
      setGridRows((prevRows) => prevRows.filter((row) => row._id !== id));
    });
  }

  return (
    <Card style={{ padding: '20px', margin: '20px', boxSizing: 'border-box' }}>
      <PagesHeaders title="DELIVERER LIST" subtitle="Manage Deliverer Profiles And Availability" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#f0f0f0' }}>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Availability</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gridRows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="center">
                  {row.isAvailable ? (
                    <CheckCircle sx={{ color: 'green' }} />
                  ) : (
                    <Block sx={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Modify">
                  <IconButton
  component={Link}
  to={
  `./update/${row._id}`
  }
>
  <Edit />
</IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handeldelete(row._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
