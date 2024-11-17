// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AddCard from '@views/pharmacy/invoice/add/AddCard'
import data from '@/data/fakedb/invoicedata'

const InvoiceAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <AddCard invoiceData={data} />
      </Grid>
    </Grid>
  )
}

export default InvoiceAdd
