'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import DiagnosticHeader from './DiagnosticHeader'
import DiagnosticTests from './DiagnosticTests'

const MedicalDiagnosisService = ({ testData }) => {
  // States
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DiagnosticHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <DiagnosticTests testData={testData} searchValue={searchValue} />
      </Grid>
    </Grid>
  )
}

export default MedicalDiagnosisService
