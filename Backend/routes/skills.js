const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const skillController = require('../controllers/skillController');

router.get('/', skillController.getAllSkills);
router.get('/:id', auth, skillController.getSkillById);
router.post('/', auth, skillController.createSkill);
router.put('/:id', auth, skillController.updateSkill);
router.delete('/:id', auth, skillController.deleteSkill);

module.exports = router;
