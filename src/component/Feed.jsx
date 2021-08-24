import React,{useEffect,useState, useContext} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import {database} from '../firebase';
import {AuthContext} from '../contexts/AuthContext';

//Components
import Header from './Header';
import Posts from './Posts'
import UploadFile from './UploadFile';

import './Feed.css';
// export default function Feed() {
//   let classes = useStyles();
//   const [loading, setLoading] = useState(false);
//   const { signOut, currentUser } = useContext(AuthContext);
//   const [user, setUser] = useState(null);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [videos, setVideos] = useState([]);

//   // const {}
//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await signOut();
//       setLoading(false);
//     } catch {
//       setLoading(false);
//     }
//   };
//   // componentdidmount
//   useEffect(async () => {
//     // database.users.doc(currentUser.uid).onSnapshot((snapshot) => {
//     //     console.log(snapshot.data());
//     //     setUser(snapshot.data());
//     //     setPageLoading(false);
//     // })
//     let dataObj = await database.users.doc(currentUser.uid).get();
//     setUser(dataObj.data());
//     setPageLoading(false);
//   }, []);
//   return pageLoading === true ? (
//     <div>Loading...</div>
//   ) : (
//     <div>
//       <div className="navebar">
//         <Avatar alt="Remy Sharp" src={user.photoURL}></Avatar>
//         <button type="submit" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="feed">
//         {videos.map((videoObj, index) => {
//           return (
//             <div className={classes.videoContainer} key={videoObj.puid}>
//               <Video
//                 src={videoObj.videoUrl}
//                 puid={videoObj.puid}
//                 userName={videoObj.userName}
//               ></Video>

//               <FavouriteIcon
//                 className={classNames(
//                   classes.icon,
//                   classes.heart,
//                   videoObj.isLiked === false
//                     ? classes.notSelected
//                     : classes.selected
//                 )}
//                 onClick={() => {
//                   handleLiked(videoObj.puid);
//                 }}
//               ></FavouriteIcon>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

function Feed() {
    const [userData,setUserData]=useState(null);
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    useEffect(()=> {
        const unsub= database.users.doc(currentUser.uid).onSnapshot((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUserData(doc.data());
// let dataObj = await database.users.doc(currentUser.uid).get();
//     setUser(dataObj.data());
//     setPageLoading(false);
    })
    return ()=>{unsub()};   
      }, [currentUser]);
    return (
        <>
        {/* This check is important because without this the condition that we are using in our likes
        component will always give us a false value as that component will be rendered withput any user data
        so there will not be any id to compare to */}
        {userData === null?<CircularProgress/>:
        <>
        <Header userData={userData}/>
        <div className='portion' style={{height:'9.5vh'}}></div>      
        <div className='feed-container'>
            <div className='center'>
            <UploadFile userData={userData} />
                <Posts userData={userData}/>
            </div> 
        </div>
        </>}
        </>
    )
}
export default Feed;

