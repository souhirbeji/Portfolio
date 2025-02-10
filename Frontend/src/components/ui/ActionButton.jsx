import { motion } from 'framer-motion';

const ActionButton = ({ icon, label, onClick, color = "violet" }) => {
  const colors = {
    violet: "bg-violet-500 hover:bg-violet-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    amber: "bg-amber-500 hover:bg-amber-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-3 rounded-xl flex items-center space-x-2 
        shadow-lg hover:shadow-xl transition-all duration-200`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="font-medium">{label}</span>
    </motion.button>
  );
};

export default ActionButton;
