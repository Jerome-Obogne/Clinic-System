import { Outlet, Navigate } from "react-router";
import Spinner from "@/components/ui/Spinner";
import {useAuthContext } from "@/services/state/context/authContext";

const ProtectedRoute = ({roles} : {roles:string}) => {
  const auth = useAuthContext()

  if (auth?.loading ) {
    return <Spinner isDefault height={300} width={300} />;
  }
  if (!auth?.user) {
  
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(`${auth.role.toLowerCase()}`)) {
    return <Navigate to={`/${auth.role.toLowerCase()}`} replace />;
    
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
