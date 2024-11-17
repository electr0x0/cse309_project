'use client'

import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const registerUser = async userData => {
  userData.username = userData.email

  return apiClient.post('/api/register/', userData)
}

export const loginUser = async credentials => {
  return apiClient.post('/api/login/', credentials)
}

export const postHealthRecord = async healthRecord => {
  return apiClient.post('/api/patient/healthrecord/', healthRecord)
}

export const getUserHealthRecordList = async userID => {
  return apiClient.get(`/api/patient/healthrecord/view/${userID}`)
}

export const deleteHealthRecord = async id => {
  try {
    const response = await apiClient.delete(`/api/patient/healthrecord/delete/${id}/`)

    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const uploadDiagnosisReport = async formData => {
  const response = await apiClient.post('/api/patient/diagnosisreport/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

export const getDiagnosisReportHistory = async userID => {
  const response = await apiClient.get('/api/patient/diagnosisreport/history/' + userID)

  return response.data
}
