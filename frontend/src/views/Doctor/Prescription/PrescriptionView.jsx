import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import Drawer from '@mui/material/Drawer'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css' // Adjust the path as per your project structure

const PrescriptionView = ({ prescriptionData, open, handleClose }) => {
  const { patientName, age, gender, contact, address, diagnosis, medicines, issuedDate, dueDate } = prescriptionData

  const handleReset = () => {
    handleClose()

    // setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 600, sm: 1000 } } }}
    >
      <Card>
        <CardContent className='sm:!p-12'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>{`Prescription for ${patientName}`}</Typography>
              <Divider className='mt-4 mb-6' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className='flex flex-col gap-4'>
                <Typography className='font-medium' color='text.primary'>
                  Patient Information:
                </Typography>
                <CustomTextField fullWidth defaultValue={patientName} disabled />
                <CustomTextField fullWidth defaultValue={`${age}`} type='number' disabled />
                <CustomTextField fullWidth defaultValue={gender} disabled />
                <CustomTextField fullWidth defaultValue={contact} disabled />
                <CustomTextField fullWidth defaultValue={address} multiline rows={2} disabled />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className='flex flex-col gap-4'>
                <Typography className='font-medium' color='text.primary'>
                  Diagnosis:
                </Typography>
                <CustomTextField fullWidth defaultValue={diagnosis} multiline rows={4} disabled />
                <Typography className='font-medium' color='text.primary'>
                  Issued Date:
                </Typography>
                <CustomTextField
                  fullWidth
                  defaultValue={issuedDate} // Replace with the appropriate field
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Typography className='font-medium' color='text.primary'>
                  Due Date:
                </Typography>
                <CustomTextField
                  fullWidth
                  defaultValue={dueDate} // Replace with the appropriate field
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className='overflow-x-auto border rounded'>
                <table className={tableStyles.table}>
                  <thead className='border-bs-0'>
                    <tr>
                      <th className='!bg-transparent'>Medicine Name</th>
                      <th className='!bg-transparent'>Type</th>
                      <th className='!bg-transparent'>Amount</th>
                      <th className='!bg-transparent'>Price</th>
                      <th className='!bg-transparent'>Times per Day</th>
                      <th className='!bg-transparent'>Times of Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.name}</td>
                        <td>{medicine.type}</td>
                        <td>{medicine.amount}</td>
                        <td>{medicine.price}</td>
                        <td>{medicine.timesPerDay}</td>
                        <td>{medicine.timesOfDay.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Drawer>
  )
}

export default PrescriptionView
