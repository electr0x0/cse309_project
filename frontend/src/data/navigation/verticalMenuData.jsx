import { useEffect, useState } from 'react'

import { SubMenu, MenuItem } from '@menu/vertical-menu'

const verticalMenuData = [
  {
    label: 'Dashboard',
    href: '/patient/dashboard',
    icon: 'tabler-smart-home',
    type: 'patient'
  },

  {
    label: 'Health Record',
    href: '#',
    icon: 'tabler-report-medical',
    type: 'patient',
    menu: [
      {
        label: 'Submit New',
        href: '/patient/report/health',
        icon: 'tabler-report-medicals',
        type: 'patient'
      },
      {
        label: 'History',
        href: '/patient/report/health/history',
        icon: 'tabler-report-medicals',
        type: 'patient'
      }
    ]
  },
  { label: 'Recommendation', href: '/patient/recommendation', icon: 'tabler-sparkles', type: 'patient' },
  { label: 'Upload Diagnostic Report', href: '/patient/report/diagnosis', icon: 'tabler-test-pipe', type: 'patient' },
  { label: 'Appointments', href: '/patient/appointment', icon: 'tabler-calendar-week', type: 'patient' },
  {
    label: 'Order Medicine',
    type: 'patient',
    icon: 'tabler-medicine-syrup',
    href: '/patient/order/medicine'
  },
  {
    label: 'Diagnosis',
    type: 'patient',
    icon: 'tabler-medicine-syrup',
    href: '/patient/order/diagnosis',
    menu: [
      { label: 'Order Diagnosis', type: 'patient', icon: 'tabler-medicine-syrup', href: '/patient/order/diagnosis' },
      { label: 'View Reports', type: 'patient', icon: 'tabler-report', href: '/patient/order/diagnosis/report' }
    ]
  },
  { label: 'Medicine Schedule', href: '/patient/medicine-schedule/', icon: 'tabler-calendar-week', type: 'patient' },

  { label: 'Info', href: '/doctor/doctor_info/', icon: 'tabler-user', type: 'doctor' },
  { label: 'My Patients', href: '/doctor/your_patients/', icon: 'tabler-clipboard-list', type: 'doctor' },
  { label: 'Appointments', href: '/doctor/appointments/', icon: 'tabler-calendar-clock', type: 'doctor' },
  { label: 'Prescriptions', href: '/doctor/prescriptions/', icon: 'tabler-prescription', type: 'doctor' },
  { label: 'Dashboard', href: '#', icon: 'tabler-heart-rate-monitor', type: 'doctor' },

  {
    label: 'Facility - Admin',
    href: '/admin/facility',
    icon: 'tabler-building-skyscraper',
    type: 'manager',
    menu: [
      { label: 'Add New', href: '/admin/facility/add_facility', icon: 'tabler-ss', type: 'manager' },
      { label: 'Manage', href: '/admin/facility/manage_facility', icon: 'tabler-ussssder', type: 'manager' }
    ]
  },

  {
    label: 'Hospital',
    href: '/hmanager/hospital',
    icon: 'tabler-building-hospital',
    type: 'manager',
    menu: [
      {
        label: 'Manage Patients',
        href: '/hmanager/manage/patient/list',
        icon: 'tabler-health-recognition',
        type: 'manager'
      },
      { label: 'Patient Stats', href: '/hmanager/manage/patient/stats', icon: 'tabler-chart-pie-2', type: 'manager' },
      { label: 'Manage Doctors', href: '/hmanager/manage/doctor', icon: 'tabler-medical-cross', type: 'manager' }
    ]
  },

  {
    label: 'Pharmacy',
    href: '/pharmacy',
    icon: 'tabler-pill',
    type: 'manager',
    menu: [
      { label: 'View and Manage Meds', href: '/pharmacy/medicine/manage', icon: 'tabler-ss', type: 'manager' },
      { label: 'Create Invoice', href: '/pharmacy/create-invoice', icon: 'tabler-invoice', type: 'manager' },
      { label: 'Manage Orders', href: '/pharmacy/order/manage', icon: 'tabler-ss', type: 'manager' }
    ]
  },

  {
    label: 'Diagnostic Center',
    href: '/pharmacy',
    icon: 'tabler-stethoscope',
    type: 'manager',
    menu: [
      { label: 'Dashboard', href: '/diag/dash', icon: 'tabler-ss', type: 'manager' },
      { label: 'Test - Add Test', href: '/diag/addtest', icon: 'tabler-ss', type: 'manager' },
      { label: 'Test - Manage All', href: '/diag/managetests', icon: 'tabler-ss', type: 'manager' },
      { label: 'Test Requests - View', href: '/diag/view-orders', icon: 'tabler-ss', type: 'manager' },
      { label: 'Test Requests - Manage', href: '/diag/manage-orders', icon: 'tabler-ss', type: 'manager' },
      { label: 'History - All Test History', href: '/diag/history-orders', icon: 'tabler-ss', type: 'manager' }
    ]
  }
]

const MenuItems = () => {
  const [type, setType] = useState(null)

  useEffect(() => {
    const savedType = JSON.parse(sessionStorage.getItem('user')).type

    setType(savedType)
  }, [])

  return verticalMenuData.map(item => {
    if (item.type === type) {
      if (item.menu) {
        return (
          <SubMenu key={item.label} label={item.label} icon={<i className={item.icon} />}>
            {item.menu.map(subItem => (
              <MenuItem key={subItem.label} href={subItem.href} icon={<i className={subItem.icon} />}>
                {subItem.label}
              </MenuItem>
            ))}
          </SubMenu>
        )
      } else {
        return (
          <MenuItem key={item.label} href={item.href} icon={<i className={item.icon} />}>
            {item.label}
          </MenuItem>
        )
      }
    }

    return null
  })
}

export default MenuItems
