# 🏃‍♂️ Wellness Tracker

<div align="center">

![Wellness Tracker Logo](https://img.shields.io/badge/Wellness_Tracker-v2.0-brightgreen?style=for-the-badge&logo=activity&logoColor=white)

**Balance Your Mind & Body - Smart Study & Exercise Companion** 💪🧠

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

*Transform your productivity with intelligent time management, fitness tracking, and wellness analytics* ✨

[🚀 Quick Start](#-getting-started) • [✨ Features](#-features) • [📱 Screenshots](#-screenshots) • [🛠️ Tech Stack](#-tech-stack) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 About the Project

<div align="center">

### 🎯 **Mission Statement**
*Empowering individuals to achieve the perfect balance between mental focus and physical wellness through intelligent session management and progress tracking.*

</div>

The **Wellness Tracker** is a comprehensive web application designed to revolutionize how you approach productivity and health. By seamlessly integrating study sessions with exercise routines, this platform helps you maintain optimal performance while building sustainable wellness habits.

### 🎪 **What Makes It Special**

<table>
<tr>
<td width="50%">

#### 🧠 **Mental Wellness**
- ⏰ Pomodoro-style study sessions
- 🎯 Focus time optimization
- 📊 Productivity analytics
- 🔔 Smart break reminders

</td>
<td width="50%">

#### 💪 **Physical Wellness**
- 🏋️‍♀️ Customizable workout routines
- ❤️ Cardio & strength training
- 🔥 Calorie burn tracking
- 📈 BMI monitoring

</td>
</tr>
</table>

---

## ✨ Features

<div align="center">

### 🏆 **Core Features**

</div>

| 🎯 Feature | 📋 Description | 🌟 Benefit |
|-----------|----------------|------------|
| ⏱️ **Smart Timer System** | Customizable session durations with auto-progression | Maintain optimal focus intervals |
| 📱 **Responsive Design** | Pixel-perfect UI across all devices | Seamless experience anywhere |
| 🏃‍♀️ **Exercise Library** | Cardio & Strength workout combinations | Comprehensive fitness coverage |
| 🔔 **Browser Notifications** | Real-time alerts for session transitions | Never miss a break or workout |
| 📊 **Progress Analytics** | Track BMI, points, and calories burned | Data-driven wellness insights |
| 🔄 **Auto-Resume** | Continue sessions after browser refresh | Uninterrupted workflow |
| 🍔 **Floating Navigation** | Mobile-optimized hamburger menu | Intuitive mobile experience |
| 💾 **Session Persistence** | Save and restore session state | Reliability and continuity |

### 🎨 **Advanced Features**

<details>
<summary>🔥 <strong>Click to explore advanced capabilities</strong></summary>

#### 🚀 **Performance Features**
- **⚡ Lightning Fast**: Optimized React components with Vite bundling
- **🔄 Real-time Sync**: Instant state updates across all components
- **💾 Smart Caching**: Efficient data persistence and retrieval
- **📱 PWA Ready**: Progressive Web App capabilities

#### 🛡️ **Security Features**
- **🔐 JWT Authentication**: Secure token-based authentication
- **🛡️ Protected Routes**: Role-based access control
- **🔒 Data Encryption**: Secure user data handling
- **🚫 XSS Protection**: Cross-site scripting prevention

#### 🎯 **User Experience**
- **🌙 Dark/Light Mode**: Customizable theme preferences
- **🎵 Sound Notifications**: Audio cues for session changes
- **📊 Visual Progress**: Interactive charts and graphs
- **⌨️ Keyboard Shortcuts**: Power user accessibility

</details>

---

## 🛠️ Tech Stack

<div align="center">

### 🏗️ **Architecture Overview**

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React + Vite] --> B[React Hooks]
        B --> C[Axios HTTP Client]
        C --> D[Web Notifications API]
    end
    
    subgraph "Backend Layer"
        E[Node.js + Express] --> F[JWT Authentication]
        F --> G[RESTful APIs]
        G --> H[Mongoose ODM]
    end
    
    subgraph "Database Layer"
        I[MongoDB Atlas] --> J[User Collections]
        J --> K[Session Data]
        K --> L[Progress Analytics]
    end
    
    A --> E
    H --> I
    
    style A fill:#61DAFB,color:#000
    style E fill:#339933,color:#fff
    style I fill:#47A248,color:#fff
```

</div>

### 🎨 **Frontend Technologies**

| Technology | Version | Purpose | Benefits |
|------------|---------|---------|----------|
| ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react) | `18.2.x` | UI Framework | Component-based architecture |
| ![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite) | `4.x` | Build Tool | Lightning-fast development |
| ![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios) | `1.x` | HTTP Client | Promise-based requests |
| ![React Hooks](https://img.shields.io/badge/Hooks-Built--in-61DAFB?logo=react) | Built-in | State Management | Modern React patterns |

### ⚙️ **Backend Technologies**

| Technology | Version | Purpose | Benefits |
|------------|---------|---------|----------|
| ![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?logo=node.js) | `16.x+` | Runtime Environment | JavaScript everywhere |
| ![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express) | `4.x` | Web Framework | Minimal and flexible |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb) | `6.x` | Database | Document-based storage |
| ![JWT](https://img.shields.io/badge/JWT-9.x-000000?logo=jsonwebtokens) | `9.x` | Authentication | Stateless security |

---

## 🚀 Getting Started

### 📋 Prerequisites

<div align="center">

| Requirement | Version | Download Link |
|-------------|---------|---------------|
| ![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?logo=node.js) | `16.x+` | [Download Node.js](https://nodejs.org) |
| ![npm](https://img.shields.io/badge/npm-8.x+-CB3837?logo=npm) | `8.x+` | Included with Node.js |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.x+-47A248?logo=mongodb) | `6.x+` | [MongoDB Atlas](https://mongodb.com/atlas) |
| ![Git](https://img.shields.io/badge/Git-Latest-F05032?logo=git) | Latest | [Download Git](https://git-scm.com) |

</div>

### 🎯 **Quick Installation**

```bash
# 📥 Clone the repository
git clone https://github.com/khaliduzzamantanoy/wellness-tracker.git

# 📂 Navigate to project directory
cd wellness-tracker

# 📦 Install dependencies for both frontend and backend
npm run install-all

# ⚙️ Set up environment variables
cp .env.example .env

# 🚀 Start the development servers
npm run dev
```

### 🔧 **Detailed Setup**

<details>
<summary>📝 <strong>Step-by-step installation guide</strong></summary>

#### 1️⃣ **Clone and Setup**

```bash
# Clone the repository
git clone https://github.com/khaliduzzamantanoy/wellness-tracker.git
cd wellness-tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2️⃣ **Environment Configuration**

Create `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://your-connection-string
DB_NAME=wellness_tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### 3️⃣ **Database Setup**

```bash
# Start MongoDB (if running locally)
mongod

# Or use MongoDB Atlas (recommended)
# 1. Create account at https://mongodb.com/atlas
# 2. Create cluster
# 3. Get connection string
# 4. Add to MONGODB_URI in .env
```

#### 4️⃣ **Start Development Servers**

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend server
cd frontend
npm run dev
```

</details>

### 🌐 **Access the Application**

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | `http://localhost:3000` | React development server |
| ⚙️ **Backend API** | `http://localhost:5000` | Express server |
| 📊 **API Docs** | `http://localhost:5000/api-docs` | Swagger documentation |

---

## 📱 Screenshots

<div align="center">

### 🖥️ **Desktop Experience**

<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/400x300/61DAFB/FFFFFF?text=Dashboard" alt="Dashboard" width="400"/>
<br><strong>📊 Dashboard Overview</strong>
</td>
<td align="center">
<img src="https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Timer+Session" alt="Timer" width="400"/>
<br><strong>⏱️ Active Timer Session</strong>
</td>
</tr>
<tr>
<td align="center">
<img src="https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Exercise+Routine" alt="Exercise" width="400"/>
<br><strong>🏋️‍♀️ Exercise Routines</strong>
</td>
<td align="center">
<img src="https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Progress+Analytics" alt="Analytics" width="400"/>
<br><strong>📈 Progress Analytics</strong>
</td>
</tr>
</table>

### 📱 **Mobile Experience**

<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/200x400/FF6B6B/FFFFFF?text=Mobile+Timer" alt="Mobile Timer" width="200"/>
<br><strong>📱 Mobile Timer</strong>
</td>
<td align="center">
<img src="https://via.placeholder.com/200x400/4ECDC4/FFFFFF?text=Mobile+Menu" alt="Mobile Menu" width="200"/>
<br><strong>🍔 Hamburger Menu</strong>
</td>
<td align="center">
<img src="https://via.placeholder.com/200x400/45B7D1/FFFFFF?text=Mobile+Stats" alt="Mobile Stats" width="200"/>
<br><strong>📊 Mobile Stats</strong>
</td>
</tr>
</table>

</div>

---

## 🎯 Usage Guide

### 🚀 **Getting Started Journey**

<div align="center">

```mermaid
flowchart TD
    A[🔐 Create Account] --> B[📝 Set Profile]
    B --> C[🎯 Choose Routine]
    C --> D[⏱️ Start Session]
    D --> E{📊 Session Type?}
    E -->|📚 Study| F[🧠 Focus Time]
    E -->|🏃‍♀️ Exercise| G[💪 Workout Time]
    F --> H[⏸️ Break Time]
    G --> H
    H --> I{🔄 Continue?}
    I -->|✅ Yes| D
    I -->|❌ No| J[📈 View Progress]
    
    style A fill:#FF6B6B,color:#fff
    style J fill:#4ECDC4,color:#fff
```

</div>

### 📚 **Feature Deep Dive**

<details>
<summary>⏱️ <strong>Timer Management</strong></summary>

#### Setting Up Your Perfect Routine

1. **📝 Create Session**: Define study/exercise duration
2. **🎯 Set Goals**: Choose session count and break intervals  
3. **⏰ Start Timer**: Begin your focused work session
4. **🔔 Get Notified**: Receive alerts for transitions
5. **📊 Track Progress**: Monitor completion and stats

#### Timer Controls
- ▶️ **Play/Pause**: Control session flow
- ⏹️ **Stop**: End session early
- ⏭️ **Skip**: Move to next phase
- 🔄 **Reset**: Start over

</details>

<details>
<summary>🏋️‍♀️ <strong>Exercise System</strong></summary>

#### Available Workout Types

**💓 Cardio Exercises**
- 🏃‍♀️ Running in place
- 🕺 Jumping jacks  
- 🦵 High knees
- 👐 Burpees

**💪 Strength Training**
- 🤲 Push-ups
- 🧘‍♀️ Planks
- 🦵 Squats
- 🏋️‍♀️ Lunges

#### Exercise Features
- 🔥 Calorie calculation
- ⏱️ Duration tracking
- 📈 Progress monitoring
- 🎯 Custom combinations

</details>

---

## 🔧 API Reference

### 🛡️ **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Create new user account | ❌ |
| `POST` | `/api/auth/login` | User authentication | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |

### 📊 **Session Management**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/sessions/create` | Start new session | ✅ |
| `PUT` | `/api/sessions/:id/update` | Update session progress | ✅ |
| `GET` | `/api/sessions/history` | Get session history | ✅ |
| `DELETE` | `/api/sessions/:id` | Delete session | ✅ |

### 📈 **Analytics & Stats**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/stats/dashboard` | Get user statistics | ✅ |
| `PUT` | `/api/stats/bmi` | Update BMI data | ✅ |
| `GET` | `/api/stats/progress` | Get progress analytics | ✅ |

---

## 🚀 Deployment

### 🌐 **Production Deployment**

<details>
<summary>☁️ <strong>Deploy to Heroku</strong></summary>

#### Prerequisites
- Heroku CLI installed
- Git repository
- MongoDB Atlas account

#### Steps

```bash
# 1. Login to Heroku
heroku login

# 2. Create Heroku app
heroku create wellness-tracker-app

# 3. Set environment variables
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production

# 4. Deploy application
git push heroku main

# 5. Open application
heroku open
```

</details>

<details>
<summary>🐳 <strong>Docker Deployment</strong></summary>

#### Docker Configuration

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build frontend
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/wellness
      - JWT_SECRET=your-secret
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

</details>

### 🔧 **Environment Variables**

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | - |
| `JWT_SECRET` | JWT signing secret | ✅ | - |
| `PORT` | Server port | ❌ | `5000` |
| `NODE_ENV` | Environment mode | ❌ | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ | `http://localhost:3000` |

---

## 🧪 Testing

### 🔬 **Test Coverage**

<div align="center">

![Test Coverage](https://img.shields.io/badge/Coverage-85%25-brightgreen?style=for-the-badge)

</div>

```bash
# 🧪 Run all tests
npm test

# 📊 Generate coverage report
npm run test:coverage

# 🔍 Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

### 🎯 **Testing Strategy**

| Test Type | Framework | Coverage |
|-----------|-----------|----------|
| 🧪 **Unit Tests** | Jest + React Testing Library | Components, Hooks, Utils |
| 🔗 **Integration Tests** | Supertest + Jest | API Endpoints |
| 🎭 **E2E Tests** | Cypress | User Workflows |
| 📊 **Performance Tests** | Lighthouse CI | Core Web Vitals |

---

## 🤝 Contributing

<div align="center">

**Join our amazing community of contributors!** 🌟

[![Contributors](https://img.shields.io/github/contributors/khaliduzzamantanoy/wellness-tracker?style=for-the-badge)](https://github.com/khaliduzzamantanoy/wellness-tracker/graphs/contributors)
[![Pull Requests](https://img.shields.io/github/issues-pr/khaliduzzamantanoy/wellness-tracker?style=for-the-badge)](https://github.com/khaliduzzamantanoy/wellness-tracker/pulls)
[![Issues](https://img.shields.io/github/issues/khaliduzzamantanoy/wellness-tracker?style=for-the-badge)](https://github.com/khaliduzzamantanoy/wellness-tracker/issues)

</div>

### 🔄 **How to Contribute**

```bash
# 1. 🍴 Fork the repository
# 2. 📥 Clone your fork
git clone https://github.com/YOUR_USERNAME/wellness-tracker.git

# 3. 🌿 Create feature branch
git checkout -b feature/amazing-feature

# 4. ✨ Make your changes
# 5. 🧪 Run tests
npm test

# 6. 💾 Commit changes
git commit -m '✨ Add amazing feature'

# 7. 🚀 Push to branch  
git push origin feature/amazing-feature

# 8. 🎉 Create Pull Request
```

### 📋 **Contribution Guidelines**

<details>
<summary>📝 <strong>Development Standards</strong></summary>

#### Code Style
- 🎨 Use Prettier for formatting
- 📏 Follow ESLint rules
- 📝 Write meaningful commit messages
- 🧪 Add tests for new features

#### Pull Request Process
1. 📖 Update documentation
2. 🧪 Ensure tests pass
3. 🔍 Get code review approval
4. 🎯 Squash commits before merge

#### Issue Templates
- 🐛 Bug reports
- ✨ Feature requests  
- 📚 Documentation improvements
- ❓ Questions and support

</details>

### 🏆 **Recognition**

<div align="center">

**Hall of Fame** 🌟

Thanks to all our amazing contributors who make this project possible!

<a href="https://github.com/khaliduzzamantanoy/wellness-tracker/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=khaliduzzamantanoy/wellness-tracker" />
</a>

</div>

---

## 📊 Project Statistics

<div align="center">

![GitHub Stats](https://github-readme-stats.vercel.app/api/pin/?username=khaliduzzamantanoy&repo=wellness-tracker&theme=vue-dark&show_icons=true)

### 📈 **Development Activity**

![Commit Activity](https://img.shields.io/github/commit-activity/m/khaliduzzamantanoy/wellness-tracker?style=for-the-badge&color=brightgreen)
![Last Commit](https://img.shields.io/github/last-commit/khaliduzzamantanoy/wellness-tracker?style=for-the-badge&color=blue)
![Code Size](https://img.shields.io/github/languages/code-size/khaliduzzamantanoy/wellness-tracker?style=for-the-badge&color=orange)

</div>

---

## 🚀 Roadmap

### 📅 **Upcoming Features**

| 🎯 Feature | 📅 Timeline | 🏷️ Priority | 📋 Status |
|-----------|-------------|-------------|-----------|
| 🌙 Dark Mode Theme | Q2 2024 | High | 🔄 In Progress |
| 📱 Mobile App (React Native) | Q3 2024 | High | 📋 Planned |
| 🤝 Social Features & Groups | Q3 2024 | Medium | 📋 Planned |
| 🧠 AI-Powered Recommendations | Q4 2024 | Medium | 💡 Research |
| 🎵 Spotify Integration | Q4 2024 | Low | 💡 Research |
| 🏆 Achievement System | Q1 2025 | Medium | 📋 Planned |

### 🎯 **Long-term Vision**
- 🌍 Multi-language support
- 📊 Advanced analytics dashboard
- 🤖 Machine learning insights
- 🎮 Gamification elements
- 👥 Team collaboration features

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** 📜

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Feel free to use, modify, and distribute this project* ✨

[📖 Read the full license](LICENSE)

</div>

---

## 💬 Support & Community

<div align="center">

### 🆘 **Get Help**

| 📞 Support Channel | 🔗 Link | 📝 Description |
|------------------|---------|----------------|
| 🐛 **Bug Reports** | [Issues](https://github.com/khaliduzzamantanoy/wellness-tracker/issues) | Report bugs and technical issues |
| 💡 **Feature Requests** | [Discussions](https://github.com/khaliduzzamantanoy/wellness-tracker/discussions) | Suggest new features |
| 📚 **Documentation** | [Wiki](https://github.com/khaliduzzamantanoy/wellness-tracker/wiki) | Comprehensive guides |
| 💬 **Community Chat** | [Discord](https://discord.gg/wellness-tracker) | Real-time community support |

### 🌟 **Show Your Support**

**If this project helped you, please consider giving it a ⭐!**

[![GitHub stars](https://img.shields.io/github/stars/khaliduzzamantanoy/wellness-tracker?style=social)](https://github.com/khaliduzzamantanoy/wellness-tracker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/khaliduzzamantanoy/wellness-tracker?style=social)](https://github.com/khaliduzzamantanoy/wellness-tracker/network)
[![GitHub watchers](https://img.shields.io/github/watchers/khaliduzzamantanoy/wellness-tracker?style=social)](https://github.com/khaliduzzamantanoy/wellness-tracker/watchers)

</div>

---

<div align="center">

**Made with ❤️ by [Khaliduzzaman Tanoy](https://github.com/khaliduzzamantanoy)**

*Wellness Tracker - Where productivity meets wellness* 🚀


**⚡ Fuel your productivity, energize your wellness journey!** 

</div>
