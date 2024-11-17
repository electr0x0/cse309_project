import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import MedicineListTable from './MedicineListTable'
import MedicineImage from './MedicineImage'

const MedicinesPage = () => {
  return (
    <div>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Medicines that are only available after prescription can be ordered by uploading a prescription.
      </Typography>
      <MedicineListTable />
      <Divider sx={{ my: 4 }} />
      <MedicineImage />
    </div>
  )
}

export default MedicinesPage
