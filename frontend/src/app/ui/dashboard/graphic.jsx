'use client'
import React, { useState, useEffect } from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { getAccessToken } from '@/lib/utils/actions'
Chart.register(...registerables)

const fetchData = async (url) => {
  const access_token = await getAccessToken()
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching chart data:', error)
    return []
  }
}

const formatTime = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) {
    return days
  } else if (hours > 0) {
    return hours
  } else {
    return minutes
  }
}

export const LineGraph = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchData(`http://localhost:8000/dashboards/obras-completar-mas-rapido/`)
      .then((data) => {
        console.log('LineGraph data:', data)
        if (data.length === 0) {
          console.log('El array de datos está vacío')
        }
        setChartData(data)
      })
      .catch((error) => {
        console.error('Error fetching LineGraph data:', error)
      })
  }, [])

  const lineData = {
    labels: chartData.map((item) => item.nombre || ''),
    datasets: [
      {
        label: 'Tiempo Restante (días)',
        data: chartData.map(({ tiempo_restante }) =>
          formatTime(tiempo_restante),
        ),
        backgroundColor: 'rgb(44, 139, 228)',
        borderColor: 'rgb(100, 115, 111)',
        fill: false,
      },
    ],
  }

  return <Line data={lineData} options={{ maintainAspectRatio: false }} />
}

export const PieGraph = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchData(
      `http://localhost:8000/dashboards/obras-mayor-cantidad-personal/`,
    ).then((data) => {
      console.log('PieGraph data:', data)
      setChartData(data)
    })
  }, [])

  const pieData = {
    labels: chartData.map((item) => item.nombre),
    datasets: [
      {
        label: 'Cantidad de Personal',
        data: chartData.map((item) => item.num_personal),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8B5CF6',
          '#EC4899',
          '#2D3748',
          '#4FD1C5',
          '#F6E05E',
          '#D53F8C',
          '#3AE374',
          '#FF8C00',
          '#00FA9A',
          '#FF4500',
          '#1E90FF',
          '#FFD700',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8B5CF6',
          '#EC4899',
          '#2D3748',
          '#4FD1C5',
          '#F6E05E',
          '#D53F8C',
          '#3AE374',
          '#FF8C00',
          '#00FA9A',
          '#FF4500',
          '#1E90FF',
          '#FFD700',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, value) => acc + value,
              0,
            )
            const currentValue = context.raw
            const percentage = ((currentValue / total) * 100).toFixed(2)
            return `${context.label}: ${percentage}%`
          },
        },
      },
    },
  }

  return <Pie data={pieData} options={options} />
}

export const BarGraph = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchData(`http://localhost:8000/dashboards/obras-mayor-retraso/`)
      .then((data) => {
        console.log('BarGraph data:', data)
        setChartData(data)
      })
      .catch((error) => {
        console.error('Error fetching BarGraph data:', error)
      })
  }, [])

  const barData = {
    labels: chartData.map((item) => item.nombre || ''),
    datasets: [
      {
        label: 'Días de Retraso',
        data: chartData.map((item) => formatTime(item.retraso)),
        backgroundColor: 'rgb(4, 200, 2)',
        borderColor: '#60A5FA',
        borderWidth: 1,
      },
    ],
  }

  return <Bar data={barData} options={{ maintainAspectRatio: false }} />
}

export const HorizontalBarGraph = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchData(`http://localhost:8000/dashboards/user-role-stats/`)
      .then((data) => {
        console.log('HorizontalBarGraph data:', data)
        setChartData(data)
      })
      .catch((error) => {
        console.error('Error fetching HorizontalBarGraph data:', error)
      })
  }, [])

  const horizontalBarData = {
    labels: chartData.map((item) => item.tipo_usuario || ''),
    datasets: [
      {
        label: 'Cantidad de Usuario',
        data: chartData.map((item) => item.count),
        backgroundColor: 'rgb(224, 155, 100)',
        borderColor: '#040802',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
  }

  return <Bar data={horizontalBarData} options={options} />
}
