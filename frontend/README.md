# Frontend (ContractLens Web App)

Next.js frontend for contract analysis, risk visualization, and AI explanation display.

## How To Run Locally

```bash
cd frontend
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Required Env Vars

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5173
```

This should point to your deployed backend URL in production.

## Deployment Notes (Vercel)

Set project root directory to `frontend`.

Recommended:
- Framework preset: `Next.js`
- Build command: `pnpm build`
- Output: default Next.js output

Required Vercel environment variable:
- `NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.railway.app`

After deploy, verify:
- Landing page loads
- `/analyze` can call backend endpoints
- CORS is allowed from your Vercel domain

