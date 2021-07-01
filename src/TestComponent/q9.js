// Q9) We have a code snippet from a class component which registers and remove an event listener.
// componentDidMount() {
//  window.addEventListener("mousemove", this.handleMousePosition);
// }
// componentWillUnmount() {
//  window.removeEventListener("mousemove", this.handleMousePosition);
// }
// Convert this code to React hooks format.


// Ans:
import React, { useEffect } from 'react'

export default function q9() {
    function fn(){
        window.removeEventListener("mousemove", this.handleMousePosition);
    }
    useEffect(function(){
        window.addEventListener("mousemove", this.handleMousePosition); 
        return fn;
    }, []);
    return (
        <div>
            
        </div>
    )
}
