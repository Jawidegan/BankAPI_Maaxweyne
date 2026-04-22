const crypto = require('crypto');
require('dotenv').config();

const verifyBankRequest = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const signature = req.headers['x-signature'];

    if (!apiKey || !signature) {
        return res.status(401).json({
            error: 'Missing authentication headers',
            required: ['X-API-Key', 'X-Signature']
        });
    }

    if (apiKey !== process.env.BANK_API_KEY) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    // Verify HMAC Signature
    // We use the raw body or the stringified body. 
    // For simplicity with Express, we'll use req.body stringified if it's JSON.
    const secret = process.env.BANK_API_SECRET;
    const bodyStr = JSON.stringify(req.body);
    
    const computedSignature = crypto
        .createHmac('sha256', secret)
        .update(bodyStr)
        .digest('hex');

    if (signature !== computedSignature) {
        // In production, you might want to log this but return a generic error
        console.error('Signature mismatch:', { received: signature, computed: computedSignature });
        return res.status(403).json({ error: 'Invalid Signature' });
    }

    next();
};

module.exports = { verifyBankRequest };
