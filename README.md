
# 🎨 Real-Time Collaborative Whiteboard

A scalable, real-time collaborative whiteboard platform that allows multiple users to draw, edit, and interact simultaneously with sub-second latency.

---

## 🚀 Features

- 🧑‍🤝‍🧑 Multi-user real-time collaboration
- ⚡ Sub-second latency using WebSockets
- 🔐 Secure authentication using JWT
- 🧠 Efficient session and state management
- 📡 Real-time bidirectional communication (Socket.IO)
- 🗂️ Persistent storage with MongoDB
- 📈 Optimized performance with indexing & query tuning

---

## 🏗️ Tech Stack

**Frontend:**
- React.js
- HTML5 Canvas API
- CSS / Tailwind (if used)

**Backend:**
- Node.js
- Express.js
- Socket.IO

**Database:**
- MongoDB

**Authentication:**
- JWT (JSON Web Tokens)

---

## ⚙️ System Design Highlights

- Designed scalable architecture supporting concurrent users
- Implemented RESTful APIs for session and user management
- Used WebSockets for real-time synchronization across clients
- Optimized database queries improving performance by ~30%
- Modular backend design for maintainability and extensibility

---

## 🔐 Authentication

- Secure login/signup using JWT
- Token-based session management
- Protected API routes

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/whiteboard-app.git

# Navigate to project folder
cd whiteboard-app

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
▶️ Running the Application
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
🌐 Usage
Open the app in multiple tabs/devices
Join the same session/room
Start drawing collaboratively in real-time
📊 Performance Optimization
Indexed MongoDB collections
Reduced API response time by ~30%
Efficient state sync using Socket.IO events
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

📄 License

This project is open-source and available under the MIT License.

👨‍💻 Author

Sayan Mandal

IIT Kharagpur
Full Stack Developer | DSA Enthusiast

---






