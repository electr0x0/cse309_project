'use client'

import React, { useState, useEffect } from 'react'

import { CardContent, Grid, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

const PatientTableFilter = ({ setData, tableData }) => {
  const [status, setStatus] = useState('')

  useEffect(() => {
    const filteredData = tableData.filter(patient => {
      if (status && patient.status !== status) return false

      return true
    })

    setData(filteredData)
  }, [status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='Active'>Active</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PatientTableFilter
