import {z} from 'zod'

const User = z.object({
    email : z.email().trim(),
    password : z.string().trim().min(8,{error:'Password is too short'})
})

const Login = z.object({
  email: z.email().trim(),
  password: z.string().trim(),
});


type LoginModel = z.infer<typeof Login>
type UserModel = z.infer<typeof User>

const UserDefault: UserModel = {
  email: '',
  password: '',
};
const LoginDefault: LoginModel = {
  email: "",
  password: "",
};

export { 
  UserDefault, 
  User, 
  LoginDefault, 
  Login };
export type { 
  UserModel, 
  LoginModel 
};