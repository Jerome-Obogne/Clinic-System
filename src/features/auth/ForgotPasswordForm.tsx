import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Buttons from '@/components/ui/Buttons';
import { useForm } from 'react-hook-form';
import { User } from '@/model/User.model';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotUserPassword } from '@/services/api/firebaseAuth';
import useToastMessage from '@/hooks/useToastMessage';
import Spinner from '@/components/ui/Spinner';

const authEmail = User.pick({email:true})
type AuthModel = z.infer<typeof authEmail>

const ForgotPasswordForm = () => {
  const {ToastError,ToastSuccess} = useToastMessage()
  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
  } = useForm<AuthModel>({
    defaultValues:{
      email:''
    },
    resolver: zodResolver(authEmail)
  });

  const handleForgotPassword = async (data: AuthModel) => {
    const response = await forgotUserPassword(data.email);
    if (!response?.success){
      ToastError("Something went wrong... try again")
      return
    }
    ToastSuccess("Check your email for instructions to reset your password.");
  };

  return (
    <>
      <h1 className="font-bold text-gray-500 text-md md:text-lg/relaxed py-2 md:py-2.5">
        Forgot Password Form
      </h1>
      <form onSubmit={handleSubmit(handleForgotPassword)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <TextField
              fullWidth
              {...register("email")}
              error={errors.email && true}
              helperText={errors.email?.message}
              size="small"
              label="Email"
              id="outlined-start-adornment"
              sx={{ m: "4px", padding: "3px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <div className="text-center">
              {isSubmitting ? (
                <Spinner isDefault={false} height={20} width={20} />
              ) : (
                <Buttons
                  type="submit"
                  variant="contained"
                  size="medium"
                  className="normal-case! w-full md:w-[300px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
                >
                  Submit
                </Buttons>
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default ForgotPasswordForm