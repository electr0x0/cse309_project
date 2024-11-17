import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Mock Data
const centerNames = ['HealthPlus Diagnostics', 'CareLab', 'CityDiagnostics']

const defaultTests = {
  'HealthPlus Diagnostics': [
    { name: 'X-Ray', price: 1000 },
    { name: 'CBC', price: 500 },
    { name: 'MRI', price: 4000 }
  ],
  CareLab: [
    { name: 'X-Ray', price: 1200 },
    { name: 'CBC', price: 550 },
    { name: 'Ultrasound', price: 1500 }
  ],
  CityDiagnostics: [
    { name: 'X-Ray', price: 900 },
    { name: 'CBC', price: 520 },
    { name: 'CT Scan', price: 5000 }
  ]
}

const DiagnosticTests = ({ searchValue }) => {
  // States
  const [selectedCenter, setSelectedCenter] = useState(centerNames[0])
  const [tests, setTests] = useState(defaultTests[selectedCenter])
  const [cart, setCart] = useState([])

  useEffect(() => {
    setTests(defaultTests[selectedCenter].filter(test => test.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [selectedCenter, searchValue])

  const addToCart = test => {
    setCart([...cart, test])
  }

  return (
    <Card>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <Typography variant='h5'>Select Diagnostic Center</Typography>
            <Select value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)}>
              {centerNames.map(center => (
                <MenuItem key={center} value={center}>
                  {center}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Grid container spacing={3}>
            {tests.length > 0 ? (
              tests.map((test, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>{test.name}</Typography>
                      <Typography>Price: ${test.price}</Typography>
                      <Button variant='contained' color='primary' onClick={() => addToCart(test)}>
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography className='text-center'>No tests found</Typography>
            )}
          </Grid>
          <Typography variant='h6' className='mt-4'>
            Cart ({cart.length} items)
          </Typography>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{`${item.name} - $${item.price}`}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default DiagnosticTests
