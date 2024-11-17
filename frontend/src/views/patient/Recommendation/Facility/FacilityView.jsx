import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import IconButton from '@mui/material/IconButton'

import CustomAvatar from '@core/components/mui/Avatar' // Import CustomAvatar component

const ScrollableCardContent = styled(CardContent)({
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 64px)', // Adjust the height as necessary
  padding: '24px'
})

const FacilityView = ({ facilityData, open, handleClose }) => {
  const { facilityType, name, address, contactNo, mapLocation, distance, reason, rating, reviews } = facilityData

  const handleReset = () => {
    handleClose()
  }

  // Function to get the appropriate icon based on facilityType
  const getFacilityIcon = () => {
    switch (facilityType) {
      case 'Hospital':
        return <i className='tabler-building-hospital' size={50} strokeWidth={1.5} />
      case 'Pharmacy':
        return <i className='tabler-medicine-syrup' size={50} strokeWidth={1.5} />
      case 'Diagnostics Center':
        return <i className='tabler-device-heart-monitor' size={50} strokeWidth={1.5} />
      default:
        return null
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 600, sm: 1000 } } }}
    >
      <Card>
        <ScrollableCardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                  <Typography variant='h5'>
                    {getFacilityIcon()} {`${facilityType}: ${name}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleReset}>
                    <i className='tabler-x' size={24} strokeWidth={1.5} />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider className='mt-4 mb-3' />
            </Grid>
            <Grid item xs={12}>
              <Typography className='font-medium' color='text.primary'>
                Facility Information
              </Typography>
              <Typography>{`Name: ${name}`}</Typography>
              <Typography>{`Address: ${address}`}</Typography>
              <Typography>{`Contact No: ${contactNo}`}</Typography>
              <Typography>{`Distance: ${distance}`}</Typography>
              <Typography>{`Reason for Suggestion: ${reason}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className='font-medium' color='text.primary'>
                Ratings and Reviews
              </Typography>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Rating value={rating} precision={0.5} readOnly icon={<i className={'tabler-star'} />} />
                </Grid>
                <Grid item>
                  <Typography>{`${rating} (${reviews.length} reviews)`}</Typography>
                </Grid>
              </Grid>
              <div className='mt-2'>
                <Typography className='font-medium' color='text.primary'>
                  User Reviews
                </Typography>
                <div className='mt-2'>
                  {reviews.map((review, index) => (
                    <div key={index} className='flex items-center mb-2'>
                      <CustomAvatar />
                      <div className='ml-2'>
                        <Typography variant='body2' color='text.primary' className='font-medium'>
                          User Name
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {review.comment}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography className='font-medium' color='text.primary'>
                Location
              </Typography>
              <iframe
                title={`${name} Map Location`}
                src={mapLocation}
                width='100%'
                height='450'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              ></iframe>
            </Grid>
          </Grid>
        </ScrollableCardContent>
      </Card>
    </Drawer>
  )
}

export default FacilityView
