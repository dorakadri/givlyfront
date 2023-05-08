import * as React from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Pagination, PaginationItem, Stack, styled, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {  deliverylivgetAction } from '../../ReduxB/slices/delivery/deliverysSlices';
import Qrgeneratisarra from './Delivery/Qrgeneratisarra';
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,

    "& .MuiPaginationItem-root": {
        borderRadius: 1
    }
}));
function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            sx={{ pr: "1rem", border: 0 }}
            color="primary"

            shape="rounded"
            page={page + 1}
            count={pageCount}

            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}



export default function Table() {

   


    const selector = useSelector((state) => state?.delivery.allLivdeliveries)
    const dispatch = useDispatch();
     const navigate=useNavigate();
const [dataa,setData]=React.useState({})


const [open1, setOpen1] = React.useState(false);
const [postdata, setPostdata] = React.useState();
const handleClose1 = () => {
    setOpen1(false);
  };
    React.useEffect(() => {
        dispatch(deliverylivgetAction())
setData(selector );

    }, [])



   function Tracking(e){
    setPostdata(e)


    setOpen1(true);
       // navigate(`../detaildelivery/${e._id}`)

       
    }


 
    const columns =
        [ {
            field: 'Post', headerName: 'Post', width: 400, flex: 1, headerClassName: 'super-app-theme--header', renderCell: (params) => {
                return (



                    <Stack direction={"row"} alignItems="center" gap={1}
                    >
                        <Avatar
                            alt="Society logo "
                            src={params.row.Postpic}
                            sx={{ width: 33, height: 33 }}
                        />
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }} >
                            {params.value}
                        </Typography>
                    </Stack>
                );
            }
        },
        {
            field: 'User', headerName: 'User', width: 400, flex: 1, headerClassName: 'super-app-theme--header', renderCell: (params) => {
                return (



                    <Stack direction={"row"} alignItems="center" gap={1}
                    >
                        <Avatar
                            alt="Society logo "
                            src={params.row.UserPhoto}
                            sx={{ width: 33, height: 33 }}
                        />
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }} >
                            {params.value}
                        </Typography>
                    </Stack>
                );
            }
        },
        {
            field: 'Owner', headerName: 'Owner', width: 400, flex: 1, headerClassName: 'super-app-theme--header', renderCell: (params) => {
                return (



                    <Stack direction={"row"} alignItems="center" gap={1}
                    >
                        <Avatar
                            alt="Society logo "
                            src={params.row.OwnerPhoto}
                            sx={{ width: 33, height: 33 }}
                        />
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }} >
                            {params.value}
                        </Typography>
                    </Stack>
                );
            }
        },
        { field: 'DeliveryMenname', headerName: 'DeliveryMen name', flex: 1, width: 300 },
        {
            field: 'DeliveryMenPhone',
            headerName: 'DeliveryMen Phone',
            width: 400,
            flex: 1
        },
        {
            field: 'Date',
            headerName: 'Creation Date',
            width: 200,
            flex: 1


        },
        {
            field: 'DeliveryDate',
            headerName: 'Delivery Date',
            width: 200,
            flex: 1


        },
        {
            field: 'Status', headerName: 'Status', width: 400, flex: 1, headerClassName: 'super-app-theme--header', renderCell: (params) => {
                return (



                        <Chip label={params.value} />
              
                );
            }
        },
        {
            field: 'QrCode', headerName: 'QrCode', width: 400, flex: 1,
             headerClassName: 'super-app-theme--header', renderCell: (params) => {
                return (



                        <button onClick={()=>Tracking(params.value)}> generateQrCode</button>
              
                );
            }
        },


     
        ];



    
        const rows = selector?.map((data) => {
            return {
                id:data._id,
                Post: data.post.title ,
                Postpic: data.post.postPicture,
                User: `${data.user.firstName} ${data.user.lastName}`,
                UserPhoto: data.user.profilePhoto,
                Owner: data.post.userId.firstName,
                OwnerPhoto: data.post.userId.profilePhoto,
                DeliveryMenname: data.deliveryMen.firstName,
                DeliveryMenPhone: data.deliveryMen.phone,
                Date: data.date.substring(0, 10),
                DeliveryDate:data.dateLivraison.substring(0, 10),
                Status: data.state,
                QrCode:data
              
            };
        })

   

    

    return (
        <div style={{ height: 800, width: "100%" }}>

           {selector && <StyledDataGrid columns={columns} rows={rows}
                fit-content
                pageSize={9}
                rowsPerPageOptions={[9]}
                components={{
                    Pagination: CustomPagination,
                }}
                rowHeight={69}
                disableColumnMenu
                sx={{
                    padding: "2rem",
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "rgba(249, 250, 252, 1)",
                        "& .super-app-theme--header": {
                            paddingLeft: "2rem"
                        }
                    }
                }} />}


<Dialog open={open1} onClose={handleClose1}  fullWidth={true}    maxWidth={false} >
      <Box sx={{display: "flex", justifyContent: "center",pr:"1rem",pl:"3rem" ,alignItems: "center"}}>
 
    <DialogTitle sx={{flex: 1, textAlign: "center" }}>qr code </DialogTitle>


    <IconButton onClick={handleClose1}>
      <CloseOutlinedIcon/>
    </IconButton>

</Box>
   
        <Divider/>
        <DialogContent  sx={{height: "800px" }}>
        <Qrgeneratisarra data={postdata}  />
        </DialogContent>
  
      </Dialog>


        </div>
    );
}
