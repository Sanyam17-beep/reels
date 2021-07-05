import React , {useContext} from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './component/Login';
import Feed from './component/Feed';
import Signup from './component/Signup'
import AuthProvider from './contexts/AuthContext';
import { AuthContext } from './contexts/AuthContext';

export default function App() {
    return (
        // <Login></Login>
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    <PrivateRoute path="/" exact abc={Feed}></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}
function PrivateRoute(parentProps) {
    let {currentUser}  = useContext(AuthContext);
    console.log(currentUser);
    let Component = parentProps.abc;
    return (
        <Route {...parentProps} render={(parentProps) =>
            {
                return (currentUser !== null ? <Component {...parentProps}></Component> :
                     <Redirect to="/login"></Redirect>)   
        }    }>

        </Route>
    )
}
