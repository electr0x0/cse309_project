'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

// Util Imports
import tableStyles from '@core/styles/table.module.css'

// Column Definitions
const columnHelper = createColumnHelper()

const diagnosticReports = [
  {
    testName: 'Blood Test',
    date: '2024-11-15',
    center: 'Health Center A',
    status: 'Ready'
  },
  {
    testName: 'X-Ray',
    date: '2024-11-14',
    center: 'Diagnostic Lab B',
    status: 'Waiting'
  },
  {
    testName: 'MRI Scan',
    date: '2024-11-13',
    center: 'Hospital C',
    status: 'Ready'
  },
  {
    testName: 'CT Scan',
    date: '2024-11-12',
    center: 'Medical Center D',
    status: 'Processing'
  }
]

const DiagnosticReportTable = () => {
  const [data] = useState(diagnosticReports)

  const columns = useMemo(
    () => [
      columnHelper.accessor('testName', {
        header: 'Test Name',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('center', {
        header: 'Center',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => (
          <Typography
            className={classnames('font-bold', {
              'text-green-600': info.getValue() === 'Ready',
              'text-orange-500': info.getValue() === 'Waiting',
              'text-yellow-500': info.getValue() === 'Processing'
            })}
          >
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: info => {
          const row = info.row.original

          return row.status === 'Ready' ? (
            <Button variant='contained' color='primary' onClick={() => alert(`Downloading report for ${row.testName}`)}>
              Download
            </Button>
          ) : (
            <Button variant='outlined' color='secondary' disabled>
              Not Ready
            </Button>
          )
        }
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      <CardHeader title='Diagnostic Reports' />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default DiagnosticReportTable
