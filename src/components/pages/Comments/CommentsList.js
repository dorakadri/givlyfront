
import Moment from "react-moment";
import { deleteCommentAction } from "../../../ReduxB/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";


export default function CommentsList({ comments }) {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const isLoginuser = userAuth?._id;

  //dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"

        mt={5}
   
      >
        <Typography variant="subtitle1" color="textSecondary">
          {comments?.length} Comments
        </Typography>
        {comments?.length <= 0 ? (
          <Typography variant="h6" color="textSecondary">
            No comments
          </Typography>
        ) : (
          comments?.slice().reverse().map((comment) => (
           /*  <Box
              key={comment?._id}
              py={4}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <img
                  src={comment?.user?.profilePhoto}
                  alt=""
                  style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                />
                <Link
                  to={`/profile/${comment?.user?._id}`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    style={{ fontWeight: "bold" }}
                  >
                    {comment?.user?.firstName} {comment?.user?.lastName}
                  </Typography>
                </Link>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment>
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {comment?.description}
              </Typography>
  
              {isLoginuser === comment?.user?._id ? (
                <Box display="flex" alignItems="center" mt={1}>
                 
                  <Button
                    onClick={() => dispatch(deleteCommentAction(comment?._id))}
                    startIcon={<DeleteIcon />}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </Box>
              ) : null}     </Box> */
         
             <Box sx={{ display: 'flex', mt: 2 }}>
             <Avatar sx={{ mr: 2 }}     src={comment?.user?.profilePhoto} alt={comment?.user?.firstName} />
             <Stack>
              <Stack direction={"row"}>    
             <Paper
               sx={{
                 maxWidth: '100%',
                 py: '0.5rem',
                 px: '1rem',
                 borderRadius: '1rem',
                 backgroundColor: '#f0f2f5',
                 wordBreak: 'break-word'
               }}
               elevation={0}
             >
              <Typography sx={{fontWeight: "bold" ,pb:"0.5rem"}}>      {comment?.user?.firstName} {comment?.user?.lastName}</Typography>
               <Typography>   {comment?.description}</Typography>
             </Paper>
             {isLoginuser === comment?.user?._id ? (
             
                 
             <IconButton
               onClick={() => dispatch(deleteCommentAction(comment?._id))}
              size="small"
               color="secondary"
             >
              <DeleteIcon fontSize="small"   />
             </IconButton>
   
         ) : null}
         </Stack>
             <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  ml="1rem"
            
                >
                  <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment>
                </Typography>
                </Stack>
         
              </Box>
       
    
          ))
        )}
      </Box>
     
    </div>
   
  );
}
