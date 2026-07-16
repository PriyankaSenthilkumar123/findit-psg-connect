const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

// Admin-only routes
router.get('/users', auth, admin, userController.getAllUsers);
router.get('/users/:id', auth, admin, validateObjectId(), userController.getUserById);
router.put('/users/:id/role', auth, admin, validateObjectId(), userController.updateUserRole);
router.delete('/users/:id', auth, admin, validateObjectId(), userController.deleteUser);
router.get('/users/:id/activity', auth, admin, validateObjectId(), userController.getUserActivity);
router.get('/stats/users', auth, admin, userController.getUserStats);
router.get('/stats/dashboard', auth, admin, userController.getDashboardStats);
router.get('/users/stats/public', userController.getPublicStats);
router.get('/recent-claims', userController.getRecentClaims);

module.exports = router;
