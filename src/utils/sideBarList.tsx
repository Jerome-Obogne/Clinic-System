import WEB_ROUTES from "@/routes/routes"
import {
  AddHomeWork,
  ImportContacts,
  PendingActions,
  PersonalInjury,
  ContactMail,
  DataExploration,
  CalendarMonth,
  ContactPage,
  Person,
} from "@mui/icons-material";

const SideBarList = {
  Doctor: [
    {
      id: 1,
      title: "Home",
      routes: WEB_ROUTES.ADMIN.DOCTOR,
      icon: <AddHomeWork />,
    },
    {
      id: 2,
      title: "Appointments",
      routes: WEB_ROUTES.AUTH.FORGOT_PASSWORD,
      icon: <ImportContacts />,
    },
    {
      id: 3,
      title: "Pendings",
      routes: WEB_ROUTES.ADMIN.DOCTOR_PENDING,
      icon: <PendingActions />,
    },
    {
      id: 4,
      title: "Book Patients",
      routes: WEB_ROUTES.AUTH.LOGIN,
      icon: <PersonalInjury />,
    },

    {
      id: 6,
      title: "Visit Records",
      routes: WEB_ROUTES.AUTH.LOGIN,
      icon: <DataExploration />,
    },
    {
      id: 7,
      title: "Accounts",
      routes: WEB_ROUTES.AUTH.SIGNUP,
      icon: <ContactMail />,
    },
  ],
  Patient: [
    {
      id: 8,
      title: "Appointment",
      routes: WEB_ROUTES.PATIENT.APPOINTMENT,
      icon: <CalendarMonth />,
    },
    {
      id: 9,
      title: "Contacts",
      routes: WEB_ROUTES.PATIENT.CONTACTS,
      icon: <ContactPage />,
    },
    {
      id: 9,
      title: "Change Password",
      routes: WEB_ROUTES.PATIENT.ACCOUNT,
      icon: <Person />,
    },
  ],
};

export default SideBarList