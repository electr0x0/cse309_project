import React, { useState, useEffect } from 'react'

import { Modal, Box, Button, InputAdornment, Grid } from '@mui/material'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import axios from 'axios'

import CustomTextField from '@core/components/mui/TextField'
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet/dist/leaflet.css'

const reverseGeocode = async (lat, lon) => {
  const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      lat,
      lon,
      format: 'json'
    }
  })

  return response.data
}

const LocationMarker = ({ position, setPosition, setLatitude, setLongitude, setAddress }) => {
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
      setLatitude(lat)
      setLongitude(lng)
      const data = await reverseGeocode(lat, lng)

      setAddress(data.display_name)
    }
  })

  return position === null ? null : <Marker position={position}></Marker>
}

const GeoSearchModal = ({ open, onClose }) => {
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

  const handleSelectLocation = () => {
    onClose({
      address,
      latitude,
      longitude
    })
  }

  return (
    <Modal open={open} onClose={() => onClose(null)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 24
        }}
      >
        <Grid container spacing={3}>
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
              <LocationMarker
                position={position}
                setPosition={setPosition}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setAddress={setAddress}
              />
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
          <Grid item xs={12} className='flex justify-end'>
            <Button variant='contained' color='primary' onClick={handleSelectLocation}>
              Select Location
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default GeoSearchModal
