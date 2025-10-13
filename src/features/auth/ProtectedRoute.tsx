import Spinner from "@/components/ui/Spinner";
import { AuthContext } from "@/services/state/context/authContext";
import { useContext } from "react"
import {  Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  
  if (auth?.loading) {
    return <Spinner height={300} width={300}/>
  }
   if (!auth?.user) {
        return <Navigate to="/login" replace />
   }
   return <Outlet/>
}


export default ProtectedRoute