import {email, z} from 'zod'

const User = z.object({
    email : z.email().trim(),
    password : z.string().trim().min(8,{error:'Password is too short'})
})

const Login = z.object({
  email: z.email().trim(),
  password: z.string().trim(),
});
const PasswordSchema= User.omit({email:true})
const UserLogin = PasswordSchema.extend({
  confirm_password: z.string().trim(),
}).refine((data) => data.password === data.confirm_password, {
  error: "Password dont match",
  path: ["confirm_password"],
});



type LoginModel = z.infer<typeof Login>
type UserModel = z.infer<typeof User>
type UserLoginModel = z.infer<typeof UserLogin>

const UserDefault: UserModel | LoginModel = {
  email: "",
  password: "",
};



export { UserDefault, User, Login, UserLogin };
export type { UserModel, LoginModel, UserLoginModel };