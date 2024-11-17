'use client'

import React, { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// Custom Component Import
import CustomTextField from '@core/components/mui/TextField'

const specializationOptions = ['Cardiology', 'Neurology', 'Pediatrics', 'General Surgery', 'Orthopedics']

const DoctorInfoForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    specialization: [specializationOptions[0]],
    yearsOfExperience: '',
    dutyHours: '',
    roomNumber: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSpecializationChange = e => {
    const { value } = e.target

    setFormData({ ...formData, specialization: typeof value === 'string' ? value.split(',') : value })
  }

  const handleReset = () => {
    setFormData({
      username: '',
      department: '',
      specialization: [],
      yearsOfExperience: '',
      dutyHours: '',
      roomNumber: ''
    })
  }

  return (
    <Card>
      <CardHeader title='Your Info' />
      <Divider />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                Doctor Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Doctor Name'
                placeholder='johnDoe'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Department'
                placeholder='Department'
                name='department'
                value={formData.department}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                defaultValue={specializationOptions[0]}
                fullWidth
                label='Specialization'
                name='specialization'
                value={formData.specialization}
                onChange={handleSpecializationChange}
                SelectProps={{ multiple: false }}
              >
                {specializationOptions.map(specialization => (
                  <MenuItem key={specialization} value={specialization}>
                    {specialization}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Years of Experience'
                placeholder='Years of Experience'
                name='yearsOfExperience'
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Duty Hours'
                placeholder='Duty Hours'
                name='dutyHours'
                value={formData.dutyHours}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Room Number'
                placeholder='Room Number'
                name='roomNumber'
                value={formData.roomNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default DoctorInfoForm
