import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {addProfile} from '../../src/services/api/firebaseDb'
import { MemoryRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import Appointment from '../../src/pages/patient/Appointment'
import  LocalizationProviders from '../../src/services/provider/LocalizationProviders'
import {MuiPhone} from '../../src/features/patient/AppointmentForm/MuiPhoneInput'

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock('../../src/services/api/firebaseDb', () => ({
    addProfile: vi.fn(),
}));
vi.mock("../../src/features/patient/AppointmentForm/MuiPhoneInput", () => ({
  MuiPhone: ({ value, onChange, ...props }: any) => {
    return (
      <input
        data-testid="contact_no"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    );
  },
}));

describe('Appointment Form',() => {
    it('should render appointment form to perform add actions', async () => {
        vi.mocked(addProfile).mockResolvedValue({
            success: true,
            error:null,
        })
        render(
          <>
            <MemoryRouter>
              <LocalizationProviders>
                <Appointment />
              </LocalizationProviders>
              <ToastContainer />
            </MemoryRouter>
          </>
        );
        const appointmentDateInput = screen.getByTestId("appointment_date"); 
        const timeInput = screen.getByTestId("time");
        const nameInput = screen.getByLabelText(/patient name/i);
        const guardianNameInput = screen.getByLabelText(/guardian name/i);
        const contactNoInput = screen.getByTestId("contact_no");
        const concernInput = screen.getByLabelText(/enter your appointment reason/i);

        await userEvent.type(appointmentDateInput, "11/25/2025");
        await userEvent.type(timeInput, "04:30:PM");
        await userEvent.type(nameInput,'John Shaw')
        await userEvent.type(guardianNameInput,'Shaw Boulevard')
        await userEvent.type(contactNoInput, "+639630280951");
        await userEvent.type(concernInput, "Concerning Citizen");

        const button = screen.getByRole('button',{name:/book now/i})
        await userEvent.click(button)

        await waitFor(() => {
            expect(addProfile).toHaveBeenCalled()
        });

        const successNotif =  await screen.findByText(/you have succesfully add appointment/i);
        expect(successNotif).toBeInTheDocument()
    })
})
