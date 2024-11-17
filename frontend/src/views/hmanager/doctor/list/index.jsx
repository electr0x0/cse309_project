// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import DoctorListTable from './DoctorListTable'
import DoctorListCards from './DoctorListCards'

const PatientList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <DoctorListCards />
      </Grid>
      <Grid item xs={12} md={12}>
        <DoctorListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default PatientList
