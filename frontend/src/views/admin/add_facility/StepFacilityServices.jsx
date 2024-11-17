// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const servicesArray = [
  'Emergency',
  'Outpatient Services',
  'Inpatient Services',
  'Surgery',
  'Radiology',
  'Laboratory',
  'Pharmacy',
  'ICU',
  'Rehabilitation',
  'Blood Bank',
  'Ambulance Service'
]

const StepFacilityServices = ({ activeStep, handleNext, handlePrev, steps }) => {
  // States
  const [services, setServices] = useState(['Emergency', 'Outpatient Services'])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Facility Name' placeholder='ABC Hospital' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Facility Type' placeholder='Hospital' disabled />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Number of Beds' placeholder='150' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Number of Doctors' placeholder='50' />
      </Grid>
      <Grid item xs={12}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={services}
          onChange={(event, value) => setServices(value)}
          id='select-services'
          options={servicesArray}
          defaultValue={services}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Services Provided' />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => <Chip label={option} size='small' {...getTagProps({ index })} key={index} />)
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Is 24/7 Service Available?</FormLabel>
          <RadioGroup defaultValue='yes'>
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Is Ambulance Service Available?</FormLabel>
          <RadioGroup defaultValue='yes'>
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepFacilityServices
