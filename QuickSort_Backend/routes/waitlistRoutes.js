

const express = require('express');
const router = express.Router();
const WaitlistController = require('../controllers/WaitlistController');

// Route for creating a waitlist entry
router.post('/', WaitlistController.create);

module.exports = router;
