const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const API_URL = 'http://localhost:5000/api/v1/transactions';
const API_KEY = process.env.BANK_API_KEY || 'bank_mx_key_2024';
const API_SECRET = process.env.BANK_API_SECRET || 'bank_mx_secret_998877665544332211';

const sampleTransaction = {
    bankTransactionId: "TXN_" + Date.now(),
    accountNumber: "1234567890",
    amount: 1500.50,
    currency: "USD",
    description: "Monthly Rent Payment",
    transactionDate: new Date().toISOString()
};

const runTest = async () => {
    try {
        const bodyStr = JSON.stringify(sampleTransaction);
        
        // Generate Signature
        const signature = crypto
            .createHmac('sha256', API_SECRET)
            .update(bodyStr)
            .digest('hex');

        console.log('Sending transaction with signature:', signature);

        const response = await axios.post(API_URL, sampleTransaction, {
            headers: {
                'X-API-Key': API_KEY,
                'X-Signature': signature,
                'Content-Type': 'application/json'
            }
        });

        console.log('Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.status, error.response.data);
        } else {
            console.error('Error Message:', error.message);
        }
    }
};

runTest();
