// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import MedicineListTable from './MedicineListTable'
import MedicineStatisticsTabs from './MedicineStatisticsTabs'

const PatientList = ({ medicineData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MedicineStatisticsTabs />
      </Grid>
      <Grid item xs={12} md={12}>
        <MedicineListTable tableData={medicineData} />
      </Grid>
    </Grid>
  )
}

export default PatientList
