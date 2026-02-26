# ⚡️ ContractLens 

<div align="center">

**A Deteministic Analysis of Smart Contracts**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?logo=ethereum&logoColor=white)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Live ](https://contractlens.priyanshuchouhan.xyz/) • [✏️  Demo](https://x.com/priyansu_twt/status/2026536106049810550)

</div>

# ✨ Overview

ContractLens is a full‑stack web app that lets you paste an EVM contract address and instantly get:

- Deterministic risk analysis (delegatecall, low-level calls, tx.origin, selfdestruct, reentrancy)
- Upgradeability pattern detection (proxy / non-proxy)
- A plain‑English AI explanation of what the contract does and why it might be risky

It’s built for security‑minded users who want quick signal without reading the entire Solidity codebase.

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

## Setup Instructions

1. Clone the repo and move in:

```bash
git clone https://github.com/priyanshusinghchouhan/Contract-Lens
cd contractLens
```

2. Install dependencies:

```bash
cd backend && pnpm install
cd ..
cd frontend && pnpm install
```

3. Configure environment variables:
- Create `backend/.env` 
- Create `frontend/.env.local`

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

  <img width="1460" height="748" alt="image" src="https://github.com/user-attachments/assets/c56159bb-c6e6-49e5-93ee-80d4d406705d" />

  <img width="1410" height="777" alt="image" src="https://github.com/user-attachments/assets/215eb345-9aaf-40d0-8310-b8e6dafd5d8e" />

- Analyze page input + result + Risk score breakdown panel

<img width="1446" height="783" alt="image" src="https://github.com/user-attachments/assets/1e3b2915-853e-4201-92f5-5766a1e17bf3" />

<img width="1394" height="786" alt="image" src="https://github.com/user-attachments/assets/74bd0769-144c-43bb-a102-3df09e4323bb" />

- AI explanation output

  <img width="1397" height="769" alt="image" src="https://github.com/user-attachments/assets/5d5e85c4-3bd7-4f3f-8c86-2f58c1a83bcc" />

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

