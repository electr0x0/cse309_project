'use client'

import MedicineListTable from '@views/pharmacy/medicine/list'
import data from '@/data/fakedb/medicinelist'

function ManageMedicinePage() {
  return <MedicineListTable medicineData={data} />
}

export default ManageMedicinePage
