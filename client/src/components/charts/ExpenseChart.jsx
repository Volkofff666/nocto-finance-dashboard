import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const data = {
    labels: ['ФОТ', 'Офис', 'Маркетинг'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#18181b',
        borderColor: '#27272a',
        borderWidth: 1,
        titleColor: '#e4e4e7',
        bodyColor: '#a1a1aa',
        padding: 12
      }
    }
  };

  return (
    <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}