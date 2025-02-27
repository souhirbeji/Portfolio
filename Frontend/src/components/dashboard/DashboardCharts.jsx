import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';

const DashboardCharts = ({ data, timeFilter }) => {
  const skillsChartRef = useRef(null);

  useEffect(() => {
    const skillsChart = new Chart(skillsChartRef.current, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data.skillsByCategory),
        datasets: [{
          data: Object.values(data.skillsByCategory),
          backgroundColor: [
            '#8B5CF6',
            '#3B82F6',
            '#10B981',
            '#F59E0B',
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#4B5563' // text-gray-600
            }
          },
          title: {
            display: true,
            text: 'Skills Distribution',
            color: '#1F2937' // text-gray-800
          },
        },
      },
    });

    return () => {
      skillsChart.destroy();
    };
  }, [data, timeFilter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Skills Overview
        </h3>
        <canvas ref={skillsChartRef} />
      </motion.div>
    </div>
  );
};

export default DashboardCharts;
