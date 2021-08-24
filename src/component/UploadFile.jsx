import React, {useContext} from 'react';
import uuid from "react-uuid";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { AuthContext } from '../contexts/AuthContext';
import { database, storage } from '../firebase';

function UploadFile(props) {
    let user = props.userData;
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            }
        }
    }));
    let classes = useStyles();
    const { signout, currentUser } = useContext(AuthContext);
    const handleInputFile = (e) => {
        e.preventDefault();
        let file = e?.target?.files[0];

        if (file != null) {
            console.log(e.target.files[0]);
        }
        const uploadTask = storage.ref(`/posts/${uuid()}`).put(file);

        // f1 -> progress 
        const f1 = snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            console.log(progress);
        }
        // f2 -> err
        const f2 = () => {
            alert("There was an error in uploading the file");
            return;
        }
        // f3 -> success 
        const f3 = () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                // 2.
                // post collection -> post document put
                let obj = {
                    comments: [],
                    likes: [],
                    url,
                    auid: currentUser.uid,
                    createdAt: database.getUserTimeStamp(),
                }
                // put the post obj into collection
                let postObj = await database.posts.add(obj);
                // 3. user postID -> new post id put
                await database.users.doc(currentUser.uid).update({
                    postIds: [...user.postIds, postObj.id]
                })
                console.log(postObj);

            })
        }
        uploadTask.on('state_changed', f1, f2, f3);
    }
    return (
        <div className="uploadImage">
            <div className={classes.root}>
                <input type="file" className={classes.input} id="icon-button-file" accept="file" onChange={handleInputFile}
                />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="primary" component="span" endIcon={<PhotoCamera />}>
                        Upload
                    </Button>
                </label>
            </div>
        </div>
    )
}

export default UploadFile
