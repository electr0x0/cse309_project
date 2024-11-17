// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }) => {
  // States
  const [manufacturer, setManufacturer] = useState('')
  const [category, setCategory] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(medicine => {
      if (manufacturer && medicine.manufacturer !== manufacturer) return false
      if (category && medicine.category !== category) return false
      if (expiryDate && new Date(medicine.expiryDate) > new Date(expiryDate)) return false

      return true
    })

    setData(filteredData)
  }, [manufacturer, category, expiryDate, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-manufacturer'
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Manufacturer</MenuItem>
            <MenuItem value='XYZ Pharma'>XYZ Pharma</MenuItem>
            <MenuItem value='ABC Pharma'>ABC Pharma</MenuItem>
            <MenuItem value='HealthCorp'>HealthCorp</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Category</MenuItem>
            <MenuItem value='OTC'>OTC</MenuItem>
            <MenuItem value='Prescription'>Prescription</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            type='date'
            fullWidth
            id='select-expiry-date'
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
