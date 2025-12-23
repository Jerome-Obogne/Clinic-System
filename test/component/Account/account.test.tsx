import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LocalizationProviders from "../../../src/services/provider/LocalizationProviders";
import { ToastContainer } from "react-toastify";
import Account from '../../../src/pages/patient/Account'
import "@testing-library/jest-dom";
import {vi} from 'vitest'
import { onSnapshot } from "firebase/firestore";


// Integration test for Account Page 

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


describe("Account Page Components", () => {
  it("should render account and change password component", async() => {
 const fakeData = [
      {data: () => ({ title: "query1" }),},
      {data: () => ({ title: "query2" }),},
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
          <Account />
        </LocalizationProviders>
        <ToastContainer />
      </MemoryRouter>
    );


    const accountComponent = screen.getByTestId('account-component');
    const changePasswordComponent = screen.getByTestId("changePass-component");

    expect(accountComponent).toBeInTheDocument();
    expect(changePasswordComponent).toBeInTheDocument();
  });
});
