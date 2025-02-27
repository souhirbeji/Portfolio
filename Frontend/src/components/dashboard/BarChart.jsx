import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';

const BarChart = ({ data, title, className = '' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: '#8B5CF6', // violet-500
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: title,
            color: '#1F2937', // text-gray-800
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#4B5563' // text-gray-600
            },
            grid: {
              color: '#E5E7EB' // gray-200
            }
          },
          x: {
            ticks: {
              color: '#4B5563' // text-gray-600
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [data, title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}
    >
      <canvas ref={chartRef} />
    </motion.div>
  );
};

export default BarChart;
