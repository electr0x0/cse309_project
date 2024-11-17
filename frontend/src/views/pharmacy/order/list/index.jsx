// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderListTable from './OrderListTable'

const OrderList = ({ orderData }) => {
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <MedicineStatisticsTabs />
      </Grid> */}
      <Grid item xs={12} md={12}>
        <OrderListTable tableData={orderData} />
      </Grid>
    </Grid>
  )
}

export default OrderList
