import { Avatar, Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import myService from '../servicedash/Service';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import PagesHeaders from '../componentsDashboard/PagesHeaders';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import {
  banUserAction,
  unbanUserAction,
} from "../../../../ReduxB/slices/users/usersSlices";

  
export default function UserListDataGrid() {
   const dispatch = useDispatch();
    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'profilePhoto', headerName: 'Profile Photo', width: 150, renderCell: (params) => <Avatar alt="Profile" src={params.value} sx={{ width: 56, height: 56 }}/> },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'associationName', headerName: 'Association Name', width: 200 },
        { field: 'associationAddress', headerName: 'Association Address', width: 250 },
        { field: 'associationPhone', headerName: 'Association Phone', width: 200 },
        { field: 'isBanned', headerName: 'Is Banned', width: 150, renderCell: (params) => params.value ? 'Yes' : 'No' },
        { field: 'isAccountVerified', headerName: 'Is Account Verified', width: 200, renderCell: (params) => params.value ? 'Yes' : 'No' },
        {
          field: 'action', headerName: 'Action', width: 200, renderCell: (params) => (
            <div>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleBan(params.row)}
                disabled={params.row.isBanned}
              >
                Ban
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => handleUnban(params.row)}
                disabled={!params.row.isBanned}
              >
                Unban
              </Button>
            </div>
          ),
        },
      ];
    const [users, setUsers] = useState([]);
  const store = useSelector( state => state?.users.userAuth.token
    );
    useEffect(() => {
        myService.getalluser(store).then((users) => {
          console.log(users);
          setUsers(users.data);
        });
      }, []);
    const handleBan = (user) => {
      console.log(user);
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, isBanned: true } : u
      );
      setUsers(updatedUsers);
      dispatch(banUserAction(user.id));
    };

    const handleUnban = (user) => {
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, isBanned: false } : u
      );
      setUsers(updatedUsers);
      dispatch(unbanUserAction(user.id));
    };
  return (
    <Card style={{ padding: "20px", margin: "20px", boxSizing: "border-box" }}>
      <PagesHeaders
 
        title="USER LIST"
        subtitle="Review and Manage User Accounts"
      />
      <Box  sx={{ height:700 , width: '100%' }}>
    <DataGrid
      rows={users}
      columns={columns}
      pageSize={7}
      rowsPerPageOptions={[7]}
      disableSelectionOnClick 
      rowHeight={80}
   
    
    />
    </Box>
   </Card>
  )
}
