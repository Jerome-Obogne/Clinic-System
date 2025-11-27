import dayjs from 'dayjs';
import {z} from 'zod'

const Now = dayjs()
const Profiles = z.object({
  id: z.string().optional,
  user_id:z.string(),
  first_name: z.string().min(2, { error: "Provide atleast 2 mininum character" }),
  last_name: z.string().optional(),
  birth_date: z.date(),
  address: z.string().min(4, { error: "Provide a valid address" }),
  contact_no: z.number(),
  role: z.string(),
  gender: z.string()
});

type ProfileModel = z.infer<typeof Profiles>
const ProfileSchema: ProfileModel = {
  id:'',
  user_id:'',
  first_name:'',
  last_name:'',
  birth_date:Now.toDate(),
  address:'',
  contact_no:0,
  role:'',
  gender:''

}
export {
    Profiles,
    ProfileSchema
}
export type { ProfileModel };
