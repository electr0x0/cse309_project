'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import Lottie from 'lottie-react'

import logo from '@assets/lotties/patient_anim.json'

const CongratulationsJohn = () => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.5'>
              Welcome Patient X 🎉
            </Typography>
            <Typography variant='subtitle1' className='mbe-2'>
              You had a health checkup
            </Typography>
            <Typography variant='h4' color='primary.main' className='mbe-1'>
              4 days ago
            </Typography>
            <Button variant='contained' color='primary'>
              View all Reports
            </Button>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <div className='relative bs-full is-full'>
            <Lottie animationData={logo} />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CongratulationsJohn
