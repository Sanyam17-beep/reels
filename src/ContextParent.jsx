import React from 'react';
import {useContext} from 'react'
let Context = React.createContext("Dark");
export default function ContextParent() {
    return (
        <>
            <Sidebar></Sidebar>
        </>
    )
}
function Sidebar(){
    let mode = useContext(Context);
    return (
        <>
            <h1>Sidebar Mode = {mode}</h1>
            <Context.Provider value="Light">
                <Option1></Option1>
            </Context.Provider>
        </>
    )
}
function Option1(){
    let mode = useContext(Context);
    return (
        <>
            <h1>Option1 Mode = {mode}</h1>
            <Option2></Option2>
        </>
    )
}
function Option2(){
    let mode = useContext(Context);
    return (
        <>
            <h1>Option2 Mode = {mode}</h1>
        </>
    )
}
