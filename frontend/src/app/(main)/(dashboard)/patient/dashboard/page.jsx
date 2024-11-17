// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CongratulationsJohn from '@/views/patient/dashboard/Congratulations'
import StatisticsCard from '@/views/patient/dashboard/StatisticsCard'

import RadialBarChart from '@/views/patient/dashboard/RadialBarChart'
import DonutChartGeneratedLeads from '@/views/patient/dashboard/DonutChartGeneratedLeads'
import RevenueReport from '@/views/patient/dashboard/RevenueReport'
import EarningReports from '@/views/patient/dashboard/EarningReports'
import PopularProducts from '@/views/patient/dashboard/PopularProducts'

import Transactions from '@/views/patient/dashboard/Transactions'
import InvoiceListTable from '@/views/patient/dashboard/InvoiceListTable'
import SupportTracker from '@/views/patient/dashboard/SupportTracker'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const getData = async () => {
  return [
    {
      id: '4987',
      issuedDate: '13 Jun 2024',
      address: '7777 Mendez Plains',
      company: 'Hall-Robbins PLC',
      companyEmail: 'don85@johnson.com',
      country: 'USA',
      contact: '(616) 865-4180',
      name: 'Jordan Stevenson',
      service: 'Software Development',
      doctor: 'Ms. Doctor',
      avatar: '',
      avatarColor: 'primary',
      invoiceStatus: 'Paid',
      balance: '$724',
      dueDate: '23 Jun 2024'
    },
    {
      id: '4988',
      issuedDate: '17 Jun 2024',
      address: '04033 Wesley Wall Apt. 961',
      company: 'Mccann LLC and Sons',
      companyEmail: 'brenda49@taylor.info',
      country: 'Haiti',
      contact: '(226) 204-8287',
      name: 'Stephanie Burns',
      service: 'UI/UX Design & Development',
      doctor: 'Mr. Doctor',
      avatar: '/images/avatars/1.png',
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: '15 Jun 2024'
    }
  ]
}

const PatientDashboard = async () => {
  // Vars
  const invoiceData = await getData()
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <CongratulationsJohn />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid>

      <Grid item xs={12} md={5}>
        <SupportTracker serverMode={serverMode} />
      </Grid>

      <Grid item xs={12} md={7}>
        <RevenueReport serverMode={serverMode} />
      </Grid>

      <Grid item xs={12} lg={12}>
        <InvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default PatientDashboard
