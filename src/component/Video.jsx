import React from 'react';
import "./Video.css";
function Video(props) {
  return (
      <>
      <video autoPlay muted={true} id={props.id}
          // style={{
          
          // width: "100%",
          // height: "50vh",
          // // scrollSnapAlign: "start",
          // border: "1px solid red",
          // }}
    >
      <source src={props.source} type="video/mp4"></source>
    </video>
    <div style={{ position: "absolute", bottom: "0", color: "red" }}>
      {props.userName}
    </div>  
      </>
  )
}

export default Video;
