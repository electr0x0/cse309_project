'use client'

import { useState, useEffect } from 'react'

import { List, Avatar, Button, ListItem, IconButton, Typography, MenuItem, Tab, Tabs, Box, Select } from '@mui/material'
import { toast } from 'react-toastify'

import { useDropzone } from 'react-dropzone'

import { uploadDiagnosisReport, getDiagnosisReportHistory } from '../../../api/apiHandler'

const FileUploaderRestrictions = ({ onUploadSuccess, fileType }) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 5000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload 5 files & maximum size of 5 MB.', {
        autoClose: 3000
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleUpload = async () => {
    const userId = JSON.parse(sessionStorage.getItem('user')).id.toString()
    const formData = new FormData()

    files.forEach(file => formData.append('files', file))
    formData.append('file_type', fileType)
    console.log(fileType)
    formData.append('user_id', userId)

    try {
      await uploadDiagnosisReport(formData)
      toast.success('Files uploaded successfully')
      handleRemoveAllFiles()
      onUploadSuccess() // Notify parent component about successful upload
    } catch (error) {
      toast.error('Failed to upload files')
    }
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='tabler-upload' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop files here or click to upload.
          </Typography>
          <Typography>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography>Max 5 files and max size of 5 MB</Typography>
        </div>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained' onClick={handleUpload}>
              Upload Files
            </Button>
          </div>
        </>
      ) : null}
    </>
  )
}

const DiagnosisForm = () => {
  const [value, setValue] = useState('upload')
  const [fileType, setFileType] = useState('')
  const [uploadHistory, setUploadHistory] = useState([])

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchUploadHistory = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem('user')).id.toString()
      const history = await getDiagnosisReportHistory(userId)

      console.log(history)
      setUploadHistory(history)
    } catch (error) {
      toast.error('Failed to fetch upload history')
    }
  }

  useEffect(() => {
    if (value === 'upload_history') {
      fetchUploadHistory()
    }
  }, [value])

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange} aria-label='Upload Tabs'>
        <Tab label='Upload' value='upload' />
        <Tab label='Upload History' value='upload_history' />
      </Tabs>
      {value === 'upload' && (
        <Box p={3}>
          <Typography variant='h6'>Upload Diagnostic Report</Typography>
          <Select
            fullWidth
            value={fileType}
            onChange={e => setFileType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select File Type' }}
          >
            <MenuItem value='' disabled>
              Select File Type
            </MenuItem>
            <MenuItem value='blood_test'>Blood Test</MenuItem>
            <MenuItem value='xray'>X-Ray</MenuItem>
            <MenuItem value='ecg'>ECG</MenuItem>
            <MenuItem value='mri'>MRI</MenuItem>
          </Select>
          <FileUploaderRestrictions onUploadSuccess={{ fetchUploadHistory, fileType }} />
        </Box>
      )}
      {value === 'upload_history' && (
        <Box p={3}>
          <Typography variant='h6'>Upload History</Typography>
          <List>
            {uploadHistory.map(report => (
              <ListItem key={report.id}>
                <Typography variant='body1'>
                  {report.file_type} - {report.file.split('/').pop()}
                </Typography>
                <Typography variant='body2'>{new Date(report.uploaded_at).toLocaleDateString()}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default DiagnosisForm
