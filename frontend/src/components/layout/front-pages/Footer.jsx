'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const Footer = ({ mode }) => {
  // Vars
  const footerImageLight = '/images/front-pages/footer-bg-light.png'
  const footerImageDark = '/images/front-pages/footer-bg-dark.png'

  // Hooks
  const dashboardImage = useImageVariant(mode, footerImageLight, footerImageDark)

  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative'>
        <img src={dashboardImage} alt='footer bg' className='absolute inset-0 is-full bs-full object-cover -z-[1]' />
        <div className={classnames('plb-12 text-white', frontCommonStyles.layoutSpacing)}>
          <Grid container rowSpacing={10} columnSpacing={12}>
            {/* Brand Info */}
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col items-start gap-6'>
                <Link href='/front-pages/landing-page'>
                  <Logo color='var(--mui-palette-common-white)' />
                </Link>
                <Typography color='white' className='md:max-is-[390px] opacity-[78]'>
                  Transforming healthcare with cutting-edge technology. Our system simplifies health management for
                  providers and patients alike.
                </Typography>
                <div className='flex items-end'>
                  <CustomTextField
                    size='small'
                    className={styles.inputBorder}
                    label='Subscribe to health updates'
                    placeholder='Your email address'
                    sx={{
                      '& .MuiInputBase-root': {
                        borderStartEndRadius: '0 !important',
                        borderEndEndRadius: '0 !important',
                        '&:not(.Mui-focused)': {
                          borderColor: 'rgb(var(--mui-mainColorChannels-dark) / 0.22)'
                        },
                        '&.MuiFilledInput-root:not(.Mui-focused):not(.Mui-disabled):hover': {
                          borderColor: 'rgba(255 255 255 / 0.6) !important'
                        }
                      }
                    }}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      borderStartStartRadius: 0,
                      borderEndStartRadius: 0
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </Grid>

            {/* Links Section */}
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[92]'>
                Quick Links
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography component={Link} href='/front-pages/features' color='white' className='opacity-[78]'>
                  Features
                </Typography>
                <Typography component={Link} href='/front-pages/pricing' color='white' className='opacity-[78]'>
                  Pricing
                </Typography>
                <Typography component={Link} href='/front-pages/support' color='white' className='opacity-[78]'>
                  Support
                </Typography>
                <Typography component={Link} href='/pages/about-us' color='white' className='opacity-[78]'>
                  About Us
                </Typography>
              </div>
            </Grid>

            {/* Products Section */}
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[92]'>
                Services
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography component={Link} href='/front-pages/hms-dashboard' color='white' className='opacity-[78]'>
                  HMS Dashboard
                </Typography>
                <Typography component={Link} href='/front-pages/appointments' color='white' className='opacity-[78]'>
                  Appointment Management
                </Typography>
                <Typography component={Link} href='/front-pages/ai-assistance' color='white' className='opacity-[78]'>
                  AI Assistance
                </Typography>
                <Typography component={Link} href='/front-pages/patient-portal' color='white' className='opacity-[78]'>
                  Patient Portal
                </Typography>
              </div>
            </Grid>

            {/* App Section */}
            <Grid item xs={12} sm={6} lg={3}>
              <Typography color='white' className='font-medium mbe-6 opacity-[92]'>
                Download our App
              </Typography>
              <div className='flex flex-col gap-4'>
                <Link className='bg-[#282C3E] bs-[56px] is-[211px] rounded'>
                  <div className='flex items-center pli-5 plb-[7px] gap-6'>
                    <img src='/images/front-pages/apple-icon.png' alt='apple store' className='bs-[34px]' />
                    <div className='flex flex-col items-start'>
                      <Typography variant='body2' color='white' className='capitalize opacity-[75]'>
                        Download on the
                      </Typography>
                      <Typography color='white' className='font-medium capitalize opacity-[92]'>
                        App Store
                      </Typography>
                    </div>
                  </div>
                </Link>
                <Link className='bg-[#282C3E] bs-[56px] is-[211px] rounded'>
                  <div className='flex items-center pli-5 plb-[7px] gap-6'>
                    <img src='/images/front-pages/google-play-icon.png' alt='Google play' className='bs-[34px]' />
                    <div className='flex flex-col items-start'>
                      <Typography variant='body2' color='white' className='opacity-[75]'>
                        Download on the
                      </Typography>
                      <Typography color='white' className='font-medium opacity-[92]'>
                        Google Play
                      </Typography>
                    </div>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='bg-[#211B2C]'>
        <div
          className={classnames(
            'flex flex-wrap items-center justify-center sm:justify-between gap-4 plb-[15px]',
            frontCommonStyles.layoutSpacing
          )}
        >
          <p className='text-white text-[13px]'>
            <span>{`© ${new Date().getFullYear()}, Empowering Healthcare `}</span>
            <span>{`❤️`}</span>
            <span>{` by `}</span>
            <Link href='https://iub.edu.bd/' target='_blank' className='font-medium text-white'>
              electr0 & Beastcake
            </Link>
          </p>
          <div className='flex gap-6 items-center'>
            <IconButton component={Link} size='small' href='#' target='_blank'>
              <i className='tabler-brand-facebook-filled text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='#' target='_blank'>
              <i className='tabler-brand-twitter-filled text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='#' target='_blank'>
              <i className='tabler-brand-linkedin-filled text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='#' target='_blank'>
              <i className='tabler-brand-youtube-filled text-white text-lg' />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
