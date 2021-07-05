import React, {useContext, useState}  from 'react'
import { AuthContext } from '../contexts/AuthContext';

export default function Feed() {
    const [loading, setLoading] = useState(false);
    const { signOut } = useContext(AuthContext);

    const handleLogout = async() => {
        try{
            setLoading(true);
            await signOut();
            setLoading(false);
        }
        catch{
            setLoading(false);
        }
    }
    return (
        <div>
            Feed
            <button type="submit" onClick={handleLogout} disabled={loading}>Logout</button>
        </div>
    )
}
