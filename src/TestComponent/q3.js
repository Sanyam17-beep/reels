// Q3) Here we have a class component with a state value. Each time the button in component is
// clicked, the count is incremented.
// class Counter extends Component {
//     state = {
//         count: 0,
//     };
//     incrementCount = () => {
//         this.setState({
//             count: this.state.count + 1,
//         });
//     };
//     render() {
//         return (
//             <div>
//                 <button onClick={this.incrementCount}>Count: {this.state.count}</button>
//             </div>
//         );
//     }
// }
// // Rewrite this component using React hooks.

// Ans : 
import React from 'react'
import { useState, useEffect} from 'react';
export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count+1)}>Count: {count}</button>
        </div>
    )
}
