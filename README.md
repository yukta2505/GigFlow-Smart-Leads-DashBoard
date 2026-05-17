# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack using TypeScript throughout. Manage your sales pipeline with powerful filtering, role-based access control, CSV export, and a clean responsive dark UI.

## 🔗 Live Demo

| | URL |
|---|---|
| 🌐 Frontend | https://gig-flow-smart-leads-dash-board-li2.vercel.app/ |
| ⚙️ Backend API | https://gigflow-smart-leads-dashboard-backends.onrender.com/api |
| 📁 GitHub | https://github.com/yukta2505/GigFlow-Smart-Leads-DashBoard |

---

## ✨ Features

### Core Features
- **JWT Authentication** — Register, login, protected routes, bcrypt password hashing
- **Lead Management (CRUD)** — Create, view, update, and delete leads
- **Advanced Filtering** — Filter by status, source, search by name/email, sort by date
- **Multi-filter Support** — All filters work together simultaneously
- **Backend Pagination** — 10 records per page with total/pages metadata

### Mandatory Additional Features
- **Debounced Search** — 400ms debounce to avoid excessive API calls
- **CSV Export** — Download all leads as a `.csv` file instantly
- **Role-Based Access Control** — Admin and Sales User roles with different permissions
- **Docker Support** — Fully containerized with Docker Compose

### Bonus
- **Dark Mode UI** — Professional dark dashboard design throughout

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + TypeScript | UI framework with full type safety |
| TailwindCSS | Utility-first styling |
| React Router DOM | Client-side routing with protected routes |
| Axios | HTTP client with auth interceptor |
| Context API | Global auth state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| TypeScript | End-to-end type safety |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Stateless authentication |
| bcryptjs | Secure password hashing |
| json2csv | CSV export functionality |

---

## 📁 Project Structure

```
gigflow/
├── docker-compose.yml
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Register & login
│   │   │   └── lead.controller.ts    # Lead CRUD + CSV export
│   │   ├── middleware/
│   │   │   └── auth.ts               # JWT protect + adminOnly
│   │   ├── models/
│   │   │   ├── User.ts               # User schema
│   │   │   └── Lead.ts               # Lead schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # /api/auth
│   │   │   └── lead.routes.ts        # /api/leads
│   │   ├── types/
│   │   │   └── index.ts              # Shared TypeScript interfaces
│   │   └── index.ts                  # Express entry point
│   ├── .env.example
│   ├── nodemon.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axiosInstance.ts      # Axios with auth interceptor
    │   ├── components/
    │   │   ├── Filters.tsx           # Filters + debounced search
    │   │   ├── LeadForm.tsx          # Add/Edit lead modal
    │   │   └── Pagination.tsx        # Page navigation
    │   ├── context/
    │   │   └── AuthContext.tsx       # Auth state management
    │   ├── pages/
    │   │   ├── Dashboard.tsx         # Main leads table
    │   │   ├── Login.tsx             # Login page
    │   │   └── Register.tsx          # Register page
    │   ├── types/
    │   │   └── index.ts              # TypeScript interfaces
    │   ├── App.tsx                   # Routes + PrivateRoute
    │   └── index.css                 # Tailwind directives
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── Dockerfile
    └── package.json
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yukta2505/GigFlow-Smart-Leads-DashBoard.git
cd GigFlow-Smart-Leads-DashBoard
```

### 2. Set up environment variables

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/gigflow?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Run backend

```bash
cd backend
npm install
npm run dev
```

Runs at `http://localhost:5000`

### 4. Run frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`

---

## 🐳 Docker Setup

Make sure Docker Desktop is running, then from the root folder:

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:80 |
| Backend | http://localhost:5000 |

```bash
docker-compose down
```

---

## 📡 API Documentation

### Base URL
```
https://gigflow-smart-leads-dashboard-backends.onrender.com/api
```

### Auth Endpoints

#### POST `/auth/register`
**Body:**
```json
{
  "name": "Yukta Baid",
  "email": "yukta@example.com",
  "password": "password123",
  "role": "admin"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "Yukta Baid", "email": "yukta@example.com", "role": "admin" }
}
```

#### POST `/auth/login`
**Body:**
```json
{
  "email": "yukta@example.com",
  "password": "password123"
}
```

---

### Lead Endpoints

All require header: `Authorization: Bearer <token>`

#### GET `/leads` — Get paginated leads with filters

| Parameter | Options | Example |
|---|---|---|
| `status` | New, Contacted, Qualified, Lost | `Qualified` |
| `source` | Website, Instagram, Referral | `Instagram` |
| `search` | any string | `rahul` |
| `sort` | Latest, Oldest | `Latest` |
| `page` | number | `1` |

**Response:**
```json
{
  "leads": [...],
  "total": 42,
  "page": 1,
  "pages": 5
}
```

#### POST `/leads` — Create lead
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Website"
}
```

#### PUT `/leads/:id` — Update lead
#### DELETE `/leads/:id` — Delete lead (Admin only)
#### GET `/leads/export` — Download CSV

---

### Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden (role) |
| 404 | Not Found |
| 500 | Server Error |

---

## 👥 Role-Based Access Control

| Feature | Admin | Sales User |
|---|---|---|
| View leads | ✅ | ✅ |
| Create lead | ✅ | ✅ |
| Edit lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

---

## 🌍 Deployment

### Backend — Render
- Build: `npm install && npm run build`
- Start: `node dist/index.js`
- Env vars set via Render dashboard

### Frontend — Vercel
- Framework: Create React App
- Env: `REACT_APP_API_URL=https://gigflow-smart-leads-dashboard-backends.onrender.com/api`

---

## 👩‍💻 Author

**Yukta Baid**
GitHub: [@yukta2505](https://github.com/yukta2505)

---
