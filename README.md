# Wellness Tracker

A web application to help users balance study and exercise routines with time-based sessions, progress tracking, and browser notifications.

## About the Project

The Wellness Tracker helps users stay productive and healthy by managing timed sessions for both study and exercise. Users can create custom routines, track BMI, earn points, burn calories, and receive alerts when a session or break ends.

This project includes:
- Timer-based routine system
- Responsive UI for desktop and mobile
- Browser notifications
- Auto-resume on refresh
- Session state persistence
- JWT authentication
- Stats updates (points, calories)

## Features

| Feature | Description |
|--------|-------------|
| Timer Routine | Set custom number of sessions and durations |
| Responsive Design | Fully functional on desktop and mobile |
| Exercise Combos | Includes Cardio & Strength workout types |
| Browser Notifications | Alert shown when session or break ends |
| Stats Tracking | Track BMI, Points, and Calories Burned |
| Auto-clear Session | After completion, session resets cleanly |
| Resume On Refresh | Continue where you left off |
| Floating Hamburger Menu | Mobile-friendly navigation popup |

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | MongoDB / Mongoose |
| Auth | JWT + Bearer Token |
| State Management | React Hooks (`useState`, `useEffect`, `useRef`) |
| API Requests | Axios |
| Notifications | Web Notification API |

## Getting Started

### Prerequisites

- Node.js v16.x or higher
- npm package manager
- MongoDB instance (local or cloud)
- Basic knowledge of REST APIs and React

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wellness-tracker.git 
cd wellness-tracker
