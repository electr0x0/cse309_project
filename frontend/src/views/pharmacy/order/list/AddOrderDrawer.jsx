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
  medicineName: '',
  manufacturer: '',
  batchNumber: '',
  expiryDate: '',
  quantity: '',
  price: '',
  category: '',
  description: ''
}

const AddMedicineDrawer = ({ open, handleClose }) => {
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
        <Typography variant='h5'>Add New Medicine</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Medicine Name'
            fullWidth
            placeholder='Paracetamol'
            value={formData.medicineName}
            onChange={e => setFormData({ ...formData, medicineName: e.target.value })}
          />
          <CustomTextField
            label='Manufacturer'
            fullWidth
            placeholder='XYZ Pharma'
            value={formData.manufacturer}
            onChange={e => setFormData({ ...formData, manufacturer: e.target.value })}
          />
          <CustomTextField
            label='Batch Number'
            fullWidth
            placeholder='B123456'
            value={formData.batchNumber}
            onChange={e => setFormData({ ...formData, batchNumber: e.target.value })}
          />
          <CustomTextField
            label='Expiry Date'
            type='date'
            fullWidth
            value={formData.expiryDate}
            onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
            InputLabelProps={{
              shrink: true
            }}
          />
          <CustomTextField
            label='Quantity'
            type='number'
            fullWidth
            placeholder='100'
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
          />
          <CustomTextField
            label='Price'
            type='number'
            fullWidth
            placeholder='10.00'
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            label='Select Category'
          >
            <MenuItem value='OTC'>OTC</MenuItem>
            <MenuItem value='Prescription'>Prescription</MenuItem>
            <MenuItem value='Supplement'>Supplement</MenuItem>
          </CustomTextField>
          <CustomTextField
            label='Description'
            fullWidth
            multiline
            rows={3}
            placeholder='Description of the medicine'
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
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

export default AddMedicineDrawer
