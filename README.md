# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) using TypeScript throughout. Manage your sales pipeline with powerful filtering, role-based access, and a clean responsive UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Role-Based Access Control](#role-based-access-control)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## Features

### Core
- **JWT Authentication** — Register, login, protected routes, bcrypt password hashing
- **Lead Management (CRUD)** — Create, view, update, and delete leads
- **Advanced Filtering** — Filter by status, source, search by name/email, sort by date
- **Multi-filter Support** — All filters work together simultaneously
- **Backend Pagination** — 10 records per page with metadata

### Mandatory Additional Features
- **Debounced Search** — 400ms debounce to avoid excessive API calls
- **CSV Export** — Download all leads as a `.csv` file
- **Role-Based Access Control (RBAC)** — Admin and Sales User roles
- **Docker Support** — Fully containerized with Docker Compose

### Bonus
- **Dark Mode** — Toggle between light and dark themes

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + TypeScript | UI framework |
| TailwindCSS | Styling |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| Context API | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| json2csv | CSV export |

---

## Project Structure

```
gigflow/
├── docker-compose.yml
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Register & login logic
│   │   │   └── lead.controller.ts    # Lead CRUD + CSV export
│   │   ├── middleware/
│   │   │   └── auth.ts               # JWT protect + adminOnly middleware
│   │   ├── models/
│   │   │   ├── User.ts               # User schema with password hashing
│   │   │   └── Lead.ts               # Lead schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # /api/auth routes
│   │   │   └── lead.routes.ts        # /api/leads routes
│   │   ├── types/
│   │   │   └── index.ts              # Shared TypeScript interfaces
│   │   └── index.ts                  # Express app entry point
│   ├── .env                          # Environment variables (not committed)
│   ├── .env.example                  # Example env file
│   ├── nodemon.json                  # Nodemon config
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axiosInstance.ts      # Axios with auth interceptor
    │   ├── components/
    │   │   ├── Filters.tsx           # Status, source, search, sort filters
    │   │   ├── LeadForm.tsx          # Add/Edit lead modal
    │   │   └── Pagination.tsx        # Page navigation
    │   ├── context/
    │   │   └── AuthContext.tsx       # Auth state (user, token, login, logout)
    │   ├── pages/
    │   │   ├── Dashboard.tsx         # Main leads table view
    │   │   ├── Login.tsx             # Login page
    │   │   └── Register.tsx          # Register page
    │   ├── types/
    │   │   └── index.ts              # Lead, User, AuthContext interfaces
    │   ├── App.tsx                   # Routes + PrivateRoute guard
    │   └── index.css                 # Tailwind directives
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── Dockerfile
    └── package.json
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Docker setup)
- [Git](https://git-scm.com/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gigflow.git
cd gigflow
```

### 2. Set up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free M0 tier)
3. Click **Connect** → **Drivers** → copy the connection string
4. Replace `<password>` with your database user's password in the string

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values (see [Environment Variables](#environment-variables) below).

---

## Environment Variables

### `backend/.env`

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/gigflow?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

### `frontend/.env` (optional)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> **Never commit `.env` files.** They are already in `.gitignore`.

---

## Running the App

### Backend

```bash
cd backend
npm install
npm run dev
```

Server starts at `http://localhost:5000`

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`

---

## Docker Setup

Make sure **Docker Desktop is running** before executing these commands.

### Build and run all services

```bash
# From the root gigflow/ directory
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:80 |
| Backend | http://localhost:5000 |

### Stop all services

```bash
docker-compose down
```

### Rebuild after code changes

```bash
docker-compose up --build --force-recreate
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Auth Endpoints

#### Register
```
POST /auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "sales"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "664abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales"
  }
}
```

#### Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** Same as register

---

### Lead Endpoints

All lead endpoints require the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Leads (with filters + pagination)
```
GET /leads
```
**Query Parameters:**

| Parameter | Type | Description | Example |
|---|---|---|---|
| `status` | string | Filter by lead status | `Qualified` |
| `source` | string | Filter by lead source | `Instagram` |
| `search` | string | Search name or email | `rahul` |
| `sort` | string | Sort order | `Latest` or `Oldest` |
| `page` | number | Page number | `1` |

**Example Request:**
```
GET /leads?status=Qualified&source=Instagram&search=rahul&sort=Latest&page=1
```

**Response:**
```json
{
  "leads": [
    {
      "_id": "664abc123",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdAt": "2026-05-17T07:00:00.000Z"
    }
  ],
  "total": 42,
  "page": 1,
  "pages": 5
}
```

#### Create Lead
```
POST /leads
```
**Body:**
```json
{
  "name": "Priya Patel",
  "email": "priya@example.com",
  "status": "New",
  "source": "Website"
}
```

#### Update Lead
```
PUT /leads/:id
```
**Body:** Any subset of lead fields
```json
{
  "status": "Contacted"
}
```

#### Delete Lead
```
DELETE /leads/:id
```
> **Admin only.** Sales users will receive a 403 response.

#### Export Leads as CSV
```
GET /leads/export
```
Downloads a `leads.csv` file with all lead data.

---

### Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Role-Based Access Control

| Feature | Admin | Sales User |
|---|---|---|
| View leads | ✅ | ✅ |
| Create lead | ✅ | ✅ |
| Edit lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
| Filter & search | ✅ | ✅ |

To create an admin user, set `"role": "admin"` during registration.

---

