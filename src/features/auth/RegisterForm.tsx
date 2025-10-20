import React, { useState } from 'react'
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useToastMessage from "@/hooks/useToastMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff,Person } from '@mui/icons-material';
import {
  InputAdornment,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
  Grid, 
} from "@mui/material";
import { MailOutlineOutlined, PermIdentityOutlined } from "@mui/icons-material";
import Spinner from '@/components/ui/Spinner';
import Buttons from "@/components/ui/Buttons"; 
import { Register, RegisterSchema, type RegisterModel } from '@/model/Register_Model';
import { registerUser } from '@/services/api/firebaseAuth';
import { addProfile } from '@/services/api/firebaseDb';


const RegisterForm = () => {

  const [showPassword,setShowPassword] = useState(false);
  const {ToastSuccess,ToastError} = useToastMessage();
  const handleShowPassword = () => setShowPassword(showPassword => !showPassword)
  const handleMouseDownPassword = (event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>({
      defaultValues: RegisterSchema,
      resolver: zodResolver(Register),
  });
 
 const handleRegisterAccount = async(data:RegisterModel) => {
   try {
       const response = await registerUser({email:data.email,password:data.password});
       if (!response.success) {
        ToastError(`Registration problem try again : ${response.error?.code}`);
        return
      }
       const addProfileResponse = await addProfile("Profiles", {
         first_name: data.first_name,
         last_name: data.last_name,
         user_id: response.data?.uid,
         role: "Patient",
       });
      if (!addProfileResponse.success && !addProfileResponse.data ) {
        ToastError(`Profile creation fails, try again: ${response.error?.code}`);
        return;  
      }
      ToastSuccess("Account created succesfully");
      reset();
     
   } catch (error) {
      ToastError(error as string);
   }
  
 }
 
 
  return (
    <>
      <h1 className="font-bold text-gray-500 text-md md:text-lg/relaxed py-2 md:py-2.5">
        REGISTER ACCOUNT
      </h1>
      <form onSubmit={handleSubmit(handleRegisterAccount)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <TextField
              fullWidth
              {...register("first_name")}
              error={errors.first_name && true}
              helperText={errors.first_name?.message as string}
              size="small"
              label="Firstname"
              id="outlined-start-adornment"
              sx={{ m: "4px", padding: "3px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <TextField
              fullWidth
              {...register("last_name")}
              error={errors.last_name && true}
              helperText={errors.last_name?.message as string}
              size="small"
              label="Surname"
              id="outlined-start-adornment"
              sx={{ m: "4px", padding: "3px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <TextField
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string}
              size="small"
              label="Email"
              id="outlined-start-adornment"
              sx={{ m: "4px", padding: "3px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}></Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <FormControl
              fullWidth
              error={!!errors.password}
              variant="outlined"
              size="small"
              sx={{ m: "4px", padding: "3px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("password")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="display the password" edge="start">
                      <PermIdentityOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            {isSubmitting ? (
              <Spinner isDefault={false} height={20} width={20} />
            ) : (
              <div className="text-center">
                <Buttons
                  type="submit"
                  variant="contained"
                  size="medium"
                  isDisabled={isSubmitting}
                  className="normal-case! w-full md:w-[300px] bg-[color:var(--color-quarternary)]!  hover:bg-black! hover:text-white! text-white!"
                >
                  Create Account
                </Buttons>
                <div className="font-bold mt-1.5 tracking-wide">
                  <p className="  text-[10px] text-gray-600/75">
                    Already had an account?{" "}
                    <Link
                      to="/login"
                      className="text-(--color-quarternary) ..."
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default RegisterForm

