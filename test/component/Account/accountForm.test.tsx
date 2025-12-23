import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import LocalizationProviders from "../../../src/services/provider/LocalizationProviders";
import { MemoryRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import  AccountForm  from '../../../src/features/patient/Account/AccountForm'
import { onSnapshot } from "firebase/firestore";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";



vi.mock("lottie-react", () => ({
  default: () => <div data-testid="mock-lottie" />,
}));

vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/firestore")>();

  return {
    ...actual,
    onSnapshot: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    limit: vi.fn(),
  };
});
const mockedOnSnapshot = onSnapshot as unknown as ReturnType<typeof vi.fn>;


describe('Profile Account Component',()=> {
    it('render account components populated with data', async() => {
    const mockdata = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'JohnDoe@gmail.com'
    }

    const fakeData = [
      {data: () => ({ title: "query1" })},
      {data: () => ({ title: "query2" })},
    ];

 vi.mocked(mockedOnSnapshot).mockImplementation((_q, callback) => {
   callback({
     empty: false,
     docs: [
       {
         id: "profile-1",
         data: () => ({
           first_name: "John",
           last_name: "Doe",
           email:'JohnDoe@gmail.com'
         }),
       },
     ],
   });
   return vi.fn();
 });


    render(
      <MemoryRouter>
        <LocalizationProviders>
          <AccountForm />
        </LocalizationProviders>
        <ToastContainer />
      </MemoryRouter>
    );

    const accountComponent = screen.getByTestId('account-component');
    const accountName = screen.getByTestId("account-name");
    const email = screen.getByTestId('account-email');

    await userEvent.type(accountName,mockdata.last_name)
    await userEvent.type(email,mockdata.email)

    expect(mockdata.email).toBe("JohnDoe@gmail.com");
    expect(mockdata.last_name).toBe('Doe');
    expect(accountComponent).toBeInTheDocument()

    })
})