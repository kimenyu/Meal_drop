const { Router } = require('express');
const accountsController = require('../controllers/restaurantUserController');
const router = Router();

router.post('/api/v1/auth/restaurantPartner/register', accountsController.register);
router.post('/api/v1/auth/restaurantPartner/login', accountsController.login);
router.get('/test', (req, res) => {
  res.send('Test route is working');
});

module.exports = router;
