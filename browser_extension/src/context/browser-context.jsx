import { createContext,useContext, useReducer } from "react";
import { browserReducer } from "./browser-reducer";
const initialState={
    name:"",
    time:"",
    message:"",
    task:null
}
const browserContext=createContext(initialState)
const BrowserProvider=({children})=>{
    const [{name,time,message,task},dispatchBrowser]=useReducer(browserReducer,initialState)
    return(
        <browserContext.Provider value={{name,time,message,task,dispatchBrowser}}>
        {children}
        </browserContext.Provider>
    )
}
const useBrowser=()=>useContext(browserContext)
export {BrowserProvider,useBrowser}