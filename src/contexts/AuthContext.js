import auth from '../firebase';
import React, {useEffect, useState} from 'react'
// import { useState} from 'react-router-dom';

export const AuthContext = React.createContext();
export default function AuthProvider({children}) {
    const [currentUser, setUser] = useState();
    const [loading, setLoading] = useState(false);

    async function login(email, password){
        return await auth.signInWithEmailAndPassword(email, password);
    }
    async function signOut(){
        return await auth.signOut()
    }
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    useEffect(() =>{ 
        auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
    }, []);
    const value = {
        login,
        signOut,
        signup,
        currentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
