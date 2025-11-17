import { createContext, useEffect, useState } from "react";
import { AUTH } from "@/services/api/firebaseConfig";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getCollectionRef } from "@/utils/firebaseUtils";
import { getDocs, limit, query, where } from "firebase/firestore";
import type { ProfileModel } from "@/model/Profile.model";
import { _null } from "zod/v4/core";

interface AuthProps {
  user: User | null;
  loading: boolean;
  first_name?: string,
  
}
type AuthData = {
  user: User | null,
  first_name: string,
}


export const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>({user:null,first_name:''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userState = onAuthStateChanged(AUTH, async(users) => {
      if (!users?.uid){
        setAuth({user:null, first_name :''})
        setLoading(false)
        return;
      }
      setLoading(true)
      const response = await getQueryProfile(users?.uid);
        if (response) {
          setAuth({user: users,first_name: response.first_name ?? ''})
        }  
      setLoading(false);
    });

    return () => userState();
  }, []); 
  

  return (
    <>
      <AuthContext.Provider value={{ user: auth.user , loading , first_name: auth?.first_name }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const getQueryProfile = async (user_id: string | undefined) => {
  if(!user_id) {
    return {first_name :''}
  }
  const profileRef = getCollectionRef("Profiles");
  const queryRef = query(profileRef, where("user_id", "==", user_id), limit(1));
  const results = await getDocs(queryRef);

  if(results.empty) {
    return {first_name:''}
  }
 
  const { first_name } = results.docs[0].data() as ProfileModel;
  return { first_name: first_name };
};