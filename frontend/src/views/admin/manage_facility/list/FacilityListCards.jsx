// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data = [
  {
    title: 'Hospitals',
    value: '123',
    avatarIcon: 'tabler-building-hospital',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '10%',
    subTitle: 'Current hospital count'
  },
  {
    title: 'Diagnostic Centers',
    value: '45',
    avatarIcon: 'tabler-stethoscope',
    avatarColor: 'error',
    change: 'positive',
    changeNumber: '5%',
    subTitle: 'Current diagnostic center count'
  },
  {
    title: 'Pharmacies',
    value: '78',
    avatarIcon: 'tabler-pill',
    avatarColor: 'success',
    change: 'negative',
    changeNumber: '2%',
    subTitle: 'Current pharmacy count'
  }
]

const FacilityListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FacilityListCards
