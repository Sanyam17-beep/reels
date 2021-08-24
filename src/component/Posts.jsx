import React ,{useEffect, useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Dialog from '@material-ui/core/Dialog';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Ticker from 'react-ticker';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {database} from '../firebase';

import AddComment from "./AddComment";
import Comments from "./Comments";
import Likes from "./Likes";
import Likes2 from "./Likes2";
import Video from "./Video";

import "./Posts.css";

function Posts({ userData = null }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e',
      cursor:'pointer'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'auto'
    },
    seeComments:{
      height:'54vh',
      overflowY:'auto'
    },
    ci:{
    
      color: 'white',
      left:'9%',
      cursor:'pointer'
    },
    mn:{
      color:'white',
    },
    tmn:{
      color:'white'
    }
  }));

  let classes = useStyles();
  // const { signOut, currentUser } = useContext(AuthContext);
  const [posts, setVideos] = useState([]);
  const [openId, setOpenId] = useState(null);
  const handleClickOpen = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };
  useEffect(async () => {
    let unsub = await database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        let videos = snapshot.docs.map((doc) => doc.data());
        let videosArr = [];
        for (let i = 0; i < videos.length; i++) {
          let videoUrl = videos[i].url;
          let auid = videos[i].auid;
          let likes = videos[i].likes;
          let comments = videos[i].comments;
          
          let id = snapshot.docs[i].id;
          let userObject = await database.users.doc(auid).get();
          let userProfileUrl = userObject.data().photoURL;
          let username = userObject.data().username;
          
          videosArr.push({
            videoUrl,
            userProfileUrl,
            username,
            pid: id,
            likes,
            comments
          });
        }
        setVideos(videosArr);
      });
    return unsub;
  }, []);
  return (
    
    <>
      <div className='place'></div>
      {userData === null || posts === [] 
      ?  <CircularProgress className={classes.loader} /> 

      : <div className='videoContainer' id="videoContainer"> 
      {posts.map((post, index) => {
          return (
            <div>
              <div className="videos">
                <Video source={post.videoUrl} id={post.pid} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar src={post.userProfileUrl} />
                  <h4>{post.username}</h4>
                </div>
                <div className="videoTicker">
                  <Ticker direction="toRight" offset="20%" mode="smooth">
                    {({ index }) => (
                      <>
                        <Typography
                          align="center"
                          variant="subtitle2"
                          className={classes.tmn}
                        >
                          <MusicNoteIcon
                            fontSize="small"
                            className={classes.mn}
                          />{" "}
                          This is sample
                        </Typography>
                      </>
                    )}
                  </Ticker>
                </div>
                <Likes userData={userData} postData={post} />
                <ChatBubbleIcon
                  onClick={() => handleClickOpen(post.pid)}
                  className={`${classes.ci} icon-styling`}
                />
                <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pid}>
                  <MuiDialogContent>
                    <div className="dContainer">
                      <div className="video-part">
                        <video
                          autoPlay={true}
                          className="video-styles2"
                          type="video/mp4"
                          controls
                          id={post.id}
                          muted="muted"
                        >
                          <source src={post.videoUrl} type="video/webm" />
                        </video>
                      </div>
                      <div className="infoContainer">
                        <Card>
                          <CardHeader
                            avatar={
                              <Avatar
                                src={post?.userProfileUrl}
                                aria-label="recipe"
                                className={classes.avatar}
                              ></Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={post?.username}
                          />
                          <hr
                            style={{
                              border: "none",
                              height: "1px",
                              color: "#dfe6e9",
                              backgroundColor: "#dfe6e9",
                            }}
                          />
                          <CardContent className={classes.seeComments}>
                            <Comments userData={userData} postData={post} />
                          </CardContent>
                        </Card>
                        <div className="extra">
                          <div className="likes">
                                <Likes2 userData={userData} postData={post} />
                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : `${post.likes.length}`}</Typography>
                          </div>
                            <AddComment  userData={userData} postData={post}/> 
                        </div>
                      </div>
                    </div>
                  </MuiDialogContent>
                </Dialog>
              </div>

            </div>
          );
          <div className='place'></div>
        })}
        </div>
      }
    </>
  );
}

export default Posts;
