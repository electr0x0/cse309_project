'use client'

import React, { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Core Imports
import OptionMenu from '@core/components/option-menu'

import PrescriptionView from '../Prescription/PrescriptionView'

const Icon = styled('i')({})

const PrescriptionList = ({ prescriptionData }) => {
  const [data, setData] = useState(prescriptionData)
  const [globalFilter, setGlobalFilter] = useState('')

  const [viewPrescriptionOpen, setPrescriptionOpen] = useState(false)
  const [whichPrescription, setWhichPrescription] = useState(null)

  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('patientName', {
        header: 'Patient',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.patientName}
              </Typography>
              <Typography variant='body2'>{row.original.age} years old</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('doctor', {
        header: 'Doctor',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.doctor}
          </Typography>
        )
      }),
      columnHelper.accessor('diagnosis', {
        header: 'Diagnosis',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.diagnosis}
          </Typography>
        )
      }),
      columnHelper.accessor('medicines', {
        header: 'Medicines',
        cell: ({ row }) =>
          row.original.medicines.map((medicine, index) => (
            <Typography key={index} color='text.primary'>
              {medicine.name} - {medicine.amount}
            </Typography>
          ))
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Date Issued',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.issuedDate}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleViewPrescription(row.original)}>
              <i className='tabler-eye text-[22px] text-textSecondary' />
            </IconButton>
            {/* Update Button (Edit) */}
            <IconButton>
              <OptionMenu
                iconClassName='text-[22px] text-textSecondary'
                options={[
                  {
                    text: 'Edit',
                    icon: 'tabler-edit text-[22px]',
                    menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                  }
                ]}
              />
            </IconButton>
            {/* Delete Button */}
            <IconButton>
              <i className='tabler-trash text-[22px] text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  const handleViewPrescription = prescription => {
    setWhichPrescription(prescription) // Set the selected prescription data
    setPrescriptionOpen(true) // Open the PrescriptionView component
  }

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <Card>
        <CardHeader title='Prescriptions' />
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: classnames({
                              'cursor-pointer': header.column.getCanSort()
                            }),
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <Icon className='tabler-chevron-up' />,
                            desc: <Icon className='tabler-chevron-down' />
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={classnames({ 'is-selected': row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={table.getPageCount() * table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, newPage) => table.setPageIndex(newPage)}
          rowsPerPage={table.getState().pagination.pageSize}
          onRowsPerPageChange={event => table.setPageSize(Number(event.target.value))}
        />
      </Card>
      {viewPrescriptionOpen && whichPrescription && (
        <PrescriptionView
          open={viewPrescriptionOpen}
          handleClose={() => setPrescriptionOpen(false)}
          prescriptionData={whichPrescription}
        />
      )}
    </>
  )
}

export default PrescriptionList
