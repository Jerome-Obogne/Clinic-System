import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../src/features/auth/LoginForm";
import { vi } from "vitest";
import { loginUser } from "../../src/services/api/firebaseAuth";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import { MemoryRouter } from "react-router";
import { loginData } from "../../src/utils/mockdata";

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock("../../src/services/api/firebaseAuth", () => ({
  loginUser: vi.fn(),
}));

describe("Login Form", () => {
  it("should render the Login form and provide actions", async () => {

    vi.mocked(loginUser).mockResolvedValue({
      success: true,
      error: null,
    });


    render(
      <MemoryRouter>
        <LoginForm />
        <ToastContainer />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, loginData.email);

    const passwordInput = screen.getByLabelText("Password", {selector: "input",});
    await userEvent.type(passwordInput, loginData.password);

    const loginButton = screen.getByRole("button", {name: /sign in account/i,});
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled()
    });

    const successNotif = await screen.findByText(/login succesfully/i);
    expect(successNotif).toBeInTheDocument();
  });


  it("should validate the empty field of Login Form", async() => {
    render(
      <>
        <MemoryRouter>
          <LoginForm />
          <ToastContainer />
        </MemoryRouter>
      </>
    );

      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput," ")

      const loginButton = screen.getByRole("button", { name: /sign in account/i });
      await userEvent.click(loginButton)
      
      const emailInputHelperText = screen.queryByText(/Invalid Email Address/i)    
      expect(emailInputHelperText).toBeInTheDocument();
  })
});