# ContractLens

ContractLens is a full‑stack web app that lets you paste an EVM contract address and instantly get:

- Deterministic risk analysis (delegatecall, low-level calls, tx.origin, selfdestruct, reentrancy)
- Upgradeability pattern detection (proxy / non-proxy)
- A plain‑English AI explanation of what the contract does and why it might be risky

It’s built for security‑minded users who want quick signal without reading the entire Solidity codebase.

---

## 🌐 Live demo

[Live Demo](https://your-live-demo-url.example)

---

## 🧱 Architecture overview

At a high level:

- **Frontend (Next.js)**  
  - Landing page (`/`) with marketing + explanation
  - Analyze page (`/analyze`) where the user pastes a contract address
  - Calls the backend REST API to fetch analysis and AI explanations

- **Backend (Express + TypeScript)**  
  - Accepts an address and auto‑detects the **most likely chain**  
  - Fetches verified source + ABI from chain explorers (Etherscan-style APIs)
  - Runs several static checks:
    - ABI parsing (functions, mutability)
    - Access control heuristics (Ownable, onlyOwner)
    - Upgradeability heuristics (proxy detection)
    - Risk analysis heuristics (delegatecall, low-level calls, etc.)
  - Computes a **risk score** and calls Anthropic Claude for explanation text
  - Serves JSON to the frontend

- **Third‑party services**
  - Etherscan‑compatible explorers for multiple chains
  - Anthropic Claude API for explanations

---

## 📊 Architecture diagram (textual)

You can turn this into a proper diagram later:

1. **User**  
   → opens frontend (`Next.js` app)

2. **Frontend** (`/analyze` page)  
   → `GET /api/contract/:address` (analysis)  
   → `POST /api/contract/:address/explain` (AI explanation)

3. **Backend (Express)**  
   1. Detects chain via `detectChainAndFetch(address)`  
   2. Fetches verified contract from the appropriate explorer  
   3. Runs static analysis & scoring  
   4. Optionally calls Claude for explanation  
   5. Responds with JSON: `{ chainId, name, functions, accessControl, upgradeability, riskAnalysis, riskScore, explanation? }`

4. **Explorers / Claude**  
   - Etherscan‑style APIs: source code + ABI  
   - Anthropic Claude: contract explanation

---

## 🛠 Tech stack

**Frontend**

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Radix UI + shadcn‑style components
- Framer Motion for animations

**Backend**

- Node.js + Express 5
- TypeScript
- Axios for HTTP
- Ethers.js for EVM helpers
- Anthropic SDK (`@anthropic-ai/sdk`) for AI explanations
- dotenv for config

---

## ✨ Features

- Paste an EVM contract address → get:
  - Contract functions (name, mutability, I/O types)
  - Access control heuristics (Ownable / onlyOwner)
  - Upgradeability heuristics (proxy detection)
  - Risk analysis (delegatecall, low-level calls, tx.origin, selfdestruct, reentrancy guard)
  - Normalized **risk score** with level (Low / Medium / High)
  - Optional AI explanation in plain English
- Multi‑chain detection (prioritized):
  - Ethereum → Arbitrum → Optimism → Base → Polygon → Sepolia
- Clean separation:
  - Backend analysis API
  - Frontend UI and visualizations

---

## ⚙️ Setup instructions

### Prerequisites

- Node.js (LTS)
- pnpm (recommended; project uses `packageManager: pnpm@...`)

### 1. Clone the repo

git clone https://github.com/your-username/contractlens.git
cd contractlens


## Setup Instructions

1. Clone the repo and move in:

```bash
git clone <your-repo-url>
cd contractLens
```

2. Install dependencies:

```bash
cd backend && pnpm install
cd ..
cd frontend && pnpm install
```

3. Configure environment variables:
- Create `backend/.env` (see [backend README](/Users/priyanshusingh/Downloads/web3-apps-03/contractLens/backend/README.md))
- Create `frontend/.env.local` (see [frontend README](/Users/priyanshusingh/Downloads/web3-apps-03/contractLens/frontend/README.md))

4. Run backend:

```bash
cd backend
pnpm dev
```

5. Run frontend:

```bash
cd frontend
pnpm dev
```

6. Open `http://localhost:3000`.

## Folder Structure

```text
contractLens/
  backend/
    src/
      config.ts           # multi‑chain explorer config
      index.ts            # Express app entry
      routes/
        contract.ts       # /api/contract routes
      services/
        etherscan.ts      # generic explorer fetcher
        detectChainAndFetch.ts # multi‑chain detection
        parser.ts         # ABI parsing
        analyzer.ts       # access control analysis
        detectUpgradeability.ts # proxy pattern heuristics
        riskAnalyzer.ts   # source‑based risk analysis
        riskScoring.ts    # risk score calculation
        claude.ts         # AI explanation (Anthropic)
      types/
        abi.ts            # minimal ABI typing
        contractAnalysis.ts
        riskAnalysis.ts
    package.json
    tsconfig.json
    .env (local only)

  frontend/
    app/
      layout.tsx
      page.tsx            # landing page
      analyze/page.tsx    # analysis UI
    components/
      layout/navbar.tsx
      landing/*           # hero, sections, grid, CTA, etc.
      ui/*                # shared UI components
    public/
    package.json
    tsconfig.json
    .env (local only)
```

## Screenshots

Add screenshots in this section later. Suggested images:
- Landing page
- Analyze page input + result
- Risk score breakdown panel
- AI explanation output

## Roadmap

Planned improvements:
- Add more chains (Linea, Scroll, zkSync, etc.)
- Better proxy / upgradeability heuristics (Transparent vs UUPS vs Beacon)
- Caching layer for explorer responses
- Optional authentication & rate limiting
- Persistent logging of analyses (PostgreSQL)
- More detailed per‑function risk signal visualization
- Light mode / theme switcher polish
- Full test coverage (unit + integration)

