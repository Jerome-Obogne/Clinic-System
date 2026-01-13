import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AUTH } from "@/services/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getCollectionRef } from "@/utils/firebaseUtils";
import { getDocs, limit, query, where } from "firebase/firestore";
import type { ProfileModel } from "@/model/Profile.model";
import { AuthDataQuery, AuthDefaultSchema,  type AuthData, type AuthProps } from "@/model/Auth-Context.model";

export const AuthContext = createContext<AuthProps | undefined>(undefined);
export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>(AuthDefaultSchema);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const userState = onAuthStateChanged(AUTH, async(users) => {
      if (!users?.uid){
        setAuth(AuthDefaultSchema);
        setLoading(false)
        return;
      }
      setLoading(true)
      const response = await getQueryProfile(users?.uid);
        if (response) {
          setAuth({
            user: users,
            first_name: response.first_name ?? '', 
            role:response.role,
         
          })
        }  
      setLoading(false);
    });

    return () => userState();
  }, []); 

  const updateUser = useCallback((userData:Partial<AuthData>) => {
    setAuth((prev) => ({
      ...prev,
      ...userData,
    }));

  },[]);

   const contextValue = useMemo(() => ({
       user: auth.user,
       loading,
       first_name: auth.first_name,
       role: auth.role,
       handleUpdateUser:updateUser
     }),[auth, loading]);

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const getQueryProfile = async (user_id: string | undefined) => {
  if(!user_id) {
    return AuthDataQuery;
  }
  const profileRef = getCollectionRef('Profiles');
  const queryRef = query(profileRef, where("user_id", "==", user_id), limit(1));
  const results = await getDocs(queryRef);

  if(results.empty) {
    return AuthDataQuery
  }
 
  const { first_name,role, last_name } = results.docs[0].data() as ProfileModel;
  return { 
    first_name: first_name, 
    role: role, 
    last_name: last_name };
};