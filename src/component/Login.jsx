import React , {useContext, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
export default function Login(props) {
    let {login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoader(true);
            await login(email, password);
            setLoader(false);
            props.history.push("/");
        }
        catch{
            setLoader(false);
            setEmail("");
            setPassword("");
        }
    }
    return (
        <div>
            <div>
                <label htmlFor="useremail">Email</label>
                <input type="email" id="usermail" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="userpass">Password</label>
                <input type="password" id="userpass" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}
