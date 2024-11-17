'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const columnHelper = createColumnHelper()

const MedicineListTable = () => {
  // Dummy Data for Medicines
  const dummyData = [
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', price: '$5', qty: 20, status: 'inStock' },
    { id: 2, name: 'Amoxicillin', category: 'Antibiotic', price: '$12', qty: 15, status: 'outOfStock' },
    { id: 3, name: 'Ibuprofen', category: 'Pain Relief', price: '$8', qty: 50, status: 'inStock' },
    { id: 4, name: 'Cough Syrup', category: 'Cold & Flu', price: '$7', qty: 10, status: 'outOfStock' }
  ]

  const [data, setData] = useState(dummyData)

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Medicine Name',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.category}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) => <Typography>{row.original.price}</Typography>
      }),
      columnHelper.accessor('qty', {
        header: 'Quantity',
        cell: ({ row }) => <Typography>{row.original.qty}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Stock Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status === 'inStock' ? 'In Stock' : 'Out of Stock'}
            color={row.original.status === 'inStock' ? 'success' : 'error'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: () => (
          <Button variant='contained' color='primary'>
            Add to Cart
          </Button>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      <CardHeader title='Available Medicines' />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
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
    </Card>
  )
}

export default MedicineListTable
