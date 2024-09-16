import {createContext,useState,useEffect} from "react";
import { io } from "socket.io-client";

const SocketContext= createContext();

export const SocketContextProvider = ({children})=>{
    const[socket,setSocket]=useState(null);
    
    useEffect(()=>{
const socket = io("http://localhost:3000",{
    
})
    },[])

    return (
        <SocketContext.Provider value={"hiii"}>
            {children}
        </SocketContext.Provider>
    )
};