import Buttons from '@/components/ui/Buttons';
import { Box, Grid, TextField } from '@mui/material'
import { memo } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { zodResolver } from '@hookform/resolvers/zod';
import { Appointment, type AppointmentModel } from '@/model/Appointment.model';
import dayjs from 'dayjs';
import { convertDateTimeString } from '@/utils/utilities';
const AppointmentForm = () => {
  

 const {
   register,
   control,
   handleSubmit,
   reset,
   formState: { errors },
 } = useForm<AppointmentModel>({
   defaultValues: {
     date: dayjs().format("MM/DD/YYYY"),
     time: dayjs().format("hh:mm:A"),
     created_at: "",
     update_at: "",
   },
   resolver: zodResolver(Appointment),
 });
 console.log("Form errors:", errors);

 const handleAddAppoint = async(data: AppointmentModel) => {
   console.log("DATA >>>", data);
   reset();
 };

  return (
    <>
      <div className="">
        <Box>
          <h1 className="mb-8 text-sm md:text-4xl">Appointment Form</h1>
        </Box>
        <div className="mt-2 ">
          <form onSubmit={handleSubmit(handleAddAppoint)}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Controller
                  control={control}
                  name={"date"}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <DatePicker
                        sx={{
                          maxWidth: "700px",
                          width: {
                            xs: "100%",
                            sm: "500px",
                            md: "400px",
                            lg: "400px",
                          },
                        }}
                        label="Appointment Date"
                        value={dayjs(value, "MM/DD/YYYY")}
                        onChange={(newValue) => {
                          onChange(convertDateTimeString(newValue,'MM/DD/YYYY'));
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Controller
                  control={control}
                  name={"time"}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TimePicker
                        sx={{
                          maxWidth: "700px",
                          width: {
                            xs: "100%",
                            sm: "500px",
                            md: "400px",
                            lg: "400px",
                          },
                        }}
                        label="Time"
                        value={dayjs(value, "hh:mm:A")}
                        onChange={(timeValue) => {
                          onChange(convertDateTimeString(timeValue,'hh:mm:A'));
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  {...register("name")}
                  id="patient_outline"
                  label="Patient Name"
                  variant="outlined"
                  fullWidth
                  error={errors.name && true}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  {...register("guardian_name")}
                  id="guardian_outline"
                  label="Guardian Name"
                  variant="outlined"
                  fullWidth
                  error={errors.guardian_name && true}
                  helperText={errors.guardian_name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  {...register("contact_no")}
                  id="phone_outline"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={errors.contact_no && true}
                  helperText={errors.contact_no?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  {...register("concerns")}
                  id="concerns_outline"
                  label="Enter your appointment reason"
                  variant="outlined"
                  error={errors.concerns && true}
                  helperText={errors.concerns?.message}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid
                size={{ xs: 6, sm: 12, md: 12, lg: 12 }}
                sx={{ mt: "10px" }}
              >
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
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(AppointmentForm)