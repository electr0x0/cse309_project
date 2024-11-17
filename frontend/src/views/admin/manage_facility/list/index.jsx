// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import FacilityListTable from './FacilityListTable'
import FacilityListCards from './FacilityListCards'

const FacilityList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FacilityListCards />
      </Grid>
      <Grid item xs={12}>
        <FacilityListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default FacilityList
