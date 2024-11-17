'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { Grid } from '@mui/material'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import GeoSearchModal from './GeoSearchModal' // New component
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

import { registerUser } from '../../../api/apiHandler'

import './styles.css'

// Validation Schema
const validationSchema = yup.object({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  contact_number: yup.number('Phone number cannot have alphabets').required('Phone Number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 6 characters length').required('Password is required'),
  type: yup.string().required('User group is required'),
  address: yup.string().required('Address is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  date_of_birth: yup.date().required('Date of Birth is Required')
})

const RegisterV1 = () => {
  const router = useRouter()

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isGeoSearchModalOpen, setIsGeoSearchModalOpen] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleGeoSearchModalClose = location => {
    if (location) {
      formik.setFieldValue('address', location.address)
      formik.setFieldValue('latitude', location.latitude)
      formik.setFieldValue('longitude', location.longitude)
    }

    setIsGeoSearchModalOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      contact_number: '',
      email: '',
      password: '',
      type: '',
      address: '',
      latitude: '',
      longitude: '',
      terms: false,
      date_of_birth: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values)

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your account has been created successfully! Please login and Complete Your Profile Information!'
          })
          resetForm()

          router.push('/login')
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'Something went wrong!'
        })
      }
    }
  })

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[700px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography>Health Care made easy!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
            {/* <CustomTextField
              autoFocus
              fullWidth
              label='Username'
              name='username'
              placeholder='Enter your username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            /> */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label='First Name'
                  name='first_name'
                  placeholder='Enter your first name'
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label='Last Name'
                  name='last_name'
                  placeholder='Enter your last name'
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </Grid>
            </Grid>
            <CustomTextField
              fullWidth
              label='Phone Number'
              name='contact_number'
              placeholder='Enter your phone number'
              value={formik.values.contact_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contact_number && Boolean(formik.errors.contact_number)}
              helperText={formik.touched.contact_number && formik.errors.contact_number}
            />

            <AppReactDatepicker
              placeholderText='Select your Date of Birth'
              selected={formik.values.date_of_birth}
              onChange={date => formik.setFieldValue('date_of_birth', date)}
              customInput={
                <CustomTextField
                  label='Date of Birth'
                  fullWidth
                  error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                  helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                />
              }
            />

            <CustomTextField
              fullWidth
              label='Email'
              name='email'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomTextField
              fullWidth
              label='Password'
              name='password'
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={`tabler-${isPasswordShown ? 'eye-off' : 'eye'}`} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl>
              <InputLabel>User Type</InputLabel>
              <Select
                label='User Type'
                name='type'
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <MenuItem value=''>Select group</MenuItem>
                <MenuItem value='patient'>Patient</MenuItem>
                <MenuItem value='doctor'>Doctor</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
              </Select>
            </FormControl>
            <CustomTextField
              fullWidth
              label='Address'
              name='address'
              placeholder='Enter your address'
              value={formik.values.address}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button onClick={() => setIsGeoSearchModalOpen(true)}>Select Address</Button>
                  </InputAdornment>
                )
              }}
            />
            {/* <CustomTextField

              label='Latitude'
              name='latitude'
              placeholder='Latitude'
              value={formik.values.latitude}
              InputProps={{
                readOnly: true
              }}
              hidden
            />
            <CustomTextField
              fullWidth
              label='Longitude'
              name='longitude'
              placeholder='Longitude'
              value={formik.values.longitude}
              InputProps={{
                readOnly: true
              }}
              hidden
            /> */}
            <FormControlLabel
              control={
                <Checkbox
                  name='terms'
                  color='primary'
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <span>
                  I agree to <Link href='/'>privacy policy & terms</Link>
                </span>
              }
            />
            {formik.touched.terms && formik.errors.terms && (
              <Typography variant='body2' color='error'>
                {formik.errors.terms}
              </Typography>
            )}
            <Button type='submit' fullWidth size='large' variant='contained'>
              Sign Up
            </Button>
            <div className='flex justify-center'>
              <Typography className='text-textSecondary'>
                Already have an account?{' '}
                <Link href={`/login/`} className='ms-1'>
                  Sign in instead
                </Link>
              </Typography>
            </div>
          </form>
        </CardContent>
      </Card>
      {isGeoSearchModalOpen && <GeoSearchModal open={isGeoSearchModalOpen} onClose={handleGeoSearchModalClose} />}
    </AuthIllustrationWrapper>
  )
}

export default RegisterV1
