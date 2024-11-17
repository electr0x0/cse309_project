// Next Imports
import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import ApexAreaChart from '@views/hmanager/patient/charts/ApexAreaChart'
import ApexColumnChart from '@views/hmanager/patient/charts/ApexColumnChart'
import ApexScatterChart from '@views/hmanager/patient/charts/ApexScatterChart'

const ApexCharts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Patient Data</Typography>
        <Typography>
          <code>visual summary</code> of patient data
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ApexAreaChart />
      </Grid>
      <Grid item xs={12}>
        <ApexColumnChart />
      </Grid>
      <Grid item xs={12}>
        <ApexScatterChart />
      </Grid>
    </Grid>
  )
}

export default ApexCharts
