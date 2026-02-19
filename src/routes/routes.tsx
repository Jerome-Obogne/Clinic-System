
const appendPatientPrefix = (url:string) => `/patient/${url}`
const appendDocPrefix = (url:string) => `/admin/${url}`
const appendPrefix = (url:string) => `/${url}`

const WEB_ROUTES = {
    ABOUT: appendPrefix('about'),
    AUTH : { 
        SIGNUP : appendPrefix('register'),
        LOGIN: appendPrefix('login'),
        FORGOT_PASSWORD : appendPrefix('forgot-password')
    },
    ADMIN : {
        DOCTOR: appendPrefix('admin'),
        DOCTOR_REGISTER: appendDocPrefix('register'),
        DOCTOR_PENDING: appendDocPrefix('pending'),
        DOCTOR_BOOK_PATIENT:appendDocPrefix('book_patient')
    },
    PATIENT: {
        DASHBOARD: appendPrefix('patient'),
        APPOINTMENT: appendPatientPrefix('appointment'),
        CONTACTS: appendPatientPrefix('contact'),
        ACCOUNT: appendPatientPrefix('account')
    }
} as const

export default WEB_ROUTES