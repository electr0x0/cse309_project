// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
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

const AddAppointmentDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = e => {
    e.preventDefault()
    handleClose()
    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New Appointment</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Appointment Title'
            fullWidth
            placeholder='Check-up'
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <CustomTextField
            label='Description'
            fullWidth
            placeholder='Appointment details'
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <CustomTextField
            label='Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <CustomTextField
            label='Start Time'
            type='time'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.startTime}
            onChange={e => setFormData({ ...formData, startTime: e.target.value })}
          />
          <CustomTextField
            label='End Time'
            type='time'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.endTime}
            onChange={e => setFormData({ ...formData, endTime: e.target.value })}
          />
          <CustomTextField
            label='Room'
            fullWidth
            placeholder='Room number or name'
            value={formData.room}
            onChange={e => setFormData({ ...formData, room: e.target.value })}
          />
          <CustomTextField
            label='Patient Name'
            fullWidth
            placeholder='John Doe'
            value={formData.patientName}
            onChange={e => setFormData({ ...formData, patientName: e.target.value })}
          />
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
          <CustomTextField
            label={formData.appointmentType === 'online' ? 'Google Meet Link' : 'Room Number'}
            fullWidth
            placeholder={formData.appointmentType === 'online' ? 'https://meet.google.com/abc-xyz' : 'RA503'}
            value={formData.roomNumber}
            onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddAppointmentDrawer
