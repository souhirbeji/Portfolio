import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createProject, updateProject } from '../../redux/Slices/Projectthunk';
import { FormField, Input, Select, TextArea, TagInput, Button } from './FormComponents';
import { PROJECT_CATEGORIES, TECH_STACK } from '../../utils/constants';

const ProjectForm = ({ projectToEdit, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.projects);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    githubLink: '',
    demoLink: '',
    category: 'frontend'
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit);
    }
  }, [projectToEdit]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <FormField label="Project Title" required>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="My Awesome Project"
          required
        />
      </FormField>

      <FormField label="Description" required>
        <TextArea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </FormField>

      <FormField label="Technologies">
        <TagInput
          value={formData.technologies}
          onChange={(techs) => setFormData({ ...formData, technologies: techs })}
          suggestions={TECH_STACK}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Image URL" required>
          <Input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
          />
        </FormField>

        <FormField label="GitHub Link" required>
          <Input
            type="url"
            value={formData.githubLink}
            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            placeholder="https://github.com/username/project"
            required
          />
        </FormField>

        <FormField label="Demo Link" required>
          <Input
            type="url"
            value={formData.demoLink}
            onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
            placeholder="https://myproject.com"
            required
          />
        </FormField>

        <FormField label="Category" required>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={PROJECT_CATEGORIES}
            required
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {projectToEdit ? 'Update' : 'Create'} Project
        </Button>
      </div>
    </motion.form>
  );
};

export default ProjectForm;
