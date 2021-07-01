// Q2) Here is a class component that prints Boom in console whenever it is mounted or updated.
// Remove the redundant console.log statement using React hooks.
// export class Banner extends Component {
//   state = {
//     count: 0,
//   };
//   updateState = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };
//   componentDidMount() {
//     console.log("Boom");
//   }
//   componentDidUpdate() {
//     console.log("Boom");
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.updateState}>State: {this.state.count}</button>
//       </div>
//     );
//   }
// }
import React from 'react'
import { useState, useEffect } from 'react';
export default function Banner() {
    const [count, setCount] = useState(0);
    function componentDidMountfn(){
        console.log("Mount Boom");
    }
    useEffect(componentDidMountfn, []);

    function componentDidUpdatefn(){
        console.log("Update Boom");
    }
    useEffect(componentDidUpdatefn, [count]);
    return (
        <div>
            <button onClick={(e)=> setCount(count + 1)}>State: {count}</button>
        </div>
    )
}