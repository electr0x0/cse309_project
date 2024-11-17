'use client'

import React, { useEffect, useState } from 'react'

import { getUserHealthRecordList } from '@/api/apiHandler'
import PatientHealthRecordTable from '@views/patient/table/health-record/PatientHealthRecordTable'

function PatientHealthRecordTablePage() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserHealthRecordList(2)

        setTableData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user health records:', error)
      }
    }

    fetchData()
  }, [])

  return <PatientHealthRecordTable tableData={tableData} />
}

export default PatientHealthRecordTablePage
