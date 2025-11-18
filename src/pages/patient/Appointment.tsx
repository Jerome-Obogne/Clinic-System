import AppointmentForm from '@/features/patient/AppointmentForm'
import LocalizationProviders from '@/services/provider/LocalizationProviders'

const Appointment = () => {
  return (
    <LocalizationProviders>
        <AppointmentForm/>
    </LocalizationProviders>
  )
}

export default Appointment