import { Box, Grid, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { MuiPhone } from "./AppointmentForm/MuiPhoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contacts, type ContactModel } from "@/model/Contact.model";
import ButtonSubmission from "@/components/ui/ButtonSubmission";
import Buttons from "@/components/ui/Buttons";
import { addProfile } from "@/services/api/firebaseDb";
import useToastMessage from "@/hooks/useToastMessage";


const ContactForm = () => {
    
  const {ToastError,ToastSuccess} = useToastMessage();
  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    control,
    reset,
  } = useForm<ContactModel>(({
    resolver:zodResolver(Contacts)
  }))

  const handleAddContact = async(data: ContactModel) =>{
    const {success,error} = await addProfile<ContactModel>('Concerns',data)
    if(!success) {
      ToastError(error?.code)
      return;
    }
    ToastSuccess("Your concern has been sent successfully. Thank you!");
    reset();

  }
  return (
    <>
      <div className="">
        <Box>
          <h1 className="mb-8 text-sm md:text-4xl">Contact Form</h1>
        </Box>
        <div className="mt-2 max-w-[900px]!">
          <form onSubmit={handleSubmit(handleAddContact)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  {...register("name")}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  error={errors.name && true}
                  helperText={errors.name?.message}
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
                <ButtonSubmission
                  isSubmitting={isSubmitting}
                  children={
                    <Buttons
                      type="submit"
                      variant="contained"
                      className="!p-[8px] normal-case! w-full md:w-[250px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
                      size="large"
                    >
                      SEND MESSAGE
                    </Buttons>
                  }
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactForm