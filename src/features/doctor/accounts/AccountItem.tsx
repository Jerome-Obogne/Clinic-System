import ProfileAvatar from '@/components/ui/ProfileAvatar';
import { AiOutlineMore } from "react-icons/ai";
import useAccountList from '@/hooks/doctor/useAccountList';
import { useCallback,useState,memo } from "react";
import CustomeMenuItem from '@/components/ui/CustomeMenuItem';
import Menu from "@mui/material/Menu";
import Buttons from '@/components/ui/Buttons';
import type { AccountList } from '@/model/Account.model';
import { deleteDoc, doc } from 'firebase/firestore';
import { DB } from '@/services/api/firebaseConfig';
import useToastMessage from '@/hooks/useToastMessage';

type AccountProps = {
  data:Omit<AccountList, 'email'>,
  src?:string,

};

const roleColorMap : Record<string , string> = {
  admin:'gray',
  patient:"black"
}


const AccountItem = ({ data,src }: AccountProps) => {
  
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const {ToastError,ToastSuccess} = useToastMessage()
   const open = Boolean(anchorEl);
   const roleColor = roleColorMap[data.role] ?? "";

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };
   const handleDelete = useCallback(async () => {
     try {
       await Promise.all([
         deleteDoc(doc(DB, "Profiles", data.id as string)),
         deleteDoc(doc(DB, "Appointment", data.user_id as string)),
       ]);
       ToastSuccess("Succesfully Deleted the Account!");
     } catch (error) {
       ToastError("Something went wrong");
     }
   }, [data.id,ToastSuccess]);

  return (
    <div className="flex justify-between items-center  px-3 flex-wrap">
      <div className="align-baseline flex-2">
        <div className="flex gap-5 flex-wrap items-center">
          <ProfileAvatar
            src={`${src || "/logo/Pediatric_Logo_v1.png"}`}
            size={80}
          />
          <h6 className="text-md sm:text-lg">{`${data.first_name} ${data.last_name}`}</h6>
        </div>
      </div>
      <div className="">
        <h6 className="text-md sm:text-lg" style={{ color: roleColor }}>
          {data.role.toUpperCase()}
        </h6>
      </div>
      <div className="flex-1 place-items-end">
        <h6 className="">
          <Buttons variant="text" onClick={handleClick} isDisabled={data.role =="admin"}>
            <AiOutlineMore size={30} color="gray" />
          </Buttons>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <CustomeMenuItem label="Delete" onAction={handleDelete} />
          </Menu>
        </h6>
      </div>
    </div>
  );
};

export const AccountLists = () => {

  const {accounts} = useAccountList();
  
  return (
    <>
      {accounts.map((data) => (
        <AccountItem
          src="/logo/Pediatric_Logo_v1.png"
          data={data}
          key={data.id}
        />
      ))}
    </>
  );
}
 

export default memo(AccountItem);
