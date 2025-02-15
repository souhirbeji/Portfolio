import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const QuoteCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <FaQuoteLeft className="w-8 h-8 opacity-50" />
        <blockquote className="text-xl font-medium italic">
          "Le savoir est une arme. Celui qui maîtrise l’information domine le monde." 
        </blockquote>
        <cite className="text-sm not-italic opacity-75">- –Nico Robin</cite>
      </div>
    </motion.div>
  );
};

export default QuoteCard;
