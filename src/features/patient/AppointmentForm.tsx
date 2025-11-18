import Buttons from '@/components/ui/Buttons';
import { Box, Grid, TextField } from '@mui/material'
import { memo } from 'react';

const AppointmentForm = () => {
  
  return (
    <>
      <div className="">
        <Box sx={{}}>
          <h1 className="text-sm md:text-4xl">Appointment Form</h1>
        </Box>
        <div className="mt-2 ">
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid size={6}></Grid>

            <Grid size={{ sm: 6, md: 6, lg: 6 }}></Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField
                name={"patient_name"}
                id="patient_outline"
                label="Patient Name"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField
                name={"guardian_name"}
                id="guardian_outline"
                label="Guardian Name"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <TextField
                name={"guardian_name"}
                id="guardian_outline"
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <TextField
                name={"appointment"}
                id="appointment_outline"
                label="Enter your appointment reason"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 12, md: 12, lg: 12 }} sx={{ mt: "10px" }}>
              <Buttons
                type="submit"
                variant="contained"
                className="!p-[8px] normal-case! w-full md:w-[250px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
                size="large"
              >
                BOOK NOW
              </Buttons>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default memo(AppointmentForm)