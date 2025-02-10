import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';

const DashboardCharts = ({ data, timeFilter }) => {
  const skillsChartRef = useRef(null);
  const projectsChartRef = useRef(null);
  const timelineChartRef = useRef(null);

  useEffect(() => {
    // Initialize charts
    const skillsChart = new Chart(skillsChartRef.current, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data.skillsByCategory),
        datasets: [{
          data: Object.values(data.skillsByCategory),
          backgroundColor: [
            '#8B5CF6', // violet-500
            '#3B82F6', // blue-500
            '#10B981', // emerald-500
            '#F59E0B', // amber-500
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Skills Distribution',
          },
        },
      },
    });

    // Cleanup
    return () => {
      skillsChart.destroy();
    };
  }, [data, timeFilter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Skills Overview
        </h3>
        <canvas ref={skillsChartRef} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Project Technologies
        </h3>
        <canvas ref={projectsChartRef} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Experience Timeline
        </h3>
        <canvas ref={timelineChartRef} />
      </motion.div>
    </div>
  );
};

export default DashboardCharts;
