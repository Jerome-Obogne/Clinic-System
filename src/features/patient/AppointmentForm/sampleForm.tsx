import BaseModal from '@/components/ui/BaseModal'
import  { useCallback, useState } from 'react'
import ConfirmAppointment from './ConfirmAppointment';
import { Grid } from '@mui/material';

const SampleForm = () => {

  const [isOpen,setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  const handleSample = async() => {
    setIsOpen(true)
  }
  
    const handleConfirmAddAppointment = useCallback(async () => {

    setIsOpen(false);
    }, []);


  return (
    <>
      <Grid>
        <button onClick={handleSample}>book now</button>
      </Grid>

      <BaseModal
        open={isOpen}
        handleClose={handleClose}
        className="var(--color-quarternary)"
      >
        <ConfirmAppointment
          onSubmit={handleConfirmAddAppointment}
          isSubmit={false}
        />
        <></>
      </BaseModal>
    </>
  );
}

export default SampleForm;