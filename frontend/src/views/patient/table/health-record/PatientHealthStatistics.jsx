'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const PatientHealthStatistics = ({ patientHealthRecords }) => {
  const [avgHeartRate, setAvgHeartRate] = useState(0)
  const [avgCholesterol, setAvgCholesterol] = useState(0)
  const [currentBMI, setCurrentBMI] = useState(0)

  useEffect(() => {
    if (patientHealthRecords.length > 0) {
      const heartRates = patientHealthRecords.map(record => record.heart_rate)
      const cholesterols = patientHealthRecords.map(record => record.cholesterol_level)

      const latestRecord = patientHealthRecords.reduce((prev, current) =>
        new Date(prev.date) > new Date(current.date) ? prev : current
      )

      const avgHeartRate = heartRates.reduce((a, b) => a + b, 0) / heartRates.length
      const avgCholesterol = cholesterols.reduce((a, b) => a + b, 0) / cholesterols.length

      setAvgHeartRate(avgHeartRate.toFixed(2))
      setAvgCholesterol(avgCholesterol.toFixed(2))
      setCurrentBMI(latestRecord.bmi.toFixed(2))
    }
  }, [patientHealthRecords])

  return (
    <Card>
      <CardHeader title='Patient Health Statistics' />
      <CardContent>
        <Typography variant='body2'>Average Heart Rate this Month: {avgHeartRate} bpm</Typography>
        <Typography variant='body2'>Average Cholesterol Level: {avgCholesterol} mg/dL</Typography>
        <Typography variant='body2'>Current BMI: {currentBMI}</Typography>
      </CardContent>
    </Card>
  )
}

export default PatientHealthStatistics
