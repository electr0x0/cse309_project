import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../../../../../components/dialogue/DialogCloseButton'

const facilityTypes = ['Diagnostics Center', 'Pharmacy', 'Hospital']

const FacilityRecommendationForm = ({ open, setOpen }) => {
  const [facilityData, setFacilityData] = useState({
    distance: '',
    facilityTypes: [],
    specialization: '',
    avgCost: '',
    insuranceCovered: false,
    avgRatings: ''
  })

  const handleChange = prop => event => {
    if (prop === 'facilityTypes') {
      const selectedFacilityTypes = event.target.value

      setFacilityData({ ...facilityData, facilityTypes: selectedFacilityTypes })
    } else if (prop === 'insuranceCovered') {
      setFacilityData({ ...facilityData, [prop]: event.target.checked })
    } else {
      setFacilityData({ ...facilityData, [prop]: event.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Handle form submission logic here
    console.log('Form submitted with data:', facilityData)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='text-center'>
        Facility Recommendation Parameters
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Distance (in km)'
                name='distance'
                variant='outlined'
                value={facilityData.distance}
                onChange={handleChange('distance')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Facility Types'
                name='facilityTypes'
                variant='outlined'
                value={facilityData.facilityTypes}
                onChange={handleChange('facilityTypes')}
                SelectProps={{
                  multiple: true,
                  renderValue: selected => selected.join(', ')
                }}
              >
                {facilityTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Specialization'
                name='specialization'
                variant='outlined'
                placeholder='Cardiology, Orthopedics, etc.'
                value={facilityData.specialization}
                onChange={handleChange('specialization')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='text'
                label='Average Cost'
                name='avgCost'
                variant='outlined'
                value={facilityData.avgCost}
                onChange={handleChange('avgCost')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={facilityData.insuranceCovered} onChange={handleChange('insuranceCovered')} />}
                label='Insurance Covered'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Average Ratings'
                name='avgRatings'
                variant='outlined'
                value={facilityData.avgRatings}
                onChange={handleChange('avgRatings')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit} type='submit'>
            Submit
          </Button>
          <Button variant='outlined' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FacilityRecommendationForm
