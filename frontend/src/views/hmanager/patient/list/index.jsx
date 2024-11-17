// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PatientListTable from './PatientListTable'
import PatientListCards from './PatientListCards'

const PatientList = ({ userData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12}>
        <PatientListTable tableData={userData} />
      </Grid>
      {/* <Grid item xs={12}>
        <PatientListCards />
      </Grid> */}
    </Grid>
  )
}

export default PatientList
