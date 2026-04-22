const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Body Parser
// We use express.json() but we might need the raw body for HMAC if the 
// stringification order is inconsistent. For now, standard JSON is fine.
app.use(express.json());

// Routes
app.use('/api/v1/transactions', transactionRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Maaxweyne Bank API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Security: HMAC-SHA256 Enabled`);
    console.log(`==========================================`);
});
