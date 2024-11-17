import dbdata from '@/data/fakedb/patientlist'

import PatientList from '@views/hmanager/patient/list'

function PatientListPage() {
  return <PatientList userData={dbdata} />
}

export default PatientListPage
