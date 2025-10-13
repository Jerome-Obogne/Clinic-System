import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Buttons from '@/components/ui/Buttons';

const ForgotPasswordForm = () => {
  return (
    <>
      <h1 className="font-bold text-gray-500 text-md md:text-lg/relaxed py-2 md:py-2.5">
        Forgot Password Form
      </h1>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <TextField
            fullWidth
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
            <Buttons
              variant="contained"
              size="medium"
              className="normal-case! w-full md:w-[300px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
            >
              Submit
            </Buttons>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPasswordForm