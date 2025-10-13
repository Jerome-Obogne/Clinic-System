import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import Buttons from '@/components/ui/Buttons';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '@/services/api/firebaseAuth';
import useToastMessage from '@/hooks/useToastMessage';


const LoginForm = () => {
  const navigate = useNavigate();
  const {ToastError} = useToastMessage();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prev => !prev) 
  const handleMouseDownPassword = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  const handleSignIn = async() => {
    const response = await loginUser({
      email: "showme@gmail.com",
      password: "showme@gmail.com",
    });
    
    if (!response.success) {
      ToastError(`Registration problem try again : ${response.error?.message}`);
    }
      navigate("/admin/register");
  
  }
    
  return (
    <>
      <h1 className="font-bold text-gray-500 text-md md:text-lg/relaxed py-2 md:py-2.5">
        Login Account
      </h1>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Username"
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <div className="text-center">
            <Buttons
              variant="contained"
              size="medium"
              className="normal-case! w-full md:w-[300px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
              onClick={handleSignIn}
            >
              Sign In Account
            </Buttons>
            <div className="font-bold mt-1.5 tracking-wide">
              <p className="  text-[10px] text-gray-600/75">
                Dont have an account?{" "}
                <Link to="/register" className="text-(--color-quarternary) ...">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm