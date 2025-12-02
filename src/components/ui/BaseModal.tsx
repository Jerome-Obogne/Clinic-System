import React, { memo } from 'react'
import Modal from "@mui/material/Modal";
import { ModalClose ,ModalDialog } from "@mui/joy";


type ModalProps ={
    open: boolean,
    handleClose: () => void,
    children: React.ReactNode,
    className?:string 

}

const BaseModal = ({open,handleClose,children,className}: ModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalDialog
          role="dialog"
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            minWidth: {
              xs: "80vw",
              sm: "80vw",
              md: "30vw",
              lg: "30vw",
            },
            background: `${className}` || "",
            overflow: "auto",
            padding: 0,
          }}
        >
          <ModalClose />
          {children}
        </ModalDialog>
      </Modal>
    </>
  );
}

export default memo(BaseModal);