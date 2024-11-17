'use client'

import React, { useState, useEffect } from 'react'

import { CardContent, Grid, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

const AppointmentTableFilter = ({ setData, tableData }) => {
  const [appointmentType, setAppointmentType] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [completed, setCompleted] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const filteredData = tableData.filter(appointment => {
      if (appointmentType && appointment.appointmentType !== appointmentType) return false
      if (timeSlot && appointment.startTime !== timeSlot) return false
      if (completed !== '' && appointment.completed !== completed) return false
      if (date && appointment.date !== date) return false

      return true
    })

    setData(filteredData)
  }, [appointmentType, timeSlot, completed, date, tableData, setData])

  const generateTimeSlots = () => {
    const timeSlots = []
    const startTime = new Date()

    startTime.setHours(8, 0, 0, 0)

    for (let i = 0; i < 10; i++) {
      // Generate 10 time slots (8 AM to 5 PM)
      const time = new Date(startTime.getTime() + i * 60 * 60 * 1000)
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      timeSlots.push(formattedTime)
    }

    return timeSlots
  }

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Appointment Type'
            value={appointmentType}
            onChange={e => setAppointmentType(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Type</MenuItem>
            <MenuItem value='online'>Online</MenuItem>
            <MenuItem value='physical'>Physical</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Time Slot'
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Time Slot</MenuItem>
            {generateTimeSlots().map(slot => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Completion Status'
            value={completed}
            onChange={e => setCompleted(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Completion</MenuItem>
            <MenuItem value={true}>Completed</MenuItem>
            <MenuItem value={false}>Not Completed</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            type='date'
            fullWidth
            label='Appointment Date'
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default AppointmentTableFilter
