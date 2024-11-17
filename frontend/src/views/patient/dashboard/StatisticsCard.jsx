'use client'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import Lottie from 'lottie-react'

import heart from '@assets/lotties/wired-lineal-1249-heart-beat.json'
import steps from '@assets/lotties/wired-lineal-1639-stairs.json'
import chole from '@assets/lotties/wired-lineal-447-water-drop.json'
import pressure from '@assets/lotties/steth4.json'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const data = [
  {
    stats: '72 bpm',
    title: 'Heart Rate',
    color: 'primary',
    icon: 'tabler-heart-rate-monitor',
    anim: heart
  },
  {
    stats: '120/80 mmHg',
    title: 'Blood Pressure',
    color: 'info',
    icon: 'tabler-pulse',
    anim: pressure
  },
  {
    stats: '190 mg/dL',
    title: 'Cholesterol',
    color: 'error',
    icon: 'tabler-droplet',
    anim: chole
  },
  {
    stats: '5,000 steps',
    title: 'Recent Activity',
    color: 'success',
    icon: 'tabler-walk',
    anim: steps
  }
]

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Health Statistics'
        action={
          <Typography variant='subtitle2' color='text.disabled'>
            Updated 1 hour ago
          </Typography>
        }
      />
      <CardContent className='flex justify-between flex-wrap gap-4 md:pbs-10 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]'>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid key={index} item xs className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' size={40} skin='light'>
                <Lottie animationData={item.anim} />
                {/* <i className={item.icon}></i> */}
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography variant='body2'>{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
