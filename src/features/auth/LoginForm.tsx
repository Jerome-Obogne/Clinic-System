import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useToastMessage from "@/hooks/useToastMessage";

import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { FormHelperText } from "@mui/material";

import Buttons from '@/components/ui/Buttons';
import { loginUser } from '@/services/api/firebaseAuth';
import Spinner from '@/components/ui/Spinner';
import {
  LoginDefault,
  Login,
  type LoginModel,
  type UserModel,
} from "@/model/User.model";
import WEB_ROUTES from '@/routes/routes';


const LoginForm = () => {
  const navigate = useNavigate();
  const {ToastError,ToastSuccess} = useToastMessage();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prev => !prev) 
  const handleMouseDownPassword = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

 const {
   register,
   handleSubmit,
   formState: { errors, isSubmitting },
 } = useForm<LoginModel>({
   defaultValues: LoginDefault,
   resolver: zodResolver(Login),
 });
  
  const handleSignIn = async(data:UserModel) => {
    const {success,error} = await loginUser(data);
      if (!success) {
        ToastError(`${error?.code}`);
        return;
      } 
      ToastSuccess("Login Succesfully");
      navigate(WEB_ROUTES.ADMIN.DOCTOR,{replace:true});   
  }
    
  return (
    <>
      <h1 className="font-bold text-gray-500 text-md md:text-lg/relaxed py-2 md:py-2.5">
        Login Account
      </h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <TextField
              fullWidth
              {...register("email")}
              id="outlined-basic"
              variant="outlined"
              label="Email"
              size="small"
              data-testid={"email-input"}
              error={errors.email && true}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.password}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                data-testid="password-input"
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
                label="Password"
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <div className="text-center">
              {isSubmitting ? (
                <Spinner isDefault={false} height={20} width={20} />
              ) : (
                <Buttons
                  type="submit"
                  isDisabled={isSubmitting}
                  variant="contained"
                  size="medium"
                  className="normal-case! w-full md:w-[300px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
                >
                  Sign In Account
                </Buttons>
              )}

              <div className="font-bold mt-1.5 tracking-wide">
                <p className="  text-[10px] text-gray-600/75">
                  Dont have an account?{" "}
                  <Link
                    to="/register"
                    className="text-(--color-quarternary) ..."
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default LoginForm