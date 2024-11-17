'use client'

import { useState } from 'react'

import { Card, Grid, Button, MenuItem, CardContent, CardActions, Divider, InputAdornment } from '@mui/material'

import Swal from 'sweetalert2'

import { format } from 'date-fns'

import CustomTextField from '@core/components/mui/TextField' // Ensure this path is correct
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker' // Ensure this path is correct

import { postHealthRecord } from '../../../api/apiHandler'

const FormLayoutsWithTabs = () => {
  const [formData, setFormData] = useState({
    blood_type: '',
    bmi: '',
    height: '',
    weight: '',
    blood_pressure: '',
    heart_rate: '',
    cholesterol_level: '',
    sugar_level: '',
    date: null
  })

  const handleReset = () => {
    setFormData({
      blood_type: '',
      bmi: '',
      height: '',
      weight: '',
      blood_pressure: '',
      heart_rate: '',
      cholesterol_level: '',
      sugar_level: '',
      date: null
    })
  }

  function formatDatetimeForMySQL(datetime) {
    // Ensure datetime is a Date object
    let date = new Date(datetime)

    // Extract date components
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero-indexed
    let day = ('0' + date.getDate()).slice(-2)
    let hours = ('0' + date.getHours()).slice(-2)
    let minutes = ('0' + date.getMinutes()).slice(-2)
    let seconds = ('0' + date.getSeconds()).slice(-2)

    // Formatted datetime string
    let formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    return formattedDatetime
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const p_user_id_id = JSON.parse(sessionStorage.getItem('user')).id.toString()
    const formattedDate = formData.date ? formatDatetimeForMySQL(formData.date) : null
    const postData = { ...formData, date: formattedDate, p_user_id_id }

    try {
      const response = await postHealthRecord(JSON.stringify(postData))

      if (response.status == 200 || 201) {
        Swal.fire('Success!', 'Data submitted successfully!', 'success')
        handleReset()
      } else {
        throw new Error('Failed to submit data')
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error submitting your data', 'error')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                selected={formData.date}
                id='date-time-picker'
                dateFormat='MM/dd/yyyy h:mm aa'
                onChange={date => setFormData({ ...formData, date })}
                customInput={<CustomTextField label='Date & Time' fullWidth />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Blood Pressure'
                placeholder='120/80 mmHg'
                value={formData.blood_pressure}
                onChange={e => setFormData({ ...formData, blood_pressure: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Cholesterol'
                placeholder='200 mg/dL'
                value={formData.cholesterol_level}
                onChange={e => setFormData({ ...formData, cholesterol_level: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Heart Rate'
                placeholder='70 bpm'
                value={formData.heart_rate}
                onChange={e => setFormData({ ...formData, heart_rate: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Glucose Level'
                placeholder='90 mg/dL'
                value={formData.sugar_level}
                onChange={e => setFormData({ ...formData, sugar_level: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Weight'
                placeholder='70 kg'
                value={formData.weight}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>kg</InputAdornment>
                }}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Height'
                placeholder='170 cm'
                value={formData.height}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>cm</InputAdornment>
                }}
                onChange={e => setFormData({ ...formData, height: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='BMI'
                placeholder='22'
                value={formData.bmi}
                onChange={e => setFormData({ ...formData, bmi: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Blood Type'
                placeholder='O+'
                value={formData.blood_type}
                onChange={e => setFormData({ ...formData, blood_type: e.target.value })}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
          <Button type='reset' variant='tonal' color='secondary' onClick={handleReset}>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsWithTabs
