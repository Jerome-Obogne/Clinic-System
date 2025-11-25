import { vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {forgotUserPassword} from '../../src/services/api/firebaseAuth'
import ForgotPasswordForm from '../../src/features/auth/ForgotPasswordForm'
import { ToastContainer } from "react-toastify";
import { render,screen, waitFor } from "@testing-library/react";

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock("../../src/services/api/firebaseAuth", () => ({
  forgotUserPassword: vi.fn(),
}));

describe("Forgot Password form", () => {
    it('should run the forgot password actions ', async () => {

        vi.mocked(forgotUserPassword).mockResolvedValue({
            success:true,
        })

     render(
       <>
         <ForgotPasswordForm />
         <ToastContainer />
       </>
     );

     await userEvent.type(screen.getByLabelText(/email/i),"renfah29@gmail.com")
     await userEvent.click(screen.getByRole("button", { name: /submit/i }));

     await waitFor(() => {
        expect(forgotUserPassword).toHaveBeenCalled();
     })

     const successNotif = await screen.findByText(/Check your email for instructions to reset your password./i);
     expect(successNotif).toBeInTheDocument();
    })

});
