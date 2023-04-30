import React, { useContext, useEffect, useRef, useState } from "react";
//import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
//import "./MessageForm.css";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextField, Button, Grid, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
function MessageForm() {
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.users);
  const userINFOO=user.profile ;
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log(messages);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, userINFOO, time, todayDate);
    setMessage("");
  }
  // design
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    messagesOutput: {
      height: "80vh",
      border: "1px solid lightgray",
      overflowY: "scroll",
      marginBottom: "20px",
    },
    messageInner: {
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      minWidth: "200px",
      maxWidth: "90%",
      textAlign: "left",
      minHeight: "80px",
      fontFamily: "sans-serif",
      fontSize: "1em",
      fontWeight: 400,
      display: "inline-block",
      borderRadius: "10px",
      backgroundColor: "#d1e7dd",
    },
    incomingMessage: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "20px",
    },
    incomingMessageInner: {
      backgroundColor: "#ffdab9",
    },
    messageTimestampLeft: {
      fontSize: "0.85em",
      fontWeight: 300,
      marginTop: "10px",
    },
    messageSender: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    messageDateIndicator: {
      width: "150px",
      margin: "0 auto",
    },
    conversationInfo: {
      padding: 0,
      margin: "0 auto",
      textAlign: "center",
      height: "100px",
    },
    conversationProfilePic: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      margin: "10px auto",
      marginBottom: "30px",
      borderRadius: "50%",
      marginLeft: "10px",
      justifyContent: "flex-center",
    },
    infoAlert: {
      backgroundColor: "#e7f0fa",
      color: "#31708f",
      padding: "10px",
      borderLeft: "5px solid #8ec6f7",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <div className={classes.messagesOutput}>
        {user && !privateMemberMsg?._id && (
          <Paper elevation={1} className={classes.infoAlert}>
            You are in the {currentRoom} room
          </Paper>
        )}
        {userInfo && privateMemberMsg?._id && (
          <>
            <Paper
              elevation={5}
              className={`${classes.conversationInfo} ${classes.infoAlert}`}
            >
              {" "}
              <div> Your conversation with {privateMemberMsg.firstName}</div>
              <img
              alt="urphoto"
                src={privateMemberMsg.profilePhoto}
                className={classes.conversationProfilePic}
              />
            </Paper>
          </>
        )}
        {!userInfo && <Paper className={classes.infoAlert}>Please login</Paper>}

        {userInfo &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p
                className={`${classes.messageDateIndicator} ${classes.infoAlert}`}
              >
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === userINFOO?.email
                        ? message
                        : classes.incomingMessage
                    }
                    key={msgIdx}
                  >
                    <div className={classes.messageInner}>
                      <Grid
                        container
                        alignItems="center"
                        sx={{ marginBottom: theme.spacing(3) }}
                      >
                        {sender._id === userINFOO?._id ? (
                          <Avatar src={userINFOO?.profilePhoto} />
                        ) : (
                          <Avatar src={sender?.profilePhoto} />
                        )}
                        <p className={classes.messageSender}>
                          {sender._id === userINFOO?._id
                            ? "You"
                            : sender.firstName}
                        </p>
                      </Grid>
                      <p>{content}</p>
                      <p className={classes.messageTimestampLeft}>{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={11}>
            <TextField
              fullWidth
              label="Your message"
              disabled={!userInfo}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item md={1}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ backgroundColor: "green", color: "white" }}
              disabled={!userInfo}
              endIcon={<SendIcon />}
            ></Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default MessageForm;
