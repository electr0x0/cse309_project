'use client'

// React Imports
import React, { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import MenuItem from '@mui/material/MenuItem'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import DoctorAppointmentListTable from './DoctorAppointmentListTable'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Initial Data for the form
const initialData = {
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  room: '',
  patientName: '',
  appointmentType: 'online', // Default to online
  roomNumber: ''
}

const AppointmentTabBased = () => {
  // States
  const [value, setValue] = useState('appointments')
  const [formData, setFormData] = useState(initialData)

  const [appointmentData, setAppointmentData] = useState([
    {
      id: 1,
      title: 'Check-up',
      description: 'Regular check-up appointment',
      date: '2024-06-20',
      startTime: '10:00',
      endTime: '11:00',
      room: 'Room A',
      patientName: 'John Doe',
      appointmentType: 'physical',
      roomNumber: 'RA503'
    },
    {
      id: 2,
      title: 'Follow-up',
      description: 'Follow-up appointment after surgery',
      date: '2024-06-22',
      startTime: '14:30',
      endTime: '15:30',
      room: 'Room B',
      patientName: 'Jane Smith',
      appointmentType: 'online',
      roomNumber: 'https://meet.google.com/abc-xyz'
    },
    {
      id: 3,
      title: 'Consultation',
      description: 'Consultation for treatment plan',
      date: '2024-06-25',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room C',
      patientName: 'Michael Johnson',
      appointmentType: 'physical',
      roomNumber: 'RA505'
    }
  ])

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleReset = () => {
    setFormData(initialData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setAppointmentData([...appointmentData, { ...formData, id: appointmentData.length + 1 }])
    handleReset()
    setValue('appointments') // Switch to appointments tab after submission
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label='Appointments' value='appointments' />
          <Tab label='Add Appointment' value='add_appointment' />
        </TabList>
        <CardContent>
          <TabPanel value='appointments'>
            <DoctorAppointmentListTable tableData={appointmentData} />
          </TabPanel>
          <TabPanel value='add_appointment'>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Appointment Title'
                    fullWidth
                    placeholder='Check-up'
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Description'
                    fullWidth
                    placeholder='Appointment details'
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Date'
                    type='date'
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Start Time'
                    type='time'
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.startTime}
                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='End Time'
                    type='time'
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.endTime}
                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Room'
                    fullWidth
                    placeholder='Room number or name'
                    value={formData.room}
                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='Patient Name'
                    fullWidth
                    placeholder='John Doe'
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    id='appointmentType'
                    value={formData.appointmentType}
                    onChange={e => setFormData({ ...formData, appointmentType: e.target.value })}
                    label='Appointment Type'
                    inputProps={{ placeholder: 'Appointment Type' }}
                  >
                    <MenuItem value='online'>Online</MenuItem>
                    <MenuItem value='physical'>Physical</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label={formData.appointmentType === 'online' ? 'Google Meet Link' : 'Room Number'}
                    fullWidth
                    placeholder={formData.appointmentType === 'online' ? 'https://meet.google.com/abc-xyz' : 'RA503'}
                    value={formData.roomNumber}
                    onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Divider className='my-6' />
              <CardActions>
                <Button type='submit' variant='contained' className='mie-2'>
                  Submit
                </Button>
                <Button type='reset' variant='tonal' color='secondary' onClick={handleReset}>
                  Reset
                </Button>
              </CardActions>
            </form>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default AppointmentTabBased
