import { passwordCheckerList } from '@/utils/mockdata';
import {  List  } from '@mui/material'
import PasswordContent from './PasswordContent';
const ChangePasswordModal = () => {
  return (
    <>
      <div className="p-8">
        <div>
          <h1>Change Password</h1>
          <div>
            <h5>Password must contain</h5>
            <List>
              {passwordCheckerList.map((data: any) => (
                <PasswordContent title={data} />
              ))}
            </List>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ChangePasswordModal