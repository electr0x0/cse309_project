import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

const ScrollableCardContent = styled(CardContent)({
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 64px)', // Adjust the height as necessary
  padding: '24px'
})

const DietView = ({ dietData, open, handleClose }) => {
  const {
    patientName,
    weight,
    suggestedBy,
    doctorName,
    dateOfDiet,
    timeToContinue,
    consultation,
    goals,
    description,
    weightGoal,
    otherHealthGoals,
    feedback,
    exercises // Ensure to handle scenarios where exercises might be undefined or empty
  } = dietData

  const handleReset = () => {
    handleClose()
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
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>{`Diet Plan for ${patientName}`}</Typography>
              <Divider className='mt-4 mb-6' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className='font-medium' color='text.primary'>
                Patient Information
              </Typography>
              <Typography>{`Name: ${patientName}`}</Typography>
              <Typography>{`Weight: ${weight} kg`}</Typography>
              <Typography>{`Suggested By: ${suggestedBy === 'doctor' ? `Doctor: ${doctorName}` : 'AI'}`}</Typography>
              <Typography>{`Date of Diet: ${dateOfDiet}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className='font-medium' color='text.primary'>
                Diet Information
              </Typography>
              {timeToContinue ? (
                <Typography>{`Time to Continue: ${timeToContinue.amount} ${timeToContinue.unit}`}</Typography>
              ) : (
                <Typography>{`Time to Continue: Not specified`}</Typography>
              )}
              <Typography>
                {consultation.isNeeded
                  ? `Consultation: Every ${consultation.interval} ${consultation.unit}`
                  : 'No Consultation Needed'}
              </Typography>
              <Typography className='font-medium' color='text.primary'>
                Goals
              </Typography>
              <div className='flex flex-wrap gap-2'>
                {goals.map((goal, index) => (
                  <Chip key={index} label={goal} color='primary' />
                ))}
              </div>
              <Typography>{`Weight Goal: ${weightGoal} kg`}</Typography>
              <Typography className='font-medium' color='text.primary'>
                Other Health Goals
              </Typography>
              <div className='flex flex-wrap gap-2'>
                {otherHealthGoals.map((goal, index) => (
                  <Chip key={index} label={goal} color='secondary' />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography className='font-medium' color='text.primary'>
                Description
              </Typography>
              <Typography>{description}</Typography>
            </Grid>
            {exercises && exercises.length > 0 && (
              <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                  Exercises
                </Typography>
                <div className='flex gap-4'>
                  {exercises.map((exercise, index) => (
                    <div key={index} className='flex flex-col'>
                      <Typography>{exercise.name}</Typography>
                      <Typography>{`Reps: ${exercise.reps}`}</Typography>
                      <Typography>{`Sets: ${exercise.sets}`}</Typography>
                      {index !== exercises.length - 1 && <Divider className='mt-2 mb-2' />}
                    </div>
                  ))}
                </div>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography className='font-medium' color='text.primary'>
                Feedback
              </Typography>
              {feedback.map((entry, index) => (
                <div key={index}>
                  <Typography>{`Date: ${entry.date}`}</Typography>
                  <Typography>{`Feedback: ${entry.text}`}</Typography>
                  <Divider className='mt-2 mb-2' />
                </div>
              ))}
            </Grid>
          </Grid>
        </ScrollableCardContent>
      </Card>
    </Drawer>
  )
}

export default DietView
