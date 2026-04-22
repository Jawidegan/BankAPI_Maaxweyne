const express = require('express');
const router = express.Router();
const { storeTransaction } = require('../controllers/transactionController');
const { verifyBankRequest } = require('../middleware/auth');

// POST /api/v1/transactions
// Secured by HMAC signature and API Key
router.post('/', verifyBankRequest, storeTransaction);

module.exports = router;
