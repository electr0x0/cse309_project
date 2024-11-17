// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

// Component Imports
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Leaflet Imports
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet/dist/leaflet.css'

const LocationMarker = ({ position, setPosition }) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, 18)
    }
  }, [position, map])

  useMapEvents({
    click: async e => {
      const { lat, lng } = e.latlng

      setPosition([lat, lng])
    }
  })

  return position === null ? null : <Marker position={position}></Marker>
}

const StepFacilityLocationDetails = ({ activeStep, handleNext, handlePrev, steps }) => {
  // States
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [address, setAddress] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [position, setPosition] = useState(null)

  const provider = new OpenStreetMapProvider()

  const handleSearch = async () => {
    const results = await provider.search({ query: searchQuery })

    if (results && results.length > 0) {
      const { x, y, label } = results[0]

      setLatitude(y)
      setLongitude(x)
      setAddress(label)
      setSearchQuery('')
      setPosition([y, x])
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Search Address'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button onClick={handleSearch}>Search</Button>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          label='Latitude'
          value={latitude}
          InputProps={{
            readOnly: true
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          label='Longitude'
          value={longitude}
          InputProps={{
            readOnly: true
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Selected Address'
          value={address}
          InputProps={{
            readOnly: true
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepFacilityLocationDetails
