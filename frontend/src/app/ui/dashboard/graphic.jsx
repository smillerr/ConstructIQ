'use client'
import React from 'react'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {} from 'chart.js/auto'
import {
  barChartData,
  horizontalBarChartData,
  lineChartData,
  ringChartData,
} from '@/lib/utils/mock/completChart'

export const RingChart = () => {
  const data = {
    labels: ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4'],
    datasets: [
      {
        label: 'Datos',
        data: ringChartData,
        backgroundColor: ['#4Ade80', '#FBBD08', '#F87171', '#60A5FA'],
      },
    ],
  }

  return (
    <Doughnut
      data={data}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: { legend: { position: 'bottom' } },
      }}
    />
  )
}

export const BarGraph = () => {
  const data = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: barChartData.map((item) => ({
      label: item.name,
      data: item.data,
      backgroundColor: '#4Ade80',
    })),
  }

  return (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        plugins: { legend: { position: 'bottom' } },
      }}
    />
  )
}

export const HorizontalBarGraph = () => {
  const data = {
    labels: horizontalBarChartData.map((item) => item.name),
    datasets: [
      {
        label: 'Datos',
        data: horizontalBarChartData.map((item) => item.data),
        backgroundColor: '#4Ade80',
      },
    ],
  }

  return (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        indexAxis: 'y',
        plugins: { legend: { position: 'bottom' } },
      }}
    />
  )
}

export const LineGraph = () => {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: lineChartData.map((item) => ({
      label: item.name,
      data: item.data,
      backgroundColor: '#60A5FA',
      borderColor: '#60A5FA',
      fill: false,
    })),
  }

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: { legend: { position: 'bottom' } },
      }}
    />
  )
}
