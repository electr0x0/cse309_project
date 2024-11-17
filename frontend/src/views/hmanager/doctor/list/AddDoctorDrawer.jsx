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
  fullName: '',
  age: '',
  gender: '',
  contact: '',
  email: '',
  address: '',
  medicalHistory: '',
  currentMedications: '',
  allergies: '',
  status: ''
}

const AddPatientDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = e => {
    e.preventDefault()

    // Here you can add the logic to handle form submission, e.g., API call to add a new patient
    console.log('Form submitted:', formData)
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
        <Typography variant='h5'>Add New Patient</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Full Name'
            fullWidth
            placeholder='John Doe'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <CustomTextField
            label='Age'
            type='number'
            fullWidth
            placeholder='30'
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-gender'
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            label='Select Gender'
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </CustomTextField>
          <CustomTextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />
          <CustomTextField
            label='Email'
            fullWidth
            placeholder='johndoe@gmail.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <CustomTextField
            label='Address'
            fullWidth
            placeholder='123 Main St, City, Country'
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
          <CustomTextField
            label='Medical History'
            fullWidth
            multiline
            rows={4}
            placeholder='Medical history details'
            value={formData.medicalHistory}
            onChange={e => setFormData({ ...formData, medicalHistory: e.target.value })}
          />
          <CustomTextField
            label='Current Medications'
            fullWidth
            multiline
            rows={4}
            placeholder='Current medications details'
            value={formData.currentMedications}
            onChange={e => setFormData({ ...formData, currentMedications: e.target.value })}
          />
          <CustomTextField
            label='Allergies'
            fullWidth
            multiline
            rows={4}
            placeholder='Known allergies'
            value={formData.allergies}
            onChange={e => setFormData({ ...formData, allergies: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            label='Select Status'
          >
            <MenuItem value='admitted'>Admitted</MenuItem>
            <MenuItem value='discharged'>Discharged</MenuItem>
            <MenuItem value='under treatment'>Under Treatment</MenuItem>
          </CustomTextField>
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

export default AddPatientDrawer
