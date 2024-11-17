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
const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const series = [
  {
    name: 'Hypertension',
    data: [30, 50, 80, 60, 100, 75, 40]
  },
  {
    name: 'Coronary Artery Disease',
    data: [20, 30, 45, 35, 50, 40, 25]
  }
]

const ApexColumnChart = ({ serverMode }) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode
  const divider = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
  const textDisabled = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '13px',
      labels: { colors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`) },
      markers: {
        offsetY: 2,
        offsetX: theme.direction === 'rtl' ? 7 : -4,
        radius: 12
      },
      itemMargin: {
        horizontal: 9
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: textDisabled, fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'],
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: textDisabled, fontSize: '13px' }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Heart Health Disease Count by Age'
        subheader='Heart Health Hospital'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='bar' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexColumnChart
