const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { notifyMatchedUsers } = require('../utils/emailService');

// Protected routes
router.post('/claims', auth, claimController.createClaim);
router.post('/claims/verify/:id', auth, validateObjectId(), claimController.verifyAnswer);
router.post('/claims/verify-and-claim', auth, claimController.verifyAndClaim);
router.get('/claims', auth, claimController.getUserClaims);
router.get('/claims/:id', auth, validateObjectId(), claimController.getClaimById);
router.put('/claims/:id/status', auth, validateObjectId(), claimController.updateClaimStatus);
router.put('/claims/:id/complete', auth, validateObjectId(), claimController.completeClaim);
router.delete('/claims/:id', auth, validateObjectId(), claimController.cancelClaim);

// Dev-only test route to trigger emails (only available in development)
if (process.env.NODE_ENV === 'development') {
	router.post('/claims/dev/test-email', async (req, res) => {
		try {
			const { lostEmail, foundEmail, itemName, lostName, foundName } = req.body || {};
			const lostUser = { name: lostName || 'Lost User', email: lostEmail || 'lost@example.com' };
			const foundUser = { name: foundName || 'Found User', email: foundEmail || 'found@example.com' };

			const result = await notifyMatchedUsers(lostUser, foundUser, itemName || 'Test Item');
			return res.json({ success: true, result });
		} catch (err) {
			console.error('Dev test email error:', err);
			return res.status(500).json({ success: false, error: err.message });
		}
	});
}

module.exports = router;
