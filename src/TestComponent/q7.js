// Q7) Study the following piece of code and suggest changes such that only the Profile component is
// Rendered when the path is '/dashboard/profile'.
// import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
// const App = () => {
//     return (<div>App</div>)
// }
// const Dashboard = () => {
//     return (<div>Dashboard</div>)
// }
// const Profile = () => {
//     return (<div>Profile</div>)
// }
// const Router = () => {
//     return (<BrowserRouter>
//         <Route path='/' component={App}></Route>
//         <Route path='/dashboard/profile' component={Profile}></Route>
//         <Route path='/dashboard' component={Dashboard}></Route>
//     </BrowserRouter>
//     )
// }

// Ans :
    //1. use 'exact' at all routing          
    //2. Just arrange the subpaths down the parent paths and bundle them with Switch component
    
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
const App = () => {
    return (<div>App</div>)
}
const Dashboard = () => {
    return (<div>Dashboard</div>)
}
const Profile = () => {
    return (<div>Profile</div>)
}
const Router = () => {
    return (<BrowserRouter>
        <Switch>
            <Route path='/dashboard/profile' component={Profile}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Route path='/' component={App}></Route>
        </Switch>
    </BrowserRouter>
    )
}