import "@testing-library/jest-dom";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import LocalizationProviders from "../../../src/services/provider/LocalizationProviders";
import  ConfirmAppointment from '../../../src/features/patient/AppointmentForm/ConfirmAppointment'
import { render,screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));


describe("Confirm Appointment", () => {
  it("should render the Confirm Appointment Component", async () => {
    const handleSubmit = vi.fn()
    render(
      <>
        <MemoryRouter>
          <LocalizationProviders>
            <ConfirmAppointment onSubmit={handleSubmit}   />
          </LocalizationProviders>
          <ToastContainer />
        </MemoryRouter>
      </>
    );
    const previewInfo = screen.getByText(/preview information/i)
    expect(previewInfo).toBeInTheDocument()       

  });
  
  it('should call the submit function',async () => {
     const handleSubmit = vi.fn();
     render(
       <>
         <MemoryRouter>
           <LocalizationProviders>
             <ConfirmAppointment onSubmit={handleSubmit} />
           </LocalizationProviders>
           <ToastContainer />
         </MemoryRouter>
       </>
     );

     const button = screen.getByRole('button',{name:/confirm appointment/i})
     await userEvent.click(button)
     expect(handleSubmit).toHaveBeenCalled()
  })
});
