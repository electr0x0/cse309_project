'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import AddPatientDrawer, { initialFormData } from '../CurrentPaitentList/AddPatientDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Import OpenDialogOnElementClick and DietRecommendationForm
import OpenDialogOnElementClick from '../../../components/dialogue/OpenDialogOnElementClick'
import DietRecommendationForm from './DietRecommendationForm'
import DietView from '../../patient/Recommendation/Diet/DietView'

function PrescriptionMaker({ prescriptionData }) {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [selectData, setSelectData] = useState(null)
  const [issuedDate, setIssuedDate] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [medicines, setMedicines] = useState([{ timesPerDay: 0, timesOfDay: [] }])
  const [dietAdded, setDietAdded] = useState(false) // State to track if diet is added

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const onFormSubmit = data => {
    setFormData(data)
  }

  const deleteForm = index => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const handleTimesPerDayChange = (index, event) => {
    const value = parseInt(event.target.value)
    const newMedicines = [...medicines]

    newMedicines[index].timesPerDay = value
    newMedicines[index].timesOfDay = new Array(value).fill('')
    setMedicines(newMedicines)
  }

  const handleTimesOfDayChange = (medicineIndex, timeIndex, event) => {
    const newMedicines = [...medicines]

    newMedicines[medicineIndex].timesOfDay[timeIndex] = event.target.value
    setMedicines(newMedicines)
  }

  const addMedicine = () => {
    setMedicines([...medicines, { timesPerDay: 0, timesOfDay: [] }])
    setCount(count + 1)
  }

  const handleDietSubmit = data => {
    // Handle diet data submission logic here
    setDietAdded(true)
  }

  const [openDietForm, setOpenDietForm] = useState(false)

  const handleDietViewOpen = () => {
    setOpenDietForm(true)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className='p-6 bg-actionHover rounded'>
                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                  <div className='flex flex-col gap-6'>
                    {/* <div className='flex items-center gap-2.5'>
                      <Logo />
                    </div> */}
                    <div>
                      <Typography color='text.primary'>240 W 55th St, between Broadway and 8th Avenue</Typography>
                      <Typography color='text.primary'>Manhattan, New York, USA</Typography>
                      <Typography color='text.primary'>01696969696</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                      <Typography variant='h5' className='min-is-[95px]'>
                        Prescribtion
                      </Typography>
                      <CustomTextField
                        fullWidth
                        value={0}
                        InputProps={{
                          disabled: false,
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Issued:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issuedDate}
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        onChange={date => setIssuedDate(date)}
                        customInput={<CustomTextField fullWidth />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Prescriped To:
                  </Typography>
                  <CustomTextField
                    select
                    className={classnames('min-is-[220px]', { 'is-1/2': isBelowSmScreen })}
                    value={selectData?.id || ''}
                    onChange={e => {
                      setFormData({})
                      setSelectData(prescriptionData.slice(0, 5).filter(item => item.id === e.target.value)[0])
                    }}
                  >
                    <MenuItem
                      className='flex items-center gap-2 !text-success !bg-transparent hover:text-success hover:!bg-[var(--mui-palette-success-lightOpacity)]'
                      value=''
                      onClick={() => {
                        setSelectData(null)
                        setOpen(true)
                      }}
                    >
                      <i className='tabler-plus text-base' />
                      Add New Patient
                    </MenuItem>
                    {prescriptionData.slice(0, 5).map((invoice, index) => (
                      <MenuItem key={index} value={invoice.id}>
                        {invoice.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  {selectData?.id ? (
                    <div>
                      <Typography>{selectData?.name}</Typography>
                      <Typography>{selectData?.age}</Typography>
                      <Typography>{selectData?.gender}</Typography>
                      <Typography>{selectData?.contact}</Typography>
                      <Typography>{selectData?.address}</Typography>
                      <Typography>{selectData?.diagnosis}</Typography>
                      <Typography>{'DR. Stella'}</Typography>
                      <Typography>{selectData?.status}</Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issuedDate}
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        onChange={date => setIssuedDate(date)}
                        customInput={<CustomTextField fullWidth />}
                      />
                    </div>
                  ) : (
                    <div>
                      <Typography>{formData?.name}</Typography>
                      <Typography>{formData?.company}</Typography>
                      <Typography>{formData?.address}</Typography>
                      <Typography>{formData?.contactNumber}</Typography>
                      <Typography>{formData?.email}</Typography>
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Consultation Bill:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded w-full', {
                    'mbs-8': !isBelowMdScreen,
                    '!mbs-14': index !== 0 && !isBelowMdScreen,
                    'gap-5': isBelowMdScreen
                  })}
                >
                  <Grid container spacing={2} className='m-0 pbe-5'>
                    <Grid item lg={6} md={5} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Medicine
                      </Typography>
                      <CustomTextField select fullWidth defaultValue='HIMYM' className='mbe-5'>
                        <MenuItem value='HIMYM'>HIMYM</MenuItem>
                        <MenuItem value='Nico Robin'>Nico Robin</MenuItem>
                        <MenuItem value='Yinlin'>Yinlin</MenuItem>
                        <MenuItem value='Napa Extra'>Napa Extra</MenuItem>
                      </CustomTextField>
                      <CustomTextField rows={2} fullWidth multiline defaultValue='Kids' />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Type</Typography>
                      <CustomTextField select fullWidth defaultValue='Tablets' className='mbe-5'>
                        <MenuItem value='Tablets'>Tablets</MenuItem>
                        <MenuItem value='Capsules'>Capsules</MenuItem>
                        <MenuItem value='Liquids'>Liquids / Syrup</MenuItem>
                        <MenuItem value='Gel'>Gel</MenuItem>
                        <MenuItem value='Suppositories'>Suppositories</MenuItem>
                        <MenuItem value='Drop'>Drop</MenuItem>
                        <MenuItem value='Inhaler'>Inhaler</MenuItem>
                        <MenuItem value='Injection'>Injection</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8 '>Amount</Typography>
                      <div className='flex'>
                        <CustomTextField
                          {...(isBelowMdScreen ? { fullWidth: true } : { style: { width: '50%' } })}
                          type='number'
                          placeholder='1'
                          defaultValue='1'
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                        <p className='pt-3 ml-1'>mg</p>
                      </div>
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Price</Typography>
                      <Typography>$24.00</Typography>
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium '>To be continued upto</Typography>
                      <CustomTextField
                        label=''
                        type='date'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setFormData({ ...formData, admissionDate: e.target.value })}
                      />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium '>Times per Day</Typography>
                      <CustomTextField
                        {...(isBelowMdScreen ? { fullWidth: true } : { style: { width: '50%' } })}
                        type='number'
                        value={medicine.timesPerDay}
                        onChange={event => handleTimesPerDayChange(index, event)}
                        placeholder='1, 2, etc.'
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    {medicine.timesOfDay.map((timeOfDay, timeIndex) => (
                      <Grid key={timeIndex} item lg={2} md={3} xs={12}>
                        <Typography className='font-medium '>Time of Day {timeIndex + 1}</Typography>
                        <CustomTextField
                          select
                          fullWidth
                          value={timeOfDay}
                          onChange={event => handleTimesOfDayChange(index, timeIndex, event)}
                          className='mbe-5'
                        >
                          <MenuItem value='Morning'>Morning</MenuItem>
                          <MenuItem value='Afternoon'>Afternoon</MenuItem>
                          <MenuItem value='Evening'>Evening</MenuItem>
                          <MenuItem value='Night'>Night</MenuItem>
                        </CustomTextField>
                      </Grid>
                    ))}
                  </Grid>
                  <div className='flex flex-col justify-start border-is'>
                    <IconButton size='small' onClick={() => deleteForm(index)}>
                      <i className='tabler-x text-actionActive' />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Grid item xs={12}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={addMedicine}
                  startIcon={<i className='tabler-plus' />}
                >
                  Add Medicine
                </Button>
              </Grid>
              {/* Render Diet View if diet is added */}
              {dietAdded && <DietView dietData={openDietForm} />}
              {console.log(openDietForm)}
              {!dietAdded && (
                <Grid item xs={12} className='mt-4'>
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{
                      variant: 'contained',
                      onClick: handleDietViewOpen,
                      children: 'Add Diet'
                    }}
                    dialog={DietRecommendationForm}
                    dialogProps={{
                      open: openDietForm,
                      setOpen: setOpenDietForm,
                      onSubmit: handleDietSubmit,
                      doctorName: 'José Mourinho',
                      patientName: 'Russel Viper',
                      currentWeight: 75
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AddPatientDrawer open={open} handleClose={() => setOpen(false)} />
    </div>
  )
}

export default PrescriptionMaker
