const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const experienceController = require('../controllers/experienceController');

router.get('/', experienceController.getAllExperiences);
router.get('/:id', auth, experienceController.getExperienceById);
router.post('/', auth, experienceController.createExperience);
router.put('/:id', auth, experienceController.updateExperience);
router.delete('/:id', auth, experienceController.deleteExperience);

module.exports = router;
