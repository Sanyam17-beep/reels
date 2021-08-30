import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Avatar  from '@material-ui/core/Avatar';

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
