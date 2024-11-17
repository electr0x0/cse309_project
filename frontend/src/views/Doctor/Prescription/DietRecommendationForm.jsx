// DietRecommendationForm.js

import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'

import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../../../components/dialogue/DialogCloseButton'

const goals = ['Weight Loss', 'Improved Fitness', 'Lower Cholesterol', 'Better Sleep']

const DietRecommendationForm = ({ open, setOpen, currentWeight, patientName, doctorName, onSubmit }) => {
  const [dietData, setDietData] = useState({
    weightGoal: '',
    duration: '',
    selectedGoals: [],
    description: '',
    exercises: [],
    feedback: [],
    consultation: {
      isNeeded: false,
      interval: '',
      unit: ''
    }
  })

  const [validationErrors, setValidationErrors] = useState({
    weightGoal: false,
    duration: false,
    description: false
  })

  const [goalInput, setGoalInput] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseReps, setExerciseReps] = useState('')
  const [exerciseSets, setExerciseSets] = useState('')

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

  const handleFeedbackChange = (index, event) => {
    const newFeedback = [...dietData.feedback]

    newFeedback[index] = event.target.value
    setDietData({ ...dietData, feedback: newFeedback })
  }

  const addFeedback = () => {
    setDietData({ ...dietData, feedback: [...dietData.feedback, ''] })
  }

  const removeFeedback = index => {
    setDietData({ ...dietData, feedback: dietData.feedback.filter((_, i) => i !== index) })
  }

  const handleGoalInputChange = event => {
    setGoalInput(event.target.value)
  }

  const addGoal = () => {
    if (goalInput && !dietData.selectedGoals.includes(goalInput)) {
      setDietData({ ...dietData, selectedGoals: [...dietData.selectedGoals, goalInput] })
      setGoalInput('')
    }
  }

  const handleExerciseNameChange = event => {
    setExerciseName(event.target.value)
  }

  const handleExerciseRepsChange = event => {
    setExerciseReps(event.target.value)
  }

  const handleExerciseSetsChange = event => {
    setExerciseSets(event.target.value)
  }

  const addExercise = () => {
    if (exerciseName && exerciseReps && exerciseSets) {
      const newExercise = {
        name: exerciseName,
        reps: exerciseReps,
        sets: exerciseSets
      }

      setDietData({ ...dietData, exercises: [...dietData.exercises, newExercise] })
      setExerciseName('')
      setExerciseReps('')
      setExerciseSets('')
    }
  }

  const removeExercise = index => {
    setDietData({ ...dietData, exercises: dietData.exercises.filter((_, i) => i !== index) })
  }

  const handleConsultationIntervalChange = event => {
    setDietData({
      ...dietData,
      consultation: {
        ...dietData.consultation,
        interval: event.target.value
      }
    })
  }

  const handleConsultationUnitChange = event => {
    setDietData({
      ...dietData,
      consultation: {
        ...dietData.consultation,
        unit: event.target.value
      }
    })
  }

  const handleClose = () => {
    setDietData({
      weightGoal: '',
      duration: '',
      selectedGoals: [],
      description: '',
      exercises: [],
      feedback: [],
      consultation: {
        isNeeded: false,
        interval: '',
        unit: ''
      }
    })
    setValidationErrors({
      weightGoal: false,
      duration: false,
      description: false
    })
    setOpen(false)
  }

  const handleSubmit = () => {
    if (!dietData.weightGoal || !dietData.duration || !dietData.description) {
      setValidationErrors({
        weightGoal: !dietData.weightGoal,
        duration: !dietData.duration,
        description: !dietData.description
      })

      return
    }

    const formData = {
      patientName,
      suggestedBy: 'doctor',
      doctorName,
      weight: currentWeight,
      dateOfDiet: new Date().toISOString().slice(0, 10), // Assuming today's date
      timeToContinue: { amount: dietData.duration, unit: 'weeks' }, // Assuming duration is in weeks
      consultation: {
        isNeeded: true, // Assuming consultation is always needed if the form is filled
        interval: dietData.consultation.interval,
        unit: dietData.consultation.unit
      },
      goals: dietData.selectedGoals,
      weightGoal: dietData.weightGoal,
      otherHealthGoals: [], // Assuming this is empty initially
      feedback: dietData.feedback.map((text, index) => ({
        date: new Date().toISOString().slice(0, 10), // Assuming today's date for each feedback
        text
      })),
      description: dietData.description
    }

    console.log('Diet Data Submitted: ', formData)
    setOpen(false) // Close the dialog
    onSubmit(formData) // Pass formData to parent component
  }

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={handleClose}
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
              <Typography variant='subtitle1'>Patient: {patientName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1'>Doctor: {doctorName}</Typography>
            </Grid>
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
              <CustomTextField
                fullWidth
                type='number'
                label='Consultation Interval'
                name='consultationInterval'
                variant='outlined'
                value={dietData.consultation.interval}
                onChange={handleConsultationIntervalChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Consultation Unit'
                name='consultationUnit'
                variant='outlined'
                value={dietData.consultation.unit}
                onChange={handleConsultationUnitChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                multiline
                rows={4}
                label='Description'
                variant='outlined'
                value={dietData.description}
                onChange={handleChange('description')}
                error={validationErrors.description}
                helperText={validationErrors.description ? 'Description is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>Select Goals:</Typography>
              <div>
                {dietData.selectedGoals.map((goal, index) => (
                  <Chip
                    key={index}
                    label={goal}
                    onDelete={() => handleGoalSelection(goal)}
                    color='primary'
                    className='mbe-1 me-1'
                  />
                ))}
              </div>
              <div className='flex items-center mt-2'>
                <TextField
                  fullWidth
                  variant='outlined'
                  placeholder='Add a new goal'
                  value={goalInput}
                  onChange={handleGoalInputChange}
                />
                <Button variant='contained' onClick={addGoal} className='ml-2'>
                  Add
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>Exercises:</Typography>
              {dietData.exercises.map((exercise, index) => (
                <div key={index} className='flex items-center mb-2'>
                  <CustomTextField
                    fullWidth
                    label='Name'
                    variant='outlined'
                    value={exercise.name}
                    onChange={event => handleExerciseNameChange(event)}
                    className='mbe-5'
                  />
                  <CustomTextField
                    fullWidth
                    type='number'
                    label='Reps'
                    variant='outlined'
                    value={exercise.reps}
                    onChange={event => handleExerciseRepsChange(event)}
                    className='mbe-5 mx-2'
                  />
                  <CustomTextField
                    fullWidth
                    type='number'
                    label='Sets'
                    variant='outlined'
                    value={exercise.sets}
                    onChange={event => handleExerciseSetsChange(event)}
                    className='mbe-5'
                  />
                  <Button variant='contained' color='secondary' onClick={() => removeExercise(index)} className='ml-2'>
                    Remove
                  </Button>
                </div>
              ))}
              <div className='flex items-center mt-2'>
                <CustomTextField
                  fullWidth
                  label='Name'
                  variant='outlined'
                  value={exerciseName}
                  onChange={handleExerciseNameChange}
                />
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Reps'
                  variant='outlined'
                  value={exerciseReps}
                  onChange={handleExerciseRepsChange}
                  className='ml-2'
                />
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Sets'
                  variant='outlined'
                  value={exerciseSets}
                  onChange={handleExerciseSetsChange}
                  className='ml-2'
                />
                <Button variant='contained' onClick={addExercise} className='ml-2'>
                  Add
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>Feedback:</Typography>
              {dietData.feedback.map((feedback, index) => (
                <div key={index} className='flex items-center mb-2'>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={2}
                    label='Feedback'
                    variant='outlined'
                    value={feedback}
                    onChange={event => handleFeedbackChange(index, event)}
                    className='mbe-5'
                  />
                  <Button variant='contained' color='secondary' onClick={() => removeFeedback(index)} className='ml-2'>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant='contained' onClick={addFeedback}>
                Add Feedback
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='psli-16'>
          <Button onClick={handleClose} color='primary' variant='outlined' className='mbe-16'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DietRecommendationForm
