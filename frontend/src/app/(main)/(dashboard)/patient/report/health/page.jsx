import Grid from '@mui/material/Grid'

import FormLayoutsWithTabs from '@/views/patient/forms/HealthData'

function page() {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <FormLayoutsWithTabs />
      </Grid>
    </Grid>
  )
}

export default page
