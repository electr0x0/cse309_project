'use client'

import React from 'react'

import { Grid } from '@mui/material'

import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const data = [
  {
    title: 'Total Patients',
    value: '1,234',
    avatarIcon: 'tabler-users',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '10%',
    subTitle: 'This month'
  },
  {
    title: 'Active Patients',
    value: '890',
    avatarIcon: 'tabler-user-check',
    avatarColor: 'success',
    change: 'positive',
    changeNumber: '5%',
    subTitle: 'This month'
  },
  {
    title: 'Inactive Patients',
    value: '200',
    avatarIcon: 'tabler-user-x',
    avatarColor: 'warning',
    change: 'negative',
    changeNumber: '2%',
    subTitle: 'This month'
  },
  {
    title: 'Pending Patients',
    value: '144',
    avatarIcon: 'tabler-user-clock',
    avatarColor: 'error',
    change: 'negative',
    changeNumber: '8%',
    subTitle: 'This month'
  }
]

const PatientListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PatientListCards
