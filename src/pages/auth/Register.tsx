import AuthForm from '@/components/ui/AuthForm'
import RegisterForm from '@/features/auth/RegisterForm'
import LocalizationProviders from '@/services/provider/LocalizationProviders'

const Register = () => {
  return (
    <>
        <LocalizationProviders>
            <AuthForm title='Sanchez Pediatric Care'>   
                <RegisterForm/>     
            </AuthForm>
        </LocalizationProviders>
    </>
  )
}

export default Register