const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { 
  createLostItem, 
  getLostItemMatches,
  getAllLostItems,
  getAllFoundItems,
  searchItems,
  getItemById,
  createFoundItem,
  getUserItems,
  updateItem,
  deleteItem,
  verifyAnswerSemantically
} = require('../controllers/itemController');

// Public routes (viewing items)
router.get('/lost-items', getAllLostItems);
router.get('/found-items', getAllFoundItems);
router.get('/search', searchItems);

// Item-specific routes
router.get('/lost-items/:id', validateObjectId(), getItemById);
router.get('/found-items/:id', validateObjectId(), getItemById);

// Protected routes (managing items)
router.post('/lost-items', auth, createLostItem);
router.post('/found-items', auth, createFoundItem);
router.get('/my-items', auth, getUserItems);
router.get('/matches/:id', auth, validateObjectId(), getLostItemMatches);
router.put('/lost-items/:id', auth, validateObjectId(), updateItem);
router.put('/found-items/:id', auth, validateObjectId(), updateItem);
router.delete('/lost-items/:id', auth, validateObjectId(), deleteItem);
router.delete('/found-items/:id', auth, validateObjectId(), deleteItem);
router.get('/lost-items/:id/matches', auth, validateObjectId(), getLostItemMatches);

// Semantic verification endpoint
router.post('/verify-answer', auth, verifyAnswerSemantically);

// Cleanup endpoints (for cleaning up low-quality matches)
const { cleanupLowQualityMatches, cleanupItemMatches } = require('../controllers/cleanupController');
router.post('/cleanup-matches', auth, cleanupLowQualityMatches);
router.post('/lost-items/:itemId/cleanup-matches', auth, validateObjectId('itemId'), cleanupItemMatches);

module.exports = router;