import React, { useState, useMemo } from 'react'

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

import FacilityView from './FacilityView' // Adjust the path as necessary

//Core Imports
import OptionMenu from '@core/components/option-menu'

const Icon = styled('i')({})

const facilityData = [
  {
    facilityType: 'Hospital',
    name: 'City Hospital',
    address: '123 Main St, Anytown, USA',
    contactNo: '555-1234',
    mapLocation:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086316649431!2d-122.41941548468152!3d37.774929779759664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815c5f90b9d9%3A0x3043a1e237b3c2a8!2sCity%20Hospital!5e0!3m2!1sen!2sus!4v1627890190910!5m2!1sen!2sus',
    distance: '5 km',
    rating: 4.5,
    reviews: [
      { comment: 'Excellent service and care.', date: '2024-06-20' },
      { comment: 'Clean facilities and friendly staff.', date: '2024-06-18' }
    ],
    reason: 'Top-rated hospital in the area.'
  },
  {
    facilityType: 'Pharmacy',
    name: 'Health Pharmacy',
    address: '456 Elm St, Othertown, USA',
    contactNo: '555-5678',
    mapLocation:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086316649431!2d-122.41941548468152!3d37.774929779759664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815c5f90b9d9%3A0x3043a1e237b3c2a8!2sHealth%20Pharmacy!5e0!3m2!1sen!2sus!4v1627890190910!5m2!1sen!2sus',
    distance: '10 km',
    rating: 4.0,
    reviews: [
      { comment: 'Good selection of medications.', date: '2024-06-22' },
      { comment: 'Helpful and knowledgeable staff.', date: '2024-06-20' }
    ],
    reason: 'Well-stocked pharmacy with great service.'
  },
  {
    facilityType: 'Diagnostics Center',
    name: 'Precision Diagnostics',
    address: '789 Oak St, Anycity, USA',
    contactNo: '555-9012',
    mapLocation:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086316649431!2d-122.41941548468152!3d37.774929779759664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815c5f90b9d9%3A0x3043a1e237b3c2a8!2sPrecision%20Diagnostics!5e0!3m2!1sen!2sus!4v1627890190910!5m2!1sen!2sus',
    distance: '8 km',
    rating: 4.2,
    reviews: [
      { comment: 'Accurate results and efficient service.', date: '2024-06-19' },
      { comment: 'Modern equipment and comfortable environment.', date: '2024-06-17' }
    ],
    reason: 'Trusted diagnostics center with advanced technology.'
  }
]

const FacilityList = () => {
  const [data, setData] = useState(facilityData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewFacilityOpen, setFacilityOpen] = useState(false)
  const [whichFacility, setWhichFacility] = useState(null)

  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('facilityType', {
        header: 'Type',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.facilityType}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.address}</Typography>
      }),
      columnHelper.accessor('contactNo', {
        header: 'Contact No.',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.contactNo}</Typography>
      }),
      columnHelper.accessor('distance', {
        header: 'Distance',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.distance}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleViewFacility(row.original)}>
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

  const handleViewFacility = facility => {
    setWhichFacility(facility) // Set the selected facility data
    setFacilityOpen(true) // Open the FacilityView component
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
        <CardHeader title='Facilities' />
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
      {viewFacilityOpen && whichFacility && (
        <FacilityView open={viewFacilityOpen} handleClose={() => setFacilityOpen(false)} facilityData={whichFacility} />
      )}
    </>
  )
}

export default FacilityList
