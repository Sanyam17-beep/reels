import React , {useContext, useState} from 'react';
import {AuthContext} from './AuthContext';
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
        }
        setEmail("");
        setPassword("");
    }
    return (
        <div>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <input type="submit" onClick={handleSubmit}/>
        </div>
    )
}
