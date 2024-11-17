import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

import CustomTextField from '@core/components/mui/TextField'

import DialogCloseButton from '../../../../../components/dialogue/DialogCloseButton'

const goals = ['Lose Weight', 'Gain Muscle', 'Maintain Weight']

const DietRecommendationForm = ({ open, setOpen, currentWeight, data }) => {
  const [dietData, setDietData] = useState({
    weightGoal: '',
    duration: '',
    selectedGoals: []
  })

  const [validationErrors, setValidationErrors] = useState({
    weightGoal: false,
    duration: false
  })

  const handleChange = prop => event => {
    setDietData({ ...dietData, [prop]: event.target.value })
    setValidationErrors({ ...validationErrors, [prop]: false })
  }

  const handleGoalSelection = goal => {
    const selectedIndex = dietData.selectedGoals.indexOf(goal)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...dietData.selectedGoals, goal]
    } else {
      newSelected = dietData.selectedGoals.filter(item => item !== goal)
    }

    setDietData({ ...dietData, selectedGoals: newSelected })
  }

  const handleClose = () => {
    setDietData({
      weightGoal: '',
      duration: '',
      selectedGoals: []
    })
    setValidationErrors({
      weightGoal: false,
      duration: false
    })
    setOpen(false) // Close dialog
  }

  const handleSubmit = () => {
    if (!dietData.weightGoal || !dietData.duration) {
      setValidationErrors({
        weightGoal: !dietData.weightGoal,
        duration: !dietData.duration
      })

      return
    }

    setOpen(false) // Close dialog
  }

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={handleClose} // Pass the function reference here
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='text-center'>
        Diet Recommendation Parameters
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1'>Current Weight: {currentWeight} kg</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Weight Goal (kg)'
                name='weightGoal'
                variant='outlined'
                value={dietData.weightGoal}
                onChange={handleChange('weightGoal')}
                error={validationErrors.weightGoal}
                helperText={validationErrors.weightGoal ? 'Weight Goal is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Duration (weeks)'
                name='duration'
                variant='outlined'
                value={dietData.duration}
                onChange={handleChange('duration')}
                error={validationErrors.duration}
                helperText={validationErrors.duration ? 'Duration is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1'>Select Goals:</Typography>
              {goals.map((goal, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Switch
                      checked={dietData.selectedGoals.indexOf(goal) !== -1}
                      onChange={() => handleGoalSelection(goal)}
                      name={goal}
                    />
                  }
                  label={goal}
                />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSubmit} type='submit'>
            {data ? 'Update' : 'Submit'}
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handleClose} // Pass the function reference here
            type='reset'
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DietRecommendationForm
