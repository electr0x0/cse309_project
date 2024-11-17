'use client'

import React, { useMemo } from 'react'

import { Grid } from '@mui/material'

import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const AppointmentStatisticsCards = ({ appointmentData }) => {
  // Calculate statistics based on appointment data
  const statistics = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10) // Get today's date in YYYY-MM-DD format
    const upcoming = appointmentData.filter(appointment => appointment.date > today)
    const todayAppointments = appointmentData.filter(appointment => appointment.date === today)
    const completeAppointments = appointmentData.filter(appointment => appointment.completed)
    const missedAppointments = appointmentData.filter(appointment => !appointment.completed && appointment.date < today)

    return [
      {
        title: 'Complete Appointments',
        value: completeAppointments.length.toString(),
        avatarIcon: 'tabler-check',
        avatarColor: 'success',
        changeNumber: '8%',
        subTitle: 'All-time'
      },
      {
        title: 'Upcoming Appointments',
        value: upcoming.length.toString(),
        avatarIcon: 'tabler-calendar',
        avatarColor: 'primary',
        changeNumber: '8%',
        subTitle: 'Upcoming'
      },
      {
        title: 'Appointments Today',
        value: todayAppointments.length.toString(),
        avatarIcon: 'tabler-clock',
        avatarColor: 'info',
        changeNumber: '8%',
        subTitle: 'Today'
      },
      {
        title: 'Missed Appointments',
        value: missedAppointments.length.toString(),
        avatarIcon: 'tabler-alert-triangle',
        avatarColor: 'error',
        changeNumber: '8%',
        subTitle: 'Missed'
      }
    ]
  }, [appointmentData])

  return (
    <Grid className='mb-5' container spacing={6}>
      {statistics.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AppointmentStatisticsCards
