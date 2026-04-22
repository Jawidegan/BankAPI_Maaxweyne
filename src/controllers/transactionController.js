const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const storeTransaction = async (req, res) => {
    try {
        const {
            bankTransactionId,
            accountNumber,
            amount,
            currency,
            description,
            transactionDate
        } = req.body;

        // Basic validation
        if (!bankTransactionId || !accountNumber || !amount || !transactionDate) {
            return res.status(400).json({ error: 'Missing required transaction fields' });
        }

        const transaction = await prisma.transaction.create({
            data: {
                bankTransactionId,
                accountNumber,
                amount: parseFloat(amount),
                currency: currency || 'USD',
                description,
                transactionDate: new Date(transactionDate)
            }
        });

        res.status(201).json({
            message: 'Transaction recorded successfully',
            id: transaction.id
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Duplicate bank transaction ID' });
        }
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { storeTransaction };
