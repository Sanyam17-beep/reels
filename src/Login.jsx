import React from 'react';
import { useState } from 'react';
import auth from './firebase';

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
     
    // user => user data
    // loading => loading 
    // error => error
    const handleSubmit = async() => {
        // alert(email+password);
        try{
            setLoader(true);
            let res = await auth.signInWithEmailAndPassword(email, password);
            setUser(res.user);
            setError(false);
            setLoader(false)
        }
        catch{
            setError(true);
            setLoader(false);
        }
    }
    return (
        <>

        {error === true ? <h1>Failed to login</h1>:
        loader === true ? <h1>Loading</h1>:
        user !== null ? <h1>User Logged in {user.uid}</h1>:
            <>
                <h1>Firebase Login</h1>

                <input type="email" value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Enter your email"/>

                <input type="password" value={password} 
                onChange ={(e)=> setPassword(e.target.value)}
                placeholder="Enter password"/>

                <input type="button" value="submit" 
                onClick = {handleSubmit}
                placeholder="Enter password"/>
            </>
        }
        </>
    )
}
