import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import './Profile.css';

import Header from './Header';

import {database} from '../firebase';

function Profile() {
    const useStyles = makeStyles({
        bavatar:
        {
          height:'23vh',
          width:'40%',
          margin:'0'
        },
        tfw:{
          fontWeight:'300'
        },
        tfw2:{
          fontWeight:'500',
          marginLeft:'2%'
        },
        seeComments:{
          height:'54vh',
          overflowY:'auto'
        }
    });

    let classes = useStyles();
    const [userData, setUserData] = useState(null);
    const [posts, setPostData] = useState(null);
    const [openId, setOpenId] = useState(null);

    let {id} = useParams();

    const handleVideoClick = (id)=>{
        setOpenId(id);
    }
    useEffect(()=>{
        const getUserdata = async()=>{
            let data = await database.users.doc(id).get();
            console.log(data)
            setUserData(data.data())
        }
        getUserdata();
        console.log(userData)
        // return ()=>{unsub()};   
    },[id]);

    useEffect(()=>{
        let postData = [];
        const getPostdata = async()=>{
            for(let i = 0; i < userData.postIds.length; i++){
                let pid  = userData.postIds[i];
                let data = await database.posts.doc(pid).get();
                data = data.data();
                postData.push({...data, pid});
            }
        }
        if(userData !== null){
            getPostdata();
            setPostData(postData);
        }
    }, [userData])
    return (
        <> 
        {userData === null || posts === null
            ? <CircularProgress></CircularProgress>
            :
                <>
                  <Header userData={userData}/>
                   <div className="spacer"/>
                   <div className="pg-container">
                        <div className="upper-part">
                            <div className="bimg">
                                <img src={userData?.photoURL}/>
                            </div>
                            <div className="info">
                                <Typography alignCenter={true} variant='h6' className={classes.tfw}>
                                    {userData?.username}
                                </Typography>
                            </div>
                            <div className="post-cal">
                                <Typography display='inline' align='center' variant='subtitle1' className={classes.tfw2}>
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
                   </div>
                   <div className="upost">
                    { 
                        posts.map((post, index)=>{
                            return (<div>
                                hello
                                <video src={post.url} className="u-video" onClick={()=> handleVideoClick(post.pid)}/>        
                            </div>)
                        })
                    }
                    </div>
                </>
        }
        </>
    )
}

export default Profile;
