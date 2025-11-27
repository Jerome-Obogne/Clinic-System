import React, { memo } from 'react'
import Modal from "@mui/material/Modal";
import { ModalClose ,ModalDialog } from "@mui/joy";


type ModalProps ={
    open: boolean,
    handleClose: () => void,
    children: React.ReactNode

}

const BaseModal = ({open,handleClose,children}: ModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            minWidth: {
              xs: "100vw",
              sm: "100vw",
              md: "30vw",
              lg: "30vw",
            },
            overflow: "auto",
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