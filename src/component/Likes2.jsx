import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {database} from "../firebase";


function Likes2({userData=null, postData=null}) {
    const useStyles = makeStyles({
        like:{
            color:'#e74c3c',
            cursor:'pointer',
        },
        unlike:{
           cursor:'pointer',
           color:'black'
        }
    });
    let classes = useStyles();
    const [liked, setLiked] = useState(null);
    useEffect(()=>{
        let isLiked = postData.likes.includes(userData?.uid);
        setLiked(isLiked);
    }, [postData]);
    
    function handleLiked() {
        let likes = postData.likes;

        if (liked === false) {
            database.posts.doc(postData.pid).update({
                "likes": [...likes, userData.uid]
            })
        }
        else {
            let likes = postData.likes.filter(uid => {
                return uid !== userData.uid;
            })
            database.posts.doc(postData.pid).update({
                "likes": likes
            })
        }
        setLiked(!liked);
    }
    return (
        <div>
            {
                liked !== null 
                    ? <>
                    <FavoriteIcon className={`${liked === false ? classes.unlike:classes.like}`} onClick={handleLiked}></FavoriteIcon>
                    </>
                    : <></>
            }
        </div>
    )
}

export default Likes2;
