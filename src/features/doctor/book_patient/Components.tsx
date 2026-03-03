import {memo,useMemo} from 'react'
import { Badge, Box, Button, Grid } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, type PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Controller, useForm } from 'react-hook-form'
import Buttons from '@/components/ui/Buttons';
import { timeSlot } from '@/utils/mockdata';

type CustomDayProps = PickersDayProps & {
  dateRecords?: Set<string>;
};

type AppointmentProps = {
  appointmentDates: any;
  onSubmit: (data: any) => void;
  records?:any    // this will  identify if edit and add mode
 
};

const highlightedDates = [
  "2026-03-04",
  "2026-03-05",
  "2026-03-06",
];


 export const CustomDay = memo((props: CustomDayProps) => {
    const { day, dateRecords, ...other } = props;
    const formatted = day.format("YYYY-MM-DD"); 
    const isHighlighted = dateRecords?.has(formatted);
    return (
      <Badge
        overlap="circular"
        badgeContent={isHighlighted ? "📍" : undefined}
      >
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
  })

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
          <Grid container spacing={2} sx={{ justifyContent: { xs: "center" } }}>
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
            <Grid size={{ xs: 10, sm: 12, md: 6, lg: 6 }}>
              <div>
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
              </div>
            </Grid>
            <Buttons
              type="submit"
              variant="contained"
              className="!p-[8px] normal-case! w-full md:w-[250px] bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white!"
              size="large"
            >
              SAMPLE TEST BUTTON
            </Buttons>
          </Grid>
        </form>
      </div>
    </>
  );
}

