import {memo,useMemo} from 'react'
import { Badge, Box, Button, Grid, Typography,TextField } from '@mui/material'
import {DateCalendar,PickersDay} from "@mui/x-date-pickers";
import { Controller, useForm } from 'react-hook-form'
import Buttons from '@/components/ui/Buttons';
import { timeSlot } from '@/utils/mockdata';
import { CalendarMonth } from "@mui/icons-material";
import { MuiPhone } from '@/features/patient/AppointmentForm/MuiPhoneInput';
import type {  CustomDayProps,InfoItemProps,AppointmentInputProps }  from "@/model/doctor/book-appoinment-model";



const highlightedDates = [
  "2026-03-04",
  "2026-03-05",
  "2026-03-06",
];




export const AppointmentForm = () => {
  const { control,handleSubmit } = useForm<any>({
    defaultValues: {
      date: null,
      times: [""],
    },
  });

  const onSubmit=(data:any) =>{
    console.log(data)
  }
 
  const highlightedSet = useMemo(() => new Set(highlightedDates), []);

  return (
    <>
      <div className="max-w-[1200px]!">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: { xs: "center", sm: "space-around" } }}
          >
            <Grid size={{ xs: 10, sm: 12, md: 6, lg: 6 }}>
              <Controller
                control={control}
                name={"date"}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DateCalendar
                      slots={{
                        day: CustomDay,
                      }}
                      slotProps={{
                        day: { dateRecords: highlightedSet } as any,
                      }}
                      onChange={onChange}
                      value={value}
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        "& .MuiPickersDay-root": {
                          width: 48,
                          height: 48,
                          fontSize: "1rem",
                        },
                        "& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer":
                          {
                            justifyContent: "space-around",
                          },
                      }}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid size={{ xs: 10, sm: 12, md: 6, lg: 5 }}>
              {control._formValues.times.map((_: unknown, index: number) => (
                <Controller
                  key={index}
                  control={control}
                  name={`times.${index}`}
                  render={({ field: { value, onChange } }) => (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "repeat(2, 1fr)", // mobile
                          sm: "repeat(3, 1fr)", // tablet
                          md: "repeat(3, 1fr)", // desktop
                        },
                        gap: 2,
                        mt: 6,
                      }}
                    >
                      {timeSlot.map((time, index) => (
                        <Button
                          key={time}
                          variant={value === time ? "contained" : "outlined"}
                          sx={{
                            ...(Math.floor(index / 3) === 2 && {
                              mt: { xs: "10px", sm: "0px", md: "20px" },
                            }),
                          }}
                          className="hover:bg-[color:var(--color-quarternary)]! hover:text-white! whitespace-nowrap"
                          size="large"
                          onClick={() => onChange(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </Box>
                  )}
                />
              ))}
            </Grid>

          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ justifyContent: { xs: "center", sm: "space-around" }, my: 2 }}
          >
            <Grid size={{ xs: 10, sm: 12, md: 6, lg: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <InfoItem
                  icon={<CalendarMonth />}
                  title="Thursday 10/29/2000"
                  subtitle="Tomorrow"
                />

                <InfoItem
                  icon={<CalendarMonth />}
                  title="11:00 Am"
                  subtitle="Start time"
                />

                <FormInput>
                  <TextField
                    data-testid="guardian_outline"
                    label="Patient Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    // error={errors.guardian_name && true}
                    // helperText={errors.guardian_name?.message}
                  />
                </FormInput>

                <FormInput>
                  <TextField
                    data-testid="guardian_outline"
                    label="Guardian Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    // error={errors.guardian_name && true}
                    // helperText={errors.guardian_name?.message}
                  />
                </FormInput>

                <FormInput>
                  <MuiPhone
                    value={""}
                    onChange={() => {}}
                    errorData={undefined}
                    helperMessage={""}
                  />
                </FormInput>

              </Box>
            </Grid>

            <Grid size={{ xs: 10, sm: 12, md: 6, lg: 5 }} sx={{ alignContent: "center" }}>

              <Typography variant="subtitle1" gutterBottom>Appointment Reason</Typography>

              <TextField
                data-testid="concerns_outline"
                variant="outlined"
                // error={errors.concerns && true}
                // helperText={errors.concerns?.message}
                fullWidth
                multiline
                rows={5}
              />
              <Box sx={{ m: 2, gap: 2, display: "flex", flexWrap: "wrap" }}>

                <Buttons
                  type="submit"
                  className="!p-[8px] normal-case! w-full md:w-[310px] bg-[color:var(--color-quarternary)]! hover:text-white! text-white!"
                >
                  Request Appointment
                </Buttons>

                <Buttons
                  type="submit"
                  className="!p-[8px] normal-case! w-full md:w-[100px]  bg-white!  text-black!"
                >
                  Cancel
                </Buttons>

              </Box>

            </Grid>

          </Grid>
        </form>
      </div>
    </>
  );
}



export const CustomDay = memo((props: CustomDayProps) => {
  const { day, dateRecords, ...other } = props;
  const formatted = day.format("YYYY-MM-DD");
  const isHighlighted = dateRecords?.has(formatted);
  return (
    <Badge overlap="circular" badgeContent={isHighlighted ? "📍" : undefined}>
      <PickersDay
        {...other}
        day={day}
        sx={{
          ...(isHighlighted && {
            color: "black",
            "&:hover": {
              backgroundColor: "var(--color-quarternary)",
            },
          }),
        }}
      />
    </Badge>
  );
});

export const InfoItem = ({ icon, title, subtitle }: InfoItemProps) => {
  return (
    <>
      <div className="flex item-start gap-2">
        <span>{icon}</span>
        <div className="flex flex-col  gap-2 mb-3">
          <h1>{title || "No selected data"} </h1>
          <small>{subtitle || "No selected data"}</small>
        </div>
      </div>
    </>
  );
};

export const FormInput = ({ children }: AppointmentInputProps) => {
  return (
    <>
      <div className="flex content-center gap-2 w-full mb-3">{children}</div>
    </>
  );
};
