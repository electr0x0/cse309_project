// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode, getDemoName } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
