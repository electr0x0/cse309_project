import Grid from '@mui/material/Grid'

import DiagnosisForm from '@/views/patient/forms/DiagnosisData'

function page() {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <DiagnosisForm />
      </Grid>
    </Grid>
  )
}

export default page
