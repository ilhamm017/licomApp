// Suggested code may be subject to a license. Learn more: ~LicenseLog:1518884260.
const express = require('express');
const router = express.Router();
const { main, web } = require('../controllers/mainControllers');

// Route for Facebook login
router.post('/action', main);
router.get('/', web)

module.exports = router;
