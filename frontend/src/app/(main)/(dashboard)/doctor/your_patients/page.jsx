import React from 'react'

import PatientListTable from '@views/Doctor/CurrentPaitentList/PatientListTable'
import PatientListCards from '@views/Doctor/CurrentPaitentList/PatientListCards'

function CurrentPatients() {
  const patientData = [
    {
      fullName: 'John Doe',
      age: 35,
      gender: 'Male',
      contact: '123-456-7890',
      address: '123 Main St, Springfield',
      diagnosis: 'Hypertension',
      doctor: 'Dr. Smith',
      status: 'Active',
      admissionDate: '2024-01-01'
    },
    {
      fullName: 'Jane Smith',
      age: 28,
      gender: 'Female',
      contact: '098-765-4321',
      address: '456 Elm St, Springfield',
      diagnosis: 'Diabetes',
      doctor: 'Dr. Brown',
      status: 'Active',
      admissionDate: '2024-02-15'
    }
  ]

  return (
    <div>
      <PatientListTable tableData={patientData} />
      <PatientListCards className='mt-5' />
    </div>
  )
}

export default CurrentPatients
