const { Router } = require('express');
const accountsController = require('../controllers/accountsController');
const router = Router();

router.post('/api/v1/auth/register', accountsController.register);
router.post('/api/v1/auth/login', accountsController.login);
router.get('/test', (req, res) => {
  res.send('Test route is working');
});

module.exports = router;
