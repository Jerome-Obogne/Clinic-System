import Buttons from "@/components/ui/Buttons";
import AccountField from "./AccountField";
import { useCallback, useEffect, useState } from "react";
import { accountSchema, AccountsModelSchema, type Account } from "@/model/Account.model";
import { getCollectionRef } from "@/utils/firebaseUtils";
import {  limit, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContext } from "@/services/state/context/authContext";
import type { ProfileModel } from "@/model/Profile.model";
import { getUpdateDoc } from "@/services/api/firebaseDb";
import useToastMessage from "@/hooks/useToastMessage";


const AccountForm = () => {
  const { ToastError } = useToastMessage();
  const auth = useAuthContext();
  const [account, setAccount] = useState<Account>(accountSchema);
 
  const handleSubmit = useCallback(async (fieldName:string | undefined , fieldValue:string) => {
    const record =  {[fieldName as string]: fieldValue} ;
    const { success,error } = await getUpdateDoc("Profiles", account.id , record);
    if (!success) {
      ToastError(`Try again : ${error?.code}`,)
      return
    }
  },[account.id,ToastError])

  useEffect(() => {
    const profileRef = getCollectionRef("Profiles");
    const queryRef = query(profileRef, where("user_id", "==" ,auth?.user?.uid) , limit(1));
    
    const getProfileState = onSnapshot(queryRef,(querySnapShot) => {
      if (querySnapShot.empty){
        ToastError('There something wrong with the record!');
        return;
      }
      const { first_name, last_name } = querySnapShot.docs[0].data() as ProfileModel
      const profile_id = querySnapShot.docs[0].id
      
      setAccount({
        email: auth?.user?.email,
        last_name: last_name,
        first_name: first_name,
        id: profile_id
        })  
        
       auth?.handleUpdateUser({first_name:first_name})
      });
        
      return () => getProfileState();
  }, []);

  return (
    <>
      <div data-testid = 'account-component'>
        <h1 className="mb-8 text-sm md:text-4xl">MY ACCOUNT</h1>
      </div>

      <div className="max-w-[600px] bg-[#dbe2ec] rounded-lg p-6">
        <div className="my-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <img
                src="../logo/Pediatric_Logo_v1.png"
                alt="Avatar"
                className="max-w-full w-[80px] h-auto"
              />
              <div>
                <h1 data-testid = 'account-name'>{`${account.first_name} ${account.last_name}`}</h1>
                <span data-testid = 'account-email' >{account.email}</span>
              </div>
            </div>
            <Buttons
              type="submit"
              variant="contained"
              className="!p-[8px] normal-case! w-full md:w-[220px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
              size="small"
            >
              Edit user avatar
            </Buttons>
          </div>
        </div>

        <div className="p-5">
          {AccountsModelSchema.map((data) => (
            <AccountField
              name={data.name}
              label={data.label}
              onSubmit={handleSubmit}
              key={data.label}
              value={account[data.name as keyof Account] || ""}
            />
          ))}
        </div>
      </div>
     
    </>
  );
}

export default AccountForm;