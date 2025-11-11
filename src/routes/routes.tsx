
const appendPatientPrefix = (url:string) => `/patient/${url}`
const appendDocPrefix = (url:string) => `/admin/${url}`
const appendPrefix = (url:string) => `/${url}`

const WEB_ROUTES = {
    AUTH : { 
        SIGNUP : appendPrefix('register'),
        LOGIN: appendPrefix('login'),
        FORGOT_PASSWORD : appendPrefix('forgot-password')
    },
    ADMIN : {
        DOCTOR: appendPrefix('admin'),
        DOCTOR_REGISTER: appendDocPrefix('register')
    } 
} as const

export default WEB_ROUTES