// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HealingIcon from '@mui/icons-material/Healing'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MedicationIcon from '@mui/icons-material/Medication'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const feature = [
  {
    icon: <LocalHospitalIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Heart Health Monitoring',
    description: 'Continuous monitoring, risk assessment, and intervention strategies for heart health.'
  },
  {
    icon: <PermIdentityIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Patient Demographic Data',
    description: 'Manage patient demographic data efficiently and securely.'
  },
  {
    icon: <HealingIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Patient Diagnosis Data',
    description: 'Manage patient diagnosis data with ease.'
  },
  {
    icon: <AccountBoxIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Physicians Information',
    description: 'Manage relevant physicians’ information.'
  },
  {
    icon: <HomeWorkIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Facilities Information',
    description: 'Manage hospitals, diagnosis centers, and other related facilities information.'
  },
  {
    icon: <RestaurantIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Diet and Test Recommendations',
    description: 'Recommend appropriate diet, tests, and facilities as per the patient’s heart condition.'
  },
  {
    icon: <MedicationIcon style={{ color: 'var(--mui-palette-primary-main)', fontSize: 40 }} />,
    title: 'Medicine Tracking',
    description: 'Keep track of prescribed medicines and allow physicians to update based on recent visits.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 pbs-12 pbe-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='Useful Features' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                  Comprehensive Tools for your Health
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                  />
                </span>{' '}
                Monitoring and Management
              </Typography>
            </div>
            <Typography className='text-center'>
              Our system offers all the necessary tools to monitor and manage your health effectively.
            </Typography>
          </div>
        </div>
        <div>
          <Grid container spacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  {item.icon}
                  <Typography className='mbs-2' variant='h5'>
                    {item.title}
                  </Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
