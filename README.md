# 🚌 BusGO - Fullstack Bus Management System

## 🖼️ Preview

![BusGO Home](./public/screenshot/image.png)

BusGO is a fullstack web application built using **React + Node.js + Prisma**.
It allows users to manage buses, routes, and bookings efficiently.

---

## 📦 Tech Stack

* Frontend: React + Vite + Tailwind CSS
* Backend: Node.js + Express
* Database: PostgreSQL
* ORM: Prisma

---

## 📁 Project Structure

```
BUSGO/
├── backend/
├── src/
├── public/
└── package.json
```

---

## ⚙️ Prerequisites

* Node.js (v18+)
* npm / yarn
* PostgreSQL

---

## 🔧 Installation Steps

### 1️⃣ Clone the repository

```bash
git clone https://github.com/dsingh-dev/busgo.git
cd busgo
```

---

### 2️⃣ Install Frontend

```bash
npm install
```

---

### 3️⃣ Setup Backend

```bash
cd backend
npm install
```

---

### 4️⃣ Setup Environment Variables

Create `.env` inside `backend/`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/busgo"
PORT=5000
```

---

### 5️⃣ Setup Database (Prisma)

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 6️⃣ 🌱 Seed Database (IMPORTANT)

```bash
npx prisma db seed
```

---

### 7️⃣ Run Backend

```bash
npm run dev
```

👉 http://localhost:5000

---

### 8️⃣ Run Frontend

Open new terminal (root folder):

```bash
npm run dev
```

👉 http://localhost:8080

---

## 🧪 Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm run build
```

---

## 🔐 Environment Variables

| Variable     | Description           |
| ------------ | --------------------- |
| DATABASE_URL | PostgreSQL connection |
| PORT         | Backend port          |

---

## 📌 Features

* Bus management
* Route handling
* Booking system
* Admin dashboard

---

## 👨‍💻 Author

**Dharmendra Singh**
Full Stack Developer

---

## ⭐ Support

Give it a ⭐ if you like it!
