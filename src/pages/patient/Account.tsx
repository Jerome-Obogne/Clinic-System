import AccountForm from "@/features/patient/Account/AccountForm"
import ChangePassword from "./ChangePassword"

const Account = () => {
  return (
    <>
      <AccountForm />
      <div className="my-6">
        <ChangePassword />
      </div>
    </>
  );
}

export default Account