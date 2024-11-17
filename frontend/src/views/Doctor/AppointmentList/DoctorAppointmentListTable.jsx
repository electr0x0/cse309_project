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
import TableFilters from '../../../views/Doctor/AppointmentList/AppointmentTableFilter'
import AddAppointmentDrawer from './AddAppointmentDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import AppointmentStatisticsCard from './AppointmentStatisticsCards'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

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

const DoctorAppointmentsListTable = ({ tableData }) => {
  const [addAppointmentOpen, setAddAppointmentOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  const { lang: locale } = useParams()

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
        header: 'Description',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.description}</Typography>
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.date}</Typography>
      }),
      columnHelper.accessor('startTime', {
        header: 'Start Time',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.startTime}</Typography>
      }),
      columnHelper.accessor('endTime', {
        header: 'End Time',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.endTime}</Typography>
      }),
      columnHelper.accessor('patientName', {
        header: 'Patient Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <CustomAvatar size={34}>{getInitials(row.original.patientName)}</CustomAvatar>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.patientName}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('appointmentType', {
        header: 'Type',
        cell: ({ row }) => (
          <Typography color='text.primary'>{appointmentTypeObj[row.original.appointmentType]}</Typography>
        )
      }),
      columnHelper.accessor('roomNumber', {
        header: 'Room Number',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.appointmentType === 'online' ? (
              <a href={row.original.roomNumber} target='_blank' rel='noopener noreferrer'>
                Join Online
              </a>
            ) : (
              row.original.roomNumber
            )}
          </Typography>
        )
      }),
      columnHelper.accessor('done', {
        header: 'Complete',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.done}
            onChange={() => console.log('Why are you gay')}
            color='primary'
            inputProps={{ 'aria-label': 'mark appointment done' }}
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-trash text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton>
              {/* <Link href={getLocalizedUrl(`apps/appointment/view/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-[22px] text-textSecondary' />
              </Link> */}
            </IconButton>
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
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <AppointmentStatisticsCard className='mb-5' appointmentData={tableData} />
      <Card>
        {/* <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setData} tableData={tableData} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Appointment'
              className='is-full sm:is-auto'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddAppointmentOpen(!addAppointmentOpen)}
              className='is-full sm:is-auto'
            >
              Add New Appointment
            </Button>
          </div>
        </div> */}
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: classnames({
                              [tableStyles['cursor-pointer']]: header.column.getCanSort()
                            }),
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up' />,
                            desc: <i className='tabler-chevron-down' />
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ [tableStyles['is-selected']]: row.getIsSelected() })}>
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
      <AddAppointmentDrawer open={addAppointmentOpen} handleClose={() => setAddAppointmentOpen(false)} />
    </>
  )
}

export default DoctorAppointmentsListTable
