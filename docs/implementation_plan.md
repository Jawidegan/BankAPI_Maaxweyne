# Maaxweyne Bank API Implementation Plan

The goal is to build a professional, secure, and robust API to receive and store bank transaction data. The system will use Node.js/Express for the backend and PostgreSQL for data storage.

## User Review Required

> [!IMPORTANT]
> **Database Credentials**: I will use the provided credentials (`postgres:123456`). Please ensure the PostgreSQL server is running and accessible.
> **Security Protocol**: I propose using **HMAC (Hash-based Message Authentication Code)** for the Bank API Key and Secret verification. This ensures that the message hasn't been tampered with during transit.

## Proposed Changes

### Project Initialization

#### [NEW] [package.json](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/package.json)
Initialize the project with necessary dependencies: `express`, `prisma`, `@prisma/client`, `dotenv`, `helmet`, `cors`, `morgan`, `crypto`.

#### [NEW] [.env](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/.env)
Store environment variables: `DATABASE_URL`, `PORT`, `BANK_API_KEY`, `BANK_API_SECRET`.

### Database Layer (Prisma)

#### [NEW] [schema.prisma](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/prisma/schema.prisma)
Define the `Transaction` model:
- `id`: UUID (Primary Key)
- `bankTransactionId`: Unique ID from the bank
- `accountNumber`: String
- `amount`: Decimal
- `currency`: String (e.g., USD, EUR)
- `description`: String
- `transactionDate`: DateTime
- `createdAt`: DateTime

### Security Layer

#### [NEW] [authMiddleware.js](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/src/middleware/auth.js)
Implement a middleware to verify the `X-API-Key` and `X-Signature` (HMAC-SHA256) headers to ensure only authorized banks can push data.

### API Implementation

#### [NEW] [server.js](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/src/server.js)
- Express server setup.
- Integration of `helmet` and `cors`.
- Transaction intake endpoint (`POST /api/v1/transactions`).
- Health check endpoint.

#### [NEW] [transactionController.js](file:///d:/Jawitech_Solutions/BankAPI_Maaxweyne/src/controllers/transactionController.js)
Logic to validate incoming data and save it to the database via Prisma.

## Verification Plan

### Automated Tests
- Script to simulate a bank request with valid/invalid signatures.
- Prisma studio to verify data persistence.

### Manual Verification
- Testing endpoints using `curl` or a REST client.
- Verifying PostgreSQL tables via command line.
