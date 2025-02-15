const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.post('/increment', viewController.incrementViews);
router.get('/count', viewController.getViews);

module.exports = router;
