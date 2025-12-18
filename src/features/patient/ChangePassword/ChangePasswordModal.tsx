import { useState } from "react";
import { passwordCheckerList } from "@/utils/mockdata";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  OutlinedInput,
} from "@mui/material";
import PasswordContent from "./PasswordContent";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ButtonSubmission from "@/components/ui/ButtonSubmission";
import Buttons from "@/components/ui/Buttons";

const ChangePasswordModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="p-5 ">
        <div className="flex flex-wrap justify-center content-between">
          <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[40%]">
            <h1 className="text-[18px] sm:text-[22px] md:text-[40px] font-semibold">
              Change Password
            </h1>
            <div className="p-2">
              <h5 className="text-base">Password must contain</h5>
              <List>
                {passwordCheckerList.map((data: any) => (
                  <PasswordContent title={data} />
                ))}
              </List>
            </div>
          </div>

          <div className="sm:w-[100%] md:w-[100%] lg:w-[60%] self-center">
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  // error={!!errors.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    data-testid="password-input"
                    //   {...register("password")}
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
                  {/* <FormHelperText>{errors.password?.message}</FormHelperText> */}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  // error={!!errors.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    data-testid="confirm-password-input"
                    //   {...register("password")}
                    id="outlined-adornment-confirm-password"
                    type={"password"}
                    label="Password"
                  />
                  {/* <FormHelperText>{errors.password?.message}</FormHelperText> */}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <div className="text-center">
                  <ButtonSubmission
                    isSubmitting={false}
                    children={
                      <Buttons
                        type="submit"
                        //   isDisabled={isSubmitting}
                        variant="contained"
                        size="medium"
                        className="normal-case! w-full md:w-[300px]  bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
                      >
                        Save
                      </Buttons>
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
