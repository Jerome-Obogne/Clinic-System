import { memo } from "react";
import {Stack } from "@mui/material";
import Buttons from "@/components/ui/Buttons";
import ButtonSubmission from "@/components/ui/ButtonSubmission";
import type { AppointmentModel } from "@/model/Appointment.model";

type AppointmentProps = {
  data?: AppointmentModel;
  onSubmit: () => void;
  isSubmit?: boolean
};

const ConfirmAppointment = ({ data, onSubmit, isSubmit= false }: AppointmentProps) => {
  return (
    <>
      <div className="" data-testid="ConfirmAppointment">
        <h1 className="text-white text-base sm:text-sm md:text-[22px] p-7">
          PREVIEW INFORMATION
        </h1>

        <div className="bg-white h-auto p-8 rounded-t-[40px] ">
          <div className="mb-5">
            <h2 className="py-2 font-medium text-[var(--color-quarternary)] text-base sm:text-[18px]">
              DATE AND TIME SCHEDULE
            </h2>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold">Date: </h5>
              <p>{data?.date}</p>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold">Time: </h5>
              <p>{data?.time}</p>
            </Stack>
          </div>
          <div className="mb-5">
            <h2 className="py-2 font-medium text-[var(--color-quarternary)] text-base sm:text-[18px]">
              PATIENT INFORMATION
            </h2>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold">Patient Full Name: </h5>
              <p>{data?.name}</p>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold">Patient Guardian Name: </h5>
              <p> {`${data?.guardian_name}`}</p>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold ">Phone Number: </h5>
              <p> {`${data?.contact_no}`}</p>
            </Stack>
          </div>
          <div className="">
            <h2 className="py-2 font-medium text-[var(--color-quarternary)] text-base sm:text-[18px]">
              Reason for Appointment
            </h2>
            <Stack direction={"row"} spacing={1}>
              <h5 className="font-bold">{`${data?.concerns}`} </h5>
            </Stack>
          </div>

          <div className="mt-5">
            <ButtonSubmission
              isSubmitting={isSubmit}
              children={
                <Buttons
                  onClick={onSubmit}
                  type="submit"
                  variant="contained"
                  className="!p-[8px] normal-case! w-full bg-[color:var(--color-quarternary)]! hover:bg-black! hover:text-white! text-white! font-bold! text-md"
                  size="large"
                >
                  Confirm Appointment
                </Buttons>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ConfirmAppointment);
