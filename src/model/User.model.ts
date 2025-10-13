import {z} from 'zod'

const User = z.object({
    email : z.email(),
    password : z.string().min(8,{error:'Password is too short'})
})

type UserModel = z.infer<typeof User>

const UserSchema: UserModel = {
  email: '',
  password: '',
};

export { UserSchema, User };
export type { UserModel };