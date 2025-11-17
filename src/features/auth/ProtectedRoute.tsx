import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import Spinner from "@/components/ui/Spinner";
import { AuthContext } from "@/services/state/context/authContext";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  console.log("AUTH", auth)
  if (auth?.loading ) {
    return <Spinner isDefault height={300} width={300} />;
  }
  if (!auth?.user) {
  
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
