import { Navigate } from "react-router-dom";

export function BlockAccessToLogin({ children }){
    if(!localStorage.getItem("access_token")) return <Navigate to={"/login"} />
    return children
}

export function AccessOpen({ children }){
    if(localStorage.getItem("access_token")) return <Navigate to={"/"} />
    return children
}