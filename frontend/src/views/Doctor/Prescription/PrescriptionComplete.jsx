import React, { useState } from 'react'

import Tab from '@mui/material/Tab'
import MenuItem from '@mui/material/MenuItem'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { CardContent } from '@mui/material'

import PrescriptionList from './PrescriptionList'
import PrescriptionMaker from './PrescriptionMaker'

function PrescriptionComplete() {
  const [value, setValue] = useState('write')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const prescriptionData = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '123-456-7890',
      address: '123 Elm Street, Springfield',
      diagnosis: 'Hypertension',
      status: 'Pending'
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 36,
      gender: 'Female',
      contact: '234-567-8901',
      address: '456 Maple Avenue, Springfield',
      diagnosis: 'Diabetes',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      age: 52,
      gender: 'Male',
      contact: '345-678-9012',
      address: '789 Oak Boulevard, Springfield',
      diagnosis: 'Asthma',
      status: 'Completed'
    },
    {
      id: '4',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      contact: '456-789-0123',
      address: '101 Pine Street, Springfield',
      diagnosis: 'Allergies',
      status: 'Pending'
    },
    {
      id: '5',
      name: 'William Brown',
      age: 60,
      gender: 'Male',
      contact: '567-890-1234',
      address: '202 Birch Road, Springfield',
      diagnosis: 'Arthritis',
      status: 'Active'
    }
  ]

  const demoPrescriptionData = [
    {
      id: 1,
      patientName: 'John Doe',
      age: 30,
      gender: 'Male',
      contact: '123-456-7890',
      address: '123 Main St, New York, NY',
      diagnosis: 'Flu',
      doctor: 'Dr. Smith',
      issuedDate: '2024-01-15',
      dueDate: '2024-01-25',
      medicines: [
        {
          name: 'Paracetamol',
          type: 'Tablet',
          amount: '500 mg',
          price: '$5.00',
          timesPerDay: 3,
          timesOfDay: ['Morning', 'Afternoon', 'Night']
        },
        {
          name: 'Cough Syrup',
          type: 'Syrup',
          amount: '10 ml',
          price: '$7.00',
          timesPerDay: 2,
          timesOfDay: ['Morning', 'Night']
        }
      ]
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      age: 25,
      gender: 'Female',
      contact: '987-654-3210',
      address: '456 Elm St, San Francisco, CA',
      diagnosis: 'Migraine',
      doctor: 'Dr. Johnson',
      issuedDate: '2024-02-01',
      dueDate: '2024-02-10',
      medicines: [
        {
          name: 'Ibuprofen',
          type: 'Tablet',
          amount: '200 mg',
          price: '$4.00',
          timesPerDay: 2,
          timesOfDay: ['Morning', 'Night']
        }
      ]
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      age: 40,
      gender: 'Male',
      contact: '555-555-5555',
      address: '789 Oak St, Los Angeles, CA',
      diagnosis: 'Hypertension',
      doctor: 'Dr. Williams',
      issuedDate: '2024-03-05',
      dueDate: '2024-03-15',
      medicines: [
        {
          name: 'Amlodipine',
          type: 'Tablet',
          amount: '5 mg',
          price: '$10.00',
          timesPerDay: 1,
          timesOfDay: ['Morning']
        }
      ]
    }
  ]

  return (
    <div>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label=' Write Prescription' value='write' />
          <Tab label='Prescription History' value='list' />
        </TabList>
        <CardContent>
          {' '}
          <TabPanel value='write'>
            <PrescriptionMaker prescriptionData={prescriptionData} />
          </TabPanel>
          <TabPanel value='list'>
            <PrescriptionList prescriptionData={demoPrescriptionData} />
          </TabPanel>
        </CardContent>
      </TabContext>
    </div>
  )
}

export default PrescriptionComplete
