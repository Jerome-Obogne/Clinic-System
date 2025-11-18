import type { User } from "firebase/auth";

interface AuthProps {
  user: User | null;
  loading: boolean;
  first_name: string,
  role:string
  
}
type AuthData = {
  user: User | null,
  first_name: string,
  role:string
}
type AuthQuery = Omit<AuthData, "user">;


const AuthDefaultSchema : AuthData =  {
    user: null,
    first_name: '',
    role: ''

}

const AuthDataQuery: AuthQuery = {
  first_name: "",
  role: "",
};


export { AuthDefaultSchema, AuthDataQuery };
export type { AuthProps, AuthData,  };