// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import MedicineStatisticsTabs from './MedicineStatisticsTabs'

const PatientListCards = () => {
  return (
    <Grid container spacing={6}>
      <MedicineStatisticsTabs />
    </Grid>
  )
}

export default PatientListCards
