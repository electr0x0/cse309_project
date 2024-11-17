'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useColorScheme, useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const scatterColors = {
  series1: '#ff9f43',
  series2: '#7367f0',
  series3: '#28c76f'
}

const series = [
  {
    name: 'Cholesterol Level',
    data: [
      { x: 25, y: 200 },
      { x: 30, y: 210 },
      { x: 35, y: 190 },
      { x: 40, y: 220 },
      { x: 45, y: 240 },
      { x: 50, y: 230 },
      { x: 55, y: 250 },
      { x: 60, y: 260 },
      { x: 65, y: 270 },
      { x: 70, y: 280 }
    ]
  },
  {
    name: 'Blood Pressure',
    data: [
      { x: 25, y: 120 },
      { x: 30, y: 125 },
      { x: 35, y: 130 },
      { x: 40, y: 135 },
      { x: 45, y: 140 },
      { x: 50, y: 145 },
      { x: 55, y: 150 },
      { x: 60, y: 155 },
      { x: 65, y: 160 },
      { x: 70, y: 165 }
    ]
  }
]

const ApexScatterChart = ({ serverMode }) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode
  const divider = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
  const textDisabled = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        type: 'xy',
        enabled: true
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      markers: {
        offsetY: 2,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      fontSize: '13px',
      labels: { colors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`) },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    colors: [scatterColors.series1, scatterColors.series2],
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      title: {
        text: 'Levels',
        style: { color: theme.palette.text.primary }
      },
      labels: {
        style: { colors: textDisabled, fontSize: '13px' }
      }
    },
    xaxis: {
      title: {
        text: 'Age',
        style: { color: theme.palette.text.primary }
      },
      tickAmount: 10,
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: textDisabled, fontSize: '13px' },
        formatter: val => parseFloat(val).toFixed(0)
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Patient Age vs Health Metrics'
        subheader='Heart Health Hospital'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='scatter' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexScatterChart
