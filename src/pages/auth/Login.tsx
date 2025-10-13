import AuthForm from '@/components/ui/AuthForm'
import LoginForm from '@/features/auth/LoginForm'

const Login = () => {
  return (
    <>
        <AuthForm title = "Sanchez Pediatric Care">
           <LoginForm/>
        </AuthForm>
    </>
  )
}

export default Login