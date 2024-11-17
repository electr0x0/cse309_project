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

import DietView from '../Diet/DietView'

const Icon = styled('i')({})

const dietData = [
  {
    patientName: 'John Doe',
    suggestedBy: 'doctor',
    doctorName: 'Dr. Smith',
    weight: 75,
    dateOfDiet: '2024-01-15',
    timeToContinue: { amount: 6, unit: 'months' },
    consultation: { isNeeded: true, interval: 2, unit: 'months' },
    goals: ['Weight Loss', 'Improved Fitness'],
    weightGoal: 70,
    otherHealthGoals: ['Lower Cholesterol', 'Better Sleep'],
    feedback: [
      { date: '2024-03-15', text: 'Feeling more energetic.' },
      { date: '2024-05-15', text: 'Lost 3 kg, on track with goals.' }
    ],
    description: 'A balanced diet plan to help reduce weight and improve overall fitness.',
    exercises: [
      { name: 'Push-ups', reps: 15, sets: 3 },
      { name: 'Squats', reps: 20, sets: 3 },
      { name: 'Plank', reps: '1 minute', sets: 3 }
    ]
  },
  {
    patientName: 'Jane Smith',
    suggestedBy: 'ai',
    weight: 68,
    dateOfDiet: '2024-02-01',
    timeToContinue: { amount: 1, unit: 'year' },
    consultation: { isNeeded: true, interval: 6, unit: 'months' },
    goals: ['Muscle Gain', 'Increased Stamina'],
    weightGoal: 65,
    otherHealthGoals: ['Improve Heart Health', 'Increase Flexibility'],
    feedback: [
      { date: '2024-04-01', text: 'Gained 2 kg muscle mass.' },
      { date: '2024-10-01', text: 'Stamina has significantly improved.' }
    ],
    description: 'A diet plan focused on muscle gain and increasing overall stamina.',
    exercises: [
      { name: 'Deadlifts', reps: 12, sets: 4 },
      { name: 'Pull-ups', reps: 10, sets: 3 },
      { name: 'Leg Press', reps: 15, sets: 3 }
    ]
  }
]

//add dietList PropLater
const DietList = () => {
  const [data, setData] = useState(dietData)
  const [globalFilter, setGlobalFilter] = useState('')

  const [viewDietOpen, setDietOpen] = useState(false)
  const [whichDiet, setWhichDiet] = useState(null)

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
              <Typography variant='body2'>{row.original.weight} kg</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('suggestedBy', {
        header: 'Suggested By',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.suggestedBy === 'doctor' ? `Doctor: ${row.original.doctorName}` : 'AI'}
          </Typography>
        )
      }),
      columnHelper.accessor('dateOfDiet', {
        header: 'Date of Diet',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.dateOfDiet}</Typography>
      }),
      columnHelper.accessor('timeToContinue', {
        header: 'Time to Continue',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.timeToContinue.amount} {row.original.timeToContinue.unit}
          </Typography>
        )
      }),
      columnHelper.accessor('consultation', {
        header: 'Consultation Needed',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.consultation.isNeeded
              ? `Every ${row.original.consultation.interval} ${row.original.consultation.unit}`
              : 'No'}
          </Typography>
        )
      }),
      columnHelper.accessor('goals', {
        header: 'Goals',
        cell: ({ row }) =>
          row.original.goals.map((goal, index) => <Chip key={index} label={goal} color='primary' className='mr-1' />)
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleViewDiet(row.original)}>
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

  const handleViewDiet = diet => {
    setWhichDiet(diet) // Set the selected diet data
    setDietOpen(true) // Open the DietView component
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
        <CardHeader title='Suggested Diets' />
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
      {viewDietOpen && whichDiet && (
        <DietView open={viewDietOpen} handleClose={() => setDietOpen(false)} dietData={whichDiet} />
      )}
    </>
  )
}

export default DietList
