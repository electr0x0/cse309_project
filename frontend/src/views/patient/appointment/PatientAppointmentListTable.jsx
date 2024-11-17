'use client'

// React Imports
import React, { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports

import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import AppointmentStatisticsCards from '@/views/patient/appointment/AppointmentStatisticsCards'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const appointmentTypeObj = {
  online: 'Online',
  physical: 'Physical'
}

const columnHelper = createColumnHelper()

const PatientAppointmentsListTable = ({ tableData }) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Appointment Title',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.title}
          </Typography>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Purpose of Visit',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.description}</Typography>
      }),
      columnHelper.accessor('date', {
        header: 'Date & Time',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.date} {row.original.startTime} - {row.original.endTime}
          </Typography>
        )
      }),
      columnHelper.accessor('doctorName', {
        header: 'Doctor',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            Dr. {row.original.doctorName}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <Button
            variant='contained'
            size='small'
            color={row.original.isBooked ? 'error' : 'primary'}
            onClick={() =>
              row.original.isBooked
                ? console.log('Cancel appointment logic here')
                : console.log('Book appointment logic here')
            }
          >
            {row.original.isBooked ? 'Cancel Appointment' : 'Book Appointment'}
          </Button>
        ),
        enableSorting: false
      })
    ],
    []
  )

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <AppointmentStatisticsCards className='mb-5' appointmentData={tableData} />
      <Card>
        <div className='flex justify-between items-center p-6'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Appointments'
          />
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePaginationComponent table={table} />
      </Card>
    </>
  )
}

export default PatientAppointmentsListTable
