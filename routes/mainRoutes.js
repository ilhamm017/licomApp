// Suggested code may be subject to a license. Learn more: ~LicenseLog:1518884260.
const express = require('express');
const router = express.Router();
const { main } = require('../controllers/mainControllers');

// Route for Facebook login
router.post('/', main);

module.exports = router;
