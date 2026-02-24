import type { AccountList } from "@/model/Account.model";
import { getCollectionRef } from "@/utils/firebaseUtils";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"

const useAccountList = () => {
  const [accounts, setAccounts] = useState<AccountList[]>([]);
 
  useEffect(() => {
    const profileRef = getCollectionRef("Profiles");
    const queryRef = query(profileRef, where("user_id", "!=", ""));

    const getAccountList = onSnapshot(queryRef, (querySnapShot) => {
      if (querySnapShot.empty) {
        setAccounts([]);
        return;
      }
      const result = querySnapShot.docs.map((value) => {
        return {
          ...value.data(),
          id: value.id,
        } as AccountList;
      });
      setAccounts(result);
    });
    return () => getAccountList();
  }, []);

  return {accounts}
}
 

export default useAccountList