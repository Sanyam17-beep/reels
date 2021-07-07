import React, { useEffect } from 'react'
import v1 from './v1.mp4';
import v2 from './v2.mp4';
import v3 from './v3.mp4';
import v4 from './v4.mp4';
import "./Ideom.css"

function InterSectionObserverDemo() {
    function callBack(entries){
        entries.forEach((entry)=>{
            let child = entry.target.children[0];
            console.log(child.id);
        })
    }
    useEffect(function fn() {
        let conditionObj = {
            root:null,
            threshold:'0.9'
        }
        let observer = new IntersectionObserver(callBack, conditionObj);
        let elements = document.querySelectorAll(".videoCotainer");
        elements.forEach((el)=>{
            observer.observe(el);
        })
    })
    return (
        <div>
            <div className="videoContainer">
                <Video
                    src={v1}
                    id="a"
                >
                </Video>
            </div>
            <div className="videoContainer">
                <Video
                    src={v2}
                    id="b"
                >
                </Video>
            </div>
            <div className="videoContainer">
                <Video
                    src={v3}
                    id="c"
                >
                </Video>
            </div>
            <div className="videoContainer">
                <Video
                    src={v4}
                    id="d"
                >
                </Video>
            </div>
        </div>
    )
}

export default InterSectionObserverDemo

function Video(props) {
    return (
        <div>
            <video className="video-styles" controls muted={true} id={props.id}>
                <source src={
                    props.src
                } type='video/mp4'/>
            </video>
        </div>
    )
}

