import { AUTH } from "@/services/api/firebaseConfig"
import { signOut } from "firebase/auth"


const useAuthLogout = () => {

 const authLogout = async () => { 
     await signOut(AUTH)
 }
  return {authLogout}
}

export default  useAuthLogout