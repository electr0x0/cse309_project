import dbdata from '@/data/fakedb/doctorlist'

import DoctorList from '@views/hmanager/doctor/list'

function DoctorListPage() {
  return <DoctorList userData={dbdata} />
}

export default DoctorListPage
