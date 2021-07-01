// Q1) Here we have class component that updates the state using the input from a form.
// Rewrite the same component using React hooks.
import { useState, useEffect } from 'react';
// export class Profile extends Component {
//     state = {
//         name: "Backbencher",
//         age: 23,
//     };
//     onNameChange = (e) => {
//         this.setState({
//             name: e.target.value,
//         });
//     };
//     onAgeChange = (e) => {
//         this.setState({
//             age: e.target.value,
//         });
//     };
//     render() {
//         return (
//             <div>
//                 <form>
//                     <input
//                         type="text"
//                         value={this.state.name}
//                         onChange={this.onNameChange}
//                     />
//                     <input
//                         type="text"
//                         value={this.state.age}
//                         onChange={this.onAgeChange}
//                     />
//                     <h2>
//                         Name: {this.state.name}, Age: {this.state.age}
//                     </h2>
//                 </form>
//             </div>
//         );
//     }
// }
import React from 'react'

function Profile() {
    const [name, setName] = useState("Backbencher");
    const [age, setAge] = useState(23);
    return (
        <>
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <h2>
                    Name: {name}, Age: {age}
                </h2>
            </form>
        </>
    );
}

export default Profile;