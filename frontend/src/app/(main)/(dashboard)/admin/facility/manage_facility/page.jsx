import data from '@/data/fakedb/facilitylist'

import FacilityList from '@views/admin/manage_facility/list/'

const ManageFacilityPage = () => {
  return <FacilityList userData={data} />
}

export default ManageFacilityPage
