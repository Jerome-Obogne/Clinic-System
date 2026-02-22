import ProfileAvatar from '@/components/ui/ProfileAvatar';
import { memo } from 'react';
import { AiOutlineMore } from "react-icons/ai";
type AccountProps ={
    src?:string,
    name?:string,
    role?:string,
    onDelete?: () =>{ }
}


const AccountItem = ({ src, name, role, onDelete }: AccountProps) => {
  console.log(onDelete);
  return (
    <div className="flex justify-between items-center  px-3 flex-wrap">
      <div className="align-baseline flex-1">
        <div className="flex gap-5 flex-wrap items-center">
          <ProfileAvatar
            src={`${src || "/logo/Pediatric_Logo_v1.png"}`}
            size={80}
          />
          <h6 className="text-md sm:text-lg">
            {name || "JEROME "}
          </h6>
        </div>
      </div>
      <div className="">
        <h6 className="text-md sm:text-lg">{role || "CLIENT "}</h6>
      </div>
      <div className="flex-1 place-items-end">
        <h6 className="">
          <AiOutlineMore size={30} color="gray" />
        </h6>
      </div>
    </div>
  );
};
 

export default memo(AccountItem);