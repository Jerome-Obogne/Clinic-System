import BaseModal from '@/components/ui/BaseModal';
import Buttons from '@/components/ui/Buttons'
import { useState } from 'react'
import ChangePasswordModal from './ChangePasswordModal';

const ChangePasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(isOpen => !isOpen)
  }

  const handleModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div>
        <h1 className="mb-5 text-sm md:text-2xl ">Password</h1>
        <div className="mt-3">
          <Buttons
            variant="contained"
            size="small"
            className="!p-[8px] normal-case! w-full md:w-[220px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
            onClick={handleModal}
          >
            Change password
          </Buttons>
        </div>

        <BaseModal open={isOpen} handleClose={handleClose}>
         <ChangePasswordModal/>
        </BaseModal>
      </div>
    </>
  );
}

export default ChangePasswordForm