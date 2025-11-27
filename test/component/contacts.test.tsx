import { vi } from "vitest";
import "@testing-library/jest-dom";
import { addProfile } from "../../src/services/api/firebaseDb";
import { render,screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LocalizationProviders from "../../src/services/provider/LocalizationProviders";
import { ToastContainer } from "react-toastify";
import Contacts from '../../src/pages/patient/Contacts'
import userEvent from "@testing-library/user-event";


vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock("../../src/services/api/firebaseDb",()=> ({
    addProfile:vi.fn()
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

describe("Contact Form", () => {
    it('should render the Contact Form and perform add action',async() => {
        vi.mocked(addProfile).mockResolvedValue({
            success: true,
            error:null
        })
        render(
          <>
            <MemoryRouter>
              <LocalizationProviders>
                <Contacts />
              </LocalizationProviders>
              <ToastContainer />
            </MemoryRouter>
          </>
        );

        const nameInput = screen.getByLabelText(/name/i);
        const contactNoInput = screen.getByTestId('contact_no');
        const concernInput = screen.getByLabelText(/enter your appointment reason/i);
        const button = screen.getByRole('button',{name:/send message/i})

        await userEvent.type(nameInput,'John Doe');
        await userEvent.type(contactNoInput, "+639630280951");
        await userEvent.type(concernInput, "Getting my concerns in system");
        await userEvent.click(button)

        await waitFor(() => {
            expect(addProfile).toHaveBeenCalled()
        })
        const successNotif =  await screen.findByText(/your concern has been sent successfully. Thank you!/i);
        expect(successNotif).toBeInTheDocument();
        
       

    })

});
