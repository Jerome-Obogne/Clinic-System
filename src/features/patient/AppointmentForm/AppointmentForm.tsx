import Buttons from '@/components/ui/Buttons';
import { Box, Grid, TextField } from '@mui/material'
import { useCallback, useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { zodResolver } from '@hookform/resolvers/zod';
import { Appointment, type AppointmentModel,type parseAppointmentModel,parseAppointmentSchema,defaultAppointment } from '@/model/Appointment.model';
import dayjs from 'dayjs';
import { convertDateTimeString } from '@/utils/utilities';
import { MuiPhone } from './MuiPhoneInput';
import useToastMessage from '@/hooks/useToastMessage';
import { addProfile } from '@/services/api/firebaseDb';
import { useAuthContext } from '@/services/state/context/authContext';
import BaseModal from '@/components/ui/BaseModal';
import ConfirmAppointment from './ConfirmAppointment';

const AppointmentForm = () => {
 const {ToastError,ToastSuccess} = useToastMessage()
 const authContext = useAuthContext();
 const [isOpen,setIsOpen] = useState(false);
 const [formData, setFormData] = useState<AppointmentModel>(defaultAppointment);
 const [isSubmitting, setIsSubmitting] = useState(false)
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
     created_at: new Date().toISOString(),
     update_at: new Date().toISOString(),
     status:'N'
   },
   resolver: zodResolver(Appointment),
 });

 const handleAddAppointment = async(data: AppointmentModel) => {
   setIsOpen(!isOpen);
   setFormData({...data, user_id:authContext?.user?.uid});
   
 };
 
 const handleConfirmAddAppointment = useCallback(async () => {
     const parseRecord = parseAppointmentSchema.safeParse(formData);
     if (!parseRecord.success) {
       ToastError("Problem with parsing data. Please try again");
       return;
     }
     setIsSubmitting(true)
     const { success, error } = await addProfile<parseAppointmentModel>("Appointment", parseRecord.data);
     if (!success) {
       ToastError(`${error?.code}`);
       setIsSubmitting(false)
       return;
     }
     ToastSuccess("You have succesfully add appointment");
     reset();
     setIsOpen(false)
     setIsSubmitting(false)
 },[formData,ToastError,reset,ToastSuccess])

  const handleClose = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <>
      <div className="">
        <Box>
          <h1 className="mb-8 text-sm md:text-4xl">Appointment Form</h1>
        </Box>
        <div className="mt-2 ">
          <form onSubmit={handleSubmit(handleAddAppointment)}>
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
                          onChange(
                            convertDateTimeString(newValue, "MM/DD/YYYY")
                          );
                        }}
                        slotProps={{
                          textField: {
                            inputProps: {
                              "data-testid": "appointment_date",
                            },
                          },
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
                          onChange(convertDateTimeString(timeValue, "hh:mm:A"));
                        }}
                        slotProps={{
                          textField: {
                            inputProps: {
                              "data-testid": "time",
                            },
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  {...register("name")}
                  data-testid="patient_outline"
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
                  data-testid="guardian_outline"
                  label="Guardian Name"
                  variant="outlined"
                  fullWidth
                  error={errors.guardian_name && true}
                  helperText={errors.guardian_name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Controller
                  control={control}
                  name="contact_no"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <MuiPhone
                        value={value}
                        onChange={onChange}
                        errorData={errors.contact_no}
                        helperMessage={errors.contact_no?.message}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  {...register("concerns")}
                  data-testid="concerns_outline"
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
          <BaseModal
            open={isOpen}
            handleClose={handleClose}
            className="var(--color-quarternary)"
          >
            <ConfirmAppointment
              onSubmit={handleConfirmAddAppointment}
              data={formData}
              isSubmit={isSubmitting}
            />
          </BaseModal>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm