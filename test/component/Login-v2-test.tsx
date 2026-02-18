import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../src/features/auth/LoginForm";
import { vi } from "vitest";
import { loginUser } from "../../src/services/api/firebaseAuth";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import { MemoryRouter } from "react-router";
import {loginData } from '../../src/utils/mockdata'


const renderLoginTest = () => {
    const renderView = render(
        <>
        <MemoryRouter>
            <LoginForm />
            <ToastContainer />
        </MemoryRouter>
        </>
    );
    const testElements = {
        getLoginButton: screen.getByRole("button", { name: /sign in account/i }),
        getEmailInput: screen.getByLabelText(/email/i),
        getPasswordInput: screen.getByLabelText("Password", { selector: "input" }),
        getEmailHelperText : screen.queryByText(/Invalid Email Address/i),
    };

  return {
    testElements,
    ...renderView,
  };
};

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock("../../src/services/api/firebaseAuth", () => ({
  loginUser: vi.fn(),
}));


describe("Login Form", () => {
  it("should render the Login form and allow user to submit credentials", async () => {
    const { testElements } = renderLoginTest();
   
    vi.mocked(loginUser).mockResolvedValue({
    success: true,
    error: null,
    });
   
    await userEvent.type(testElements.getEmailInput, loginData.email);
    await userEvent.type(testElements.getPasswordInput, loginData.password);
    await userEvent.click(testElements.getLoginButton);
    
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled();
    });

    const toastNotification =  await screen.findByText(/login successfully/i)
    expect(toastNotification).toBeInTheDocument();
  });

  it("should validate the empty field of Login Form", async () => {
    const { testElements } = renderLoginTest();

    await userEvent.type(testElements.getEmailInput, " ");
    await userEvent.click(testElements.getLoginButton);

    expect(testElements.getEmailHelperText).toBeInTheDocument();
  });
});
