import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createSkill, updateSkill } from '../../redux/Slices/SkillThunk';
import { FormField, Input, Select, Button } from './FormComponents';
import { SKILL_CATEGORIES, ICONS } from '../../utils/constants';

const SkillForm = ({ skillToEdit, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.skills);
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    icon: '',
    iconColor: 'blue-500'
  });
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    if (skillToEdit) {
      setFormData(skillToEdit);
      const iconObj = ICONS[skillToEdit.category]?.find(i => i.icon === skillToEdit.icon);
      setSelectedIcon(iconObj);
    }
  }, [skillToEdit]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prev => ({
      ...prev,
      category,
      icon: '',
      iconColor: 'blue-500'
    }));
    setSelectedIcon(null);
  };

  const handleIconSelect = (iconObj) => {
    setSelectedIcon(iconObj);
    setFormData(prev => ({
      ...prev,
      icon: iconObj.name, // On envoie le nom de l'icône au lieu de l'objet icon
      iconColor: iconObj.color
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-2xl shadow-lg space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          if (skillToEdit) {
            await dispatch(updateSkill({ id: skillToEdit._id, skillData: formData })).unwrap();
          } else {
            await dispatch(createSkill(formData)).unwrap();
          }
          onCancel();
        } catch (err) {
          console.error('Failed to save skill:', err);
        }
      }}
    >
      <FormField label="Skill Name">
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </FormField>

      <FormField label="Category">
        <Select
          value={formData.category}
          onChange={handleCategoryChange}
          options={SKILL_CATEGORIES}
          required
        />
      </FormField>

      <FormField label="Select Icon">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          {ICONS[formData.category]?.map((iconObj) => {
            const IconComponent = iconObj.icon;
            return (
              <button
                key={iconObj.name}
                type="button"
                onClick={() => handleIconSelect(iconObj)}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all
                  ${selectedIcon?.name === iconObj.name 
                    ? 'bg-violet-100 ring-2 ring-violet-500' 
                    : 'bg-white hover:bg-gray-50'}`}
              >
                <IconComponent className={`text-2xl text-${iconObj.color}`} />
                <span className="text-sm text-gray-600">{iconObj.name}</span>
              </button>
            );
          })}
        </div>
      </FormField>

      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : skillToEdit ? 'Update Skill' : 'Create Skill'}
        </Button>
      </div>
    </motion.form>
  );
};

export default SkillForm;
