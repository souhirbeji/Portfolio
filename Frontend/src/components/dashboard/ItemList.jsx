import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = ({ items, loading, onEdit, onDelete, renderItem }) => {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="grid gap-4">
      {items?.map((item, index) => {
        const renderedItem = renderItem(item);
        
        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {renderedItem.image && (
                  <img 
                    src={renderedItem.image}
                    alt={renderedItem.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                {renderedItem.icon && (
                  <div className="w-10 h-10 flex items-center justify-center">
                    {renderedItem.icon}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {renderedItem.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {renderedItem.subtitle}
                  </p>
                  {renderedItem.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {renderedItem.description}
                    </p>
                  )}
                  {renderedItem.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {renderedItem.date}
                    </p>
                  )}
                  {renderedItem.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {renderedItem.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-violet-100 dark:bg-violet-900 
                            text-violet-800 dark:text-violet-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-500 hover:text-violet-500 transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ItemList;
