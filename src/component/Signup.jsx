import React, {useContext, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import { storage, firestore, database } from '../firebase';

export default function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [file, setFile]  = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    let {signup} = useContext(AuthContext);

    function handlFileSubmit(e) {
        let file = e?.target?.files[0];
        if (file != null) {
            console.log(e.target.files[0])
            setFile(e.target.files[0]);
        }
    }
    async function handleSignup(e){
        e.preventDefault();
        try{
            setLoader(true);

            let res = await signup(email, password);
            let uid = res.user.uid;
            
            
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // fn1 -> progress
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }
            
            function fn2(error){
                setError("");
                // setLoader(false);
                console.log(error);
            }
            async function fn3(){
                let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                database.users.doc(uid).set({
                    email,
                    uid,
                    username,
                    createdAt: database.getUserTimeStamp(),
                    photoURL: downloadurl
                })
                setLoader(false);
                props.history.push("/");
            }

        }   
        catch{
            setEmail("");
            setPassword("");
        }
    }
    function handleFile(){}
    return (
        <div>
            <form onSubmit={handleSignup}>

                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="useremail">Email</label>
                    <input type="email" id="usermail" value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="userpass">Password</label>
                    <input type="password" id="userpass" value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="userfile">Password</label>
                    <input type="file" accept="image/*" id="userpass"
                    onChange={(e) => handlFileSubmit(e)} />
                </div>
                    <button type="submit" >Signup</button>
                </form>
        </div>
    )
}
