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
  address: '',
  diagnosis: '',
  doctor: '',
  status: '',
  admissionDate: ''
}

const AddPatientDrawer = ({ open, handleClose }) => {
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
            id='gender'
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            label='Select Gender'
            inputProps={{ placeholder: 'Gender' }}
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </CustomTextField>
          <CustomTextField
            label='Contact'
            fullWidth
            placeholder='(123) 456-7890'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />
          <CustomTextField
            label='Address'
            fullWidth
            placeholder='123 Main St, Springfield'
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
          <CustomTextField
            label='Diagnosis'
            fullWidth
            placeholder='Diabetes'
            value={formData.diagnosis}
            onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
          />
          <CustomTextField
            label='Doctor'
            fullWidth
            placeholder='Dr. Smith'
            value={formData.doctor}
            onChange={e => setFormData({ ...formData, doctor: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            label='Select Status'
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
          <CustomTextField
            label='Admission Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.admissionDate}
            onChange={e => setFormData({ ...formData, admissionDate: e.target.value })}
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

export default AddPatientDrawer
