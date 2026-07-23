# 🚀 CP Tracker

A modern full-stack MERN application to **track, analyze, and compare Codeforces profiles** with interactive analytics, JWT authentication, and a clean responsive interface.

---

## 🌐 Live Demo

### 🔗 Frontend
**https://cp-tracker-blush.vercel.app**

### 🔗 Backend API
**https://cp-tracker-2bfz.onrender.com/api**

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

### 👤 Handle Management
- Add Codeforces Handles
- Edit Existing Handles
- Delete Handles
- Store Multiple Handles

### 📊 Analytics Dashboard
- User Information
- Current Rating
- Maximum Rating
- Rating History Graph
- Submission Statistics
- Accepted Submissions
- Unique Problems Solved
- Rating Distribution
- Tag Distribution

### ⚖️ Compare Profiles
- Compare Multiple Codeforces Users
- Side-by-side Statistics
- Rating Comparison
- Submission Comparison
- Problem Solving Insights

### 🎨 User Interface
- Modern Responsive Design
- Interactive Charts
- Toast Notifications
- Smooth User Experience

### 🚀 Deployment
- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**

---

# 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

### Deployment
- Vercel
- Render
- MongoDB Atlas

---

# 📷 Screenshots

## Login

<img width="1918" height="900" alt="image" src="https://github.com/user-attachments/assets/cf709479-c360-41b9-953f-c2a37ceb3f0d" />


---

## Dashboard

> *(Add Dashboard Screenshot Here)*

---

## Compare Page

> *(Add Compare Screenshot Here)*

---

## Analytics

> *(Add Analytics Screenshot Here)*

---

# 📂 Project Structure

```text
cp-tracker
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Dishu0209/cp-tracker.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

### Backend (.env)

```env
PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 📌 API Endpoints

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

## Codeforces

```http
GET /api/codeforces/users/:handle
GET /api/codeforces/users/:handle/rating
GET /api/codeforces/users/:handle/submission
GET /api/codeforces/users/:handle/analytics
```

## Handle Management

```http
GET
POST
PATCH
DELETE
```

---

# 🚀 Future Improvements

- AI-based Performance Insights
- Contest Calendar
- Goal Tracker
- Friend Leaderboard
- Personalized Problem Recommendations
- Email Notifications

---

# 👨‍💻 Author

**Dishu Sharma**

- GitHub: https://github.com/Dishu0209

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
