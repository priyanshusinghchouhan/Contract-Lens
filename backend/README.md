# Backend (ContractLens API)

Express + TypeScript API that fetches verified contract metadata, runs deterministic analysis, and optionally generates an AI explanation.

## API Endpoints

Base URL (local): `http://localhost:5173`

1. `GET /api/contract/:address`
- Validates Ethereum address.
- Auto-detects supported chain.
- Fetches verified source/ABI from explorer API.
- Returns analysis payload with:
  - contract name + chain ID
  - parsed functions
  - access control checks
  - upgradeability checks
  - risk analysis signals
  - risk score (`score`, `level`, `breakdown`)

2. `POST /api/contract/:address/explain`
- Runs the same deterministic analysis.
- Calls Claude to return a plain-English explanation.
- Returns:
  - `explanation: string`

## Environment Variables

Create `backend/.env`:

```env
PORT=5173
ETHERSCAN_API_KEY=your_key
ARBISCAN_API_KEY=your_key
OPTIMISMSCAN_API_KEY=your_key
BASESCAN_API_KEY=your_key
POLYGONSCAN_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```

## How To Run Locally

```bash
cd backend
pnpm install
pnpm dev
```

Build + start production mode:

```bash
pnpm build
pnpm start
```

## Supported Chains

- Ethereum Mainnet (`1`)
- Sepolia (`11155111`)
- Arbitrum One (`42161`)
- Optimism (`10`)
- Base (`8453`)
- Polygon (`137`)

## Deployment Notes (Railway)

Set service root directory to `backend`.

Suggested Railway commands:
- Build command: `pnpm install && pnpm build`
- Start command: `pnpm start`

Set all required env vars in Railway:
- `PORT` (Railway may inject this automatically)
- Explorer API keys
- `ANTHROPIC_API_KEY`

