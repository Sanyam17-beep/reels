import React, { useState, useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import "./Profile.css";

import Header from "./Header";
// import Likes from "./Likes";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { database } from "../firebase";
import Likes2 from "./Likes2";

function Profile() {
  const useStyles = makeStyles({
    bavatar: {
      height: "23vh",
      width: "40%",
      margin: "0",
    },
    tfw: {
      fontWeight: "300",
    },
    tfw2: {
      fontWeight: "500",
      marginLeft: "2%",
    },
    seeComments: {
      height: "54vh",
      overflowY: "auto",
    },
  });

  let classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [posts, setPostData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [commentData, setComment] = useState({});
  
  let { id } = useParams();

  const handleVideoClick = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };

  useEffect(() => {
    if (posts !== null & commentData !== null){
      let indexOfTobeUpdated = posts.findIndex((post)=>{
        return post.id === commentData.id;
      }) 
      console.log(indexOfTobeUpdated);
      let postTobeUpdated =  posts[indexOfTobeUpdated];
      postTobeUpdated.comments = [...postTobeUpdated.comments, commentData.text];

      let postData = [...posts, postTobeUpdated];
      setPostData(postData);
    }
  }, [commentData]);

  useEffect(() => {
    const getUserdata = async () => {
      let data = await database.users.doc(id).get();
      setUserData(data.data());
    };
    getUserdata();
  }, [id]);

  useEffect(() => {
    let postData = [];
    const getPostdata = async () => {
      for (let i = 0; i < userData.postIds.length; i++) {
        let pid = userData.postIds[i];
        let data = await database.posts.doc(pid).get();
        data = data.data();

        let userObject = await database.users.doc(data.auid).get();

        let userProfileUrl = userObject.data().photoURL;
        let username = userObject.data().username;
        postData.push({ ...data, pid, userProfileUrl, username });
      }
      setPostData(postData);
    };
    if (userData !== null) {
      getPostdata();
    }
  }, [userData]);


  return (
    <>
      {userData === null || posts === null ? (
        <CircularProgress></CircularProgress>
      ) : (
        <>
          <Header userData={userData} />
          <div className="spacer" />
          <div className="pg-container">
            <div className="upper-part">
              <div className="bimg">
                <img src={userData?.photoURL} />
              </div>
              <div className="info">
                <Typography align="center" variant="h6" className={classes.tfw}>
                  {userData?.username}
                </Typography>
              </div>
              <div className="post-cal">
                <Typography
                  display="inline"
                  align="center"
                  variant="subtitle1"
                  className={classes.tfw2}
                >
                  {userData?.postIds?.length} posts
                </Typography>
              </div>
              {/* <div className="post-cal">
                                <Typography display='inline' variant='subtitle1' align="center" className={classes.tfw}>
                                    Email
                                </Typography>
                                <Typography display='inline' variant='subtitle1' align="center" className={classes.tfw2}>
                                    {userData?.email}
                                </Typography>
                            </div> */}
            </div>
            <div className="uposts">
              {
                <div>
                  {posts.map((post, index) => {
                    return (
                      <div key={index}>
                        <video
                          src={post.url}
                          className="u-video"
                          onClick={() => handleVideoClick(post.pid)}
                        />
                        <Dialog
                          maxWidth="md"
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={openId === post.pid}
                        >
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
                                  <source
                                    src={post.url}
                                    type="video/webm"
                                  />
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
                                    <Comments
                                      userData={userData}
                                      postData={post}
                                    />
                                  </CardContent>
                                </Card>
                                <div className="extra">
                                  <div className="likes">
                                    <Likes2
                                      userData={userData}
                                      postData={post}
                                    />
                                    
                                  </div>
                                  <AddComment
                                    setComment={setComment}
                                    userData={userData}
                                    postData={post}
                                  />
                                </div>
                              </div>
                            </div>
                          </MuiDialogContent>
                        </Dialog>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
