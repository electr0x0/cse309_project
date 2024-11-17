// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Context Imports
import { IntersectionProvider } from '@/contexts/intersectionContext'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import FrontLayout from '@components/layout/front-pages'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Heart Health Monitoring System',
  description: 'Check your heart, record heart rate during sex, alarm police if heart rises >90'
}

const Layout = ({ children }) => {
  // Vars
  const systemMode = getSystemMode()

  return (
    <html id='__next'>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction='ltr'>
          <BlankLayout systemMode={systemMode}>
            <IntersectionProvider>
              <FrontLayout>{children}</FrontLayout>
            </IntersectionProvider>
          </BlankLayout>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
