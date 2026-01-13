import '@testing-library/jest-dom'
import { vi } from "vitest";
import { render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ChangePassword from '../../../src/pages/patient/ChangePassword';
import { ToastContainer } from 'react-toastify';
import LocalizationProviders from '../../../src/services/provider/LocalizationProviders';
import userEvent from "@testing-library/user-event";


vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

describe('Account ChangePassword Component',() => {

    it('should render the component and base modal', async () => {
      render(
        <MemoryRouter>
          <LocalizationProviders>
            <ChangePassword />
          </LocalizationProviders>
          <ToastContainer />
        </MemoryRouter>
      );

      const ChangePassComponent = screen.getByTestId("changePass-component");
      const button = screen.getByRole("button", { name: /change password/i });
    
      await userEvent.click(button)

      expect(ChangePassComponent).toBeInTheDocument();
      const modalDialog = screen.getByRole("presentation"); // MUI Modal wrapper
      expect(modalDialog).toBeInTheDocument();
    }),

    it('should not render the base modal component ', () => {
        render(
            <MemoryRouter>
            <LocalizationProviders>
                <ChangePassword />
            </LocalizationProviders>
            <ToastContainer />
            </MemoryRouter>
        );
        
      const ChangePassComponent = screen.getByTestId("changePass-component");
      const button = screen.getByRole("button", { name: /change password/i });
      const modalDialog = screen.queryByRole("presentation");
      expect(modalDialog).not.toBeInTheDocument()
    })


})