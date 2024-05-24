'use client'

import React from 'react'
//import Chart from 'react-apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('@/ui/dashboard/dashboardOvervIew'), {
  ssr: false,
})

import {
  barChartData,
  horizontalBarChartData,
  lineChartData,
  ringChartData,
} from '@/lib/utils/mock/completChart'

export const RingChart = () => {
  const options = {
    labels: ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4'],
    legend: {
      position: 'bottom',
    },
  }

  return (
    <>
      <div className="mb-8">
        <Chart
          options={options}
          series={ringChartData}
          type="donut"
          width="400"
        />
      </div>
    </>
  )
}

export const BarGraph = () => {
  const options = {
    xaxis: {
      categories: ['A', 'B', 'C', 'D', 'E'],
    },
  }

  return (
    <>
      <div className="mb-8">
        <Chart options={options} series={barChartData} type="bar" width="500" />
      </div>
    </>
  )
}

export const HorizontalBarGraph = () => {
  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  }

  return (
    <>
      <div className="mb-8">
        <Chart
          options={options}
          series={horizontalBarChartData}
          type="bar"
          height="350"
        />
      </div>
    </>
  )
}

// Componente de gráfico de líneas
export const LineGraph = () => {
  const options = {
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  }

  return (
    <>
      <div className="mb-8">
        <Chart
          options={options}
          series={lineChartData}
          type="line"
          width="500"
        />
      </div>
    </>
  )
}
