import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createExperience, updateExperience } from '../../redux/Slices/ExperienceThunk';
import { FormField, Input, Select, TextArea, TagInput, Button, DatePicker } from './FormComponents';
import { EMPLOYMENT_TYPES, COLOR_THEMES, TECH_STACK } from '../../utils/constants';

const ExperienceForm = ({ experienceToEdit, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.experiences);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    type: 'CDI',
    achievements: [],
    technologies: [],
    responsibilities: [],
    teamSize: '',
    projectCount: '',
    tools: [],
    keywords: [],
    color: 'violet',
    highlights: '',
    companyLogo: '',
    websiteUrl: '',
    linkedInUrl: ''
  });

  useEffect(() => {
    if (experienceToEdit) {
      setFormData({
        ...experienceToEdit,
        current: !experienceToEdit.endDate
      });
    }
  }, [experienceToEdit]);

  const formatDateForAPI = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        startDate: formatDateForAPI(formData.startDate),
        endDate: formData.current ? null : formatDateForAPI(formData.endDate),
        achievements: formData.achievements.filter(Boolean),
        responsibilities: formData.responsibilities.filter(Boolean),
        tools: formData.tools.filter(Boolean),
        keywords: formData.keywords.filter(Boolean)
      };

      if (experienceToEdit) {
        await dispatch(updateExperience({ 
          id: experienceToEdit._id, 
          experienceData: formattedData 
        })).unwrap();
      } else {
        await dispatch(createExperience(formattedData)).unwrap();
      }
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 max-h-[80vh] overflow-y-auto"
      onSubmit={handleSubmit}
    >
      {/* Base Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Job Title" required>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Senior Full Stack Developer"
            required
          />
        </FormField>

        <FormField label="Company" required>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Tech Company Inc."
            required
          />
        </FormField>

        <FormField label="Location" required>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Paris, France"
            required
          />
        </FormField>

        <FormField label="Employment Type" required>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={EMPLOYMENT_TYPES}
            required
          />
        </FormField>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Start Date" required>
          <DatePicker
            value={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
            required
          />
        </FormField>

        <FormField label="End Date">
          <DatePicker
            value={formData.endDate}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
            disabled={formData.current}
          />
        </FormField>

        <FormField label="Current Position">
          <div className="flex items-center h-full">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ 
                ...formData, 
                current: e.target.checked,
                endDate: e.target.checked ? '' : formData.endDate 
              })}
              className="w-4 h-4 text-violet-600"
            />
            <span className="ml-2">I currently work here</span>
          </div>
        </FormField>
      </div>

      {/* Description and Details */}
      <FormField label="Description" required>
        <TextArea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          placeholder="Describe your role and main responsibilities..."
          required
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Team Size">
          <Input
            type="number"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            placeholder="5"
          />
        </FormField>

        <FormField label="Number of Projects">
          <Input
            type="number"
            value={formData.projectCount}
            onChange={(e) => setFormData({ ...formData, projectCount: e.target.value })}
            placeholder="3"
          />
        </FormField>
      </div>

      {/* Lists */}
      <FormField label="Key Achievements">
        <TextArea
          value={formData.achievements.join('\n')}
          onChange={(e) => setFormData({ 
            ...formData, 
            achievements: e.target.value.split('\n')
          })}
          rows={4}
          placeholder="• Increased team productivity by 40%&#10;• Implemented new CI/CD pipeline&#10;• Reduced bug rate by 60%"
        />
      </FormField>

      <FormField label="Main Responsibilities">
        <TextArea
          value={formData.responsibilities.join('\n')}
          onChange={(e) => setFormData({ 
            ...formData, 
            responsibilities: e.target.value.split('\n')
          })}
          rows={4}
          placeholder="• Led team of 5 developers&#10;• Managed sprint planning&#10;• Architected new features"
        />
      </FormField>

      <FormField label="Technologies Used">
        <TagInput
          value={formData.technologies}
          onChange={(techs) => setFormData({ ...formData, technologies: techs })}
          suggestions={TECH_STACK}
        />
      </FormField>

      <FormField label="Tools & Software">
        <TagInput
          value={formData.tools}
          onChange={(tools) => setFormData({ ...formData, tools: tools })}
          suggestions={['Jira', 'Git', 'Docker', 'Jenkins', 'AWS']}
        />
      </FormField>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Company Logo URL">
          <Input
            type="url"
            value={formData.companyLogo}
            onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
            placeholder="https://company.com/logo.png"
          />
        </FormField>

        <FormField label="Company Website">
          <Input
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            placeholder="https://company.com"
          />
        </FormField>
      </div>

      <FormField label="Theme Color">
        <Select
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          options={COLOR_THEMES}
        />
      </FormField>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : experienceToEdit ? 'Update Experience' : 'Create Experience'}
        </Button>
      </div>
    </motion.form>
  );
};

export default ExperienceForm;
