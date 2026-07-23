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

<img width="1905" height="890" alt="image" src="https://github.com/user-attachments/assets/95d7815d-999c-4adb-bdd1-3442a81eb25f" />
<img width="1892" height="906" alt="image" src="https://github.com/user-attachments/assets/44ec5734-fcf2-42a0-a2d7-94d02e9f4945" />
<img width="1913" height="903" alt="image" src="https://github.com/user-attachments/assets/7d38e587-91f6-45f0-abd2-39f574655df0" />
<img width="1917" height="902" alt="image" src="https://github.com/user-attachments/assets/c70a542f-7c32-47a8-a8cd-a93247ea911c" />
<img width="1912" height="905" alt="image" src="https://github.com/user-attachments/assets/295be4c0-3e6d-4ad6-9ccc-b0ca89b1719e" />
<img width="1912" height="916" alt="image" src="https://github.com/user-attachments/assets/31cddc8c-ca10-4f97-913f-cfd20b67e657" />



---

## Compare Page
<img width="1893" height="895" alt="image" src="https://github.com/user-attachments/assets/70350e54-10af-46f5-9472-372cfaa1a2fc" />


---

## Analytics

<img width="1917" height="896" alt="image" src="https://github.com/user-attachments/assets/8290ce02-0dad-439e-acb9-b6a10d1027b4" />
<img width="1917" height="915" alt="image" src="https://github.com/user-attachments/assets/16cd30af-5fe1-4603-913c-be24c299fdb6" />
<img width="1918" height="901" alt="image" src="https://github.com/user-attachments/assets/62041e3b-2593-4e3f-8551-73bd92cbb171" />
<img width="1918" height="860" alt="image" src="https://github.com/user-attachments/assets/6e567df1-9b40-4034-b58d-46dab7092bd7" />
<img width="1762" height="813" alt="image" src="https://github.com/user-attachments/assets/0c204885-c650-4b4b-b276-0a07b84bd339" />
<img width="1866" height="890" alt="image" src="https://github.com/user-attachments/assets/df516633-fff1-400b-aa69-f83583cf8cb5" />
<img width="1891" height="888" alt="image" src="https://github.com/user-attachments/assets/9bbc6af9-ae4f-4489-a114-54be0549b0bb" />


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
