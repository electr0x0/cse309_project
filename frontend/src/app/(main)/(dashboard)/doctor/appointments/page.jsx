import React from 'react'

import AppointmentTabBased from '@views/Doctor/AppointmentList/AppointmentTabBased'

function DoctorAppointments() {
  // Sample patient objects
  const appointmentData = [
    {
      id: 1,
      title: 'Check-up',
      description: 'Regular check-up appointment',
      date: '2024-06-20',
      startTime: '10:00',
      endTime: '11:00',
      room: 'Room A',
      patientName: 'John Doe',
      appointmentType: 'physical',
      roomNumber: 'RA503'
    },
    {
      id: 2,
      title: 'Follow-up',
      description: 'Follow-up appointment after surgery',
      date: '2024-06-22',
      startTime: '14:30',
      endTime: '15:30',
      room: 'Room B',
      patientName: 'Jane Smith',
      appointmentType: 'online',
      roomNumber: 'https://meet.google.com/abc-xyz'
    },
    {
      id: 3,
      title: 'Consultation',
      description: 'Consultation for treatment plan',
      date: '2024-06-25',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room C',
      patientName: 'Michael Johnson',
      appointmentType: 'physical',
      roomNumber: 'RA505'
    }
  ]

  return (
    <div>
      <AppointmentTabBased />
    </div>
  )
}

export default DoctorAppointments
