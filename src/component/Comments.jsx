import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Avatar  from '@material-ui/core/Avatar';
import { database } from '../firebase';
import "./Comments.css";

function Comments({postData}) {
    const useStyles = makeStyles({
        da:{
            marginRight:'2%',
            marginTop:'2%'
        }
    });
    let classes = useStyles();
    const [comments, setComment] = useState(null);
    useEffect(()=>{
        setComment(postData.comments);
    },[]);

    // useEffect(() => {
    //     let commentsArr = [];
    //     console.log("InUseEffect")
    //     let getComments = async()=>{
    //         let commentsDataPromise = await database.posts.doc(cid).get();
    //         let commentsData = commentsDataPromise.data();
    //         let commentsObj = commentsData.comments;
    //         for(let i in commentsObj){
    //             commentsArr.push(commentsObj[i]);
    //         }
    //     }
    //     getComments();
    //     console.log(comments);
    //     setComment(commentsArr);
    // }, []);
    // const handleComment = (puid) => {
    //     let copyOfvideos = [...videos];
    //     let idx;
    
    //     for (let i = 0; i < copyOfvideos.length; i++) {
    //       if (copyOfvideos[i].puid === puid) {
    //         idx = i;
    //       } else {
    //         copyOfvideos[i].isOverLayActive = false;
    //       }
    //     }
    
    //     let vidoeObj = copyOfvideos[idx];
    //     vidoeObj.isOverLayActive = true;
    //     setVideos(copyOfvideos);
    //   };
    return (
        <>
          {
            comments === null 
                ?   <CircularProgress/>
                :    comments.map((comment,index)=>(
                        <div key={index} className='comment-div'>
                            <Avatar className={classes.da}/>
                            <p><span style={{fontWeight:'bold',display:'inline-block'}}>{comment.username}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                        ))
           }  
        </>
    )
}

export default Comments;
