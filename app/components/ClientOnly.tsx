"use client"
import { useEffect, useState } from "react";
interface Props{
    children:React.ReactNode
}

const ClientOnly:React.FC<Props> = ({children}) => {
    const [isMounted,setIsMounted]=useState(false)
    useEffect(()=>{
        setIsMounted(true)

    },[])
    if(!isMounted){
        return null
    }
    return ( 
        <>
        {children}
        </>
     );
}
 
export default ClientOnly;