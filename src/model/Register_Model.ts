import { Profiles } from "./Profile.model";
import { User } from "./User.model";
import {z} from 'zod' 

const Register = User.extend({
    first_name : Profiles.shape.first_name,
    last_name : Profiles.shape.last_name,
})

type RegisterModel = z.infer<typeof Register>;

export {
    Register,
}
export type {
    RegisterModel
}