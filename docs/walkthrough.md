# Maaxweyne Bank API Walkthrough

The Maaxweyne Bank API is a secure, professional-grade interface for receiving and storing bank transaction data.

## Key Features

- **High Security**: Uses HMAC-SHA256 signature verification to ensure data integrity and authenticity.
- **Robust Database Layer**: Powered by Prisma 7 and PostgreSQL, using an explicit `pg` adapter for maximum compatibility and performance.
- **Modern Stack**: Built with Node.js, Express 5, and Helmet for optimized security headers.
- **Scalable Design**: Clean controller-route-middleware architecture.

## Implementation Details

### Security (HMAC)
The API requires two headers for every request from the bank:
1. `X-API-Key`: Matches the bank's unique identifier.
2. `X-Signature`: A hexadecimal HMAC-SHA256 hash of the JSON request body, signed using the shared `BANK_API_SECRET`.

### Database Schema
The `Transaction` model includes:
- `id` (UUID)
- `bankTransactionId` (Unique ID from the bank)
- `accountNumber`
- `amount` (Decimal 15,2)
- `currency`
- `transactionDate`
- `createdAt` / `updatedAt`

## Verification Results

### Automated Test
A test script was executed to simulate a bank pushing a transaction.

```bash
node scratch/test_api.js
```

**Result:**
```json
{
  "message": "Transaction recorded successfully",
  "id": "7194898e-c856-41db-842c-1afa241e9ef0"
}
```

### Server Logs
```text
POST /api/v1/transactions 201 410.660 ms - 91
```

## How to use
1. Start the server: `npm run dev`
2. Endpoint: `POST http://localhost:5000/api/v1/transactions`
3. Required Headers:
   - `X-API-Key`
   - `X-Signature` (HMAC-SHA256 of body)
