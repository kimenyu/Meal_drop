const { Router } = require('express');
const customerAccountControllers = require('../controllers/customerAccountsController');
const router = Router();

router.post('/api/v1/customerAccounts/register', customerAccountControllers.register);
router.post('/api/v1/customerAccounts/login', customerAccountControllers.login);

module.exports = router;