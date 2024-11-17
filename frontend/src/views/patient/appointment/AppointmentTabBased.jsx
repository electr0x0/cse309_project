'use client'

// React Imports
import React, { useState } from 'react'

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

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import PatientAppointmentListTable from './PatientAppointmentListTable'

// Initial Data
const doctorsData = {
  'Dr. John Doe': [
    { label: '10:00 AM - 11:00 AM', startTime: '10:00', endTime: '11:00' },
    { label: '02:00 PM - 03:00 PM', startTime: '14:00', endTime: '15:00' }
  ],
  'Dr. Jane Smith': [
    { label: '09:00 AM - 10:00 AM', startTime: '09:00', endTime: '10:00' },
    { label: '01:00 PM - 02:00 PM', startTime: '13:00', endTime: '14:00' }
  ]
}

const initialData = {
  doctorName: '',
  title: '',
  description: '',
  date: '',
  appointmentType: 'online',
  timeslot: '',
  startTime: '',
  endTime: '',
  roomNumber: '',
  patientName: ''
}

const AppointmentTabBased = () => {
  // States
  const [value, setValue] = useState('appointments')
  const [formData, setFormData] = useState(initialData)

  const [appointmentData, setAppointmentData] = useState([
    {
      id: 1,
      doctorName: 'John Doe',
      title: 'General Check-up',
      description: 'Routine health check-up',
      date: '2024-11-20',
      startTime: '10:00',
      endTime: '11:00',
      roomNumber: 'Room 101',
      appointmentType: 'physical',
      patientName: 'Alice Johnson',
      isBooked: true
    },
    {
      id: 2,
      doctorName: 'Jane Smith',
      title: 'Post-Surgery Consultation',
      description: 'Follow-up after surgery',
      date: '2024-11-21',
      startTime: '13:00',
      endTime: '14:00',
      roomNumber: 'https://meet.google.com/xyz-123',
      appointmentType: 'online',
      patientName: 'Bob Brown',
      isBooked: true
    },
    {
      id: 3,
      doctorName: 'John Dane',
      title: 'Specialized Consultation',
      description: 'Consultation for a specific treatment plan',
      date: '2024-11-22',
      startTime: '09:00',
      endTime: '10:00',
      roomNumber: 'Room 202',
      appointmentType: 'physical',
      patientName: 'Charlie Green',
      isBooked: true
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

  const availableTimeslots = doctorsData[formData.doctorName] || []

  return (
    <Card>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label='Appointments' value='appointments' />
          <Tab label='Book Appointment' value='book_appointment' />
        </TabList>
        <CardContent>
          <TabPanel value='appointments'>
            <PatientAppointmentListTable tableData={appointmentData} />
          </TabPanel>
          <TabPanel value='book_appointment'>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    label='Doctor Name'
                    fullWidth
                    value={formData.doctorName}
                    onChange={e => {
                      const doctorName = e.target.value

                      setFormData({
                        ...formData,
                        doctorName,
                        timeslot: '',
                        startTime: '',
                        endTime: ''
                      })
                    }}
                  >
                    <MenuItem value='Dr. John Doe'>Dr. John Doe</MenuItem>
                    <MenuItem value='Dr. Jane Smith'>Dr. Jane Smith</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    label='Available Timeslot'
                    fullWidth
                    value={formData.timeslot}
                    onChange={e => {
                      const selectedSlot = availableTimeslots.find(slot => slot.label === e.target.value)

                      setFormData({
                        ...formData,
                        timeslot: e.target.value,
                        startTime: selectedSlot.startTime,
                        endTime: selectedSlot.endTime
                      })
                    }}
                    disabled={!formData.doctorName}
                  >
                    {availableTimeslots.map(slot => (
                      <MenuItem key={slot.label} value={slot.label}>
                        {slot.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
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
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label='End Time'
                    type='time'
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.endTime}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label={formData.appointmentType === 'online' ? 'Google Meet Link' : 'Room Number'}
                    fullWidth
                    placeholder={formData.appointmentType === 'online' ? 'https://meet.google.com/abc-xyz' : 'Room 101'}
                    value={formData.roomNumber}
                    onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
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
                    value={formData.appointmentType}
                    onChange={e => setFormData({ ...formData, appointmentType: e.target.value })}
                    label='Appointment Type'
                  >
                    <MenuItem value='online'>Online</MenuItem>
                    <MenuItem value='physical'>Physical</MenuItem>
                  </CustomTextField>
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
