import { AUTH } from "@/services/api/firebaseConfig";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useEffect, useState, } from "react";

interface AuthProps {
  user:User | null,
  loading: boolean
}

export const AuthContext = createContext<AuthProps  | undefined>(undefined);

export const AuthProvider = ({children}: {children:React.ReactNode}) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading , setLoading] = useState(true)

   useEffect(() => {
      const userState = onAuthStateChanged(AUTH,(user) => {    
          setAuth(user)
          setLoading(false);   
      }) 
     return () => userState(); 
   },[])

  return (
    <>
      <AuthContext.Provider value={{user:auth,loading}}>
        {children}
      </AuthContext.Provider>
    </>
  )
  
}


