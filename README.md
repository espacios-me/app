# Espacios Growth & Automation Platform

A done-for-you growth and automation agency platform powered by AI. This app helps businesses map their growth transformation with strategic planning and automated roadmap generation.

## 🚀 Features

- **AI Growth Architect**: Strategic business planning powered by Google Gemini AI
- **Interactive Roadmaps**: Step-by-step growth plans with audio briefings
- **Multiple Focus Areas**: Lead generation, WhatsApp sales, AI automation, email nurturing, CRM infrastructure, and custom workflows
- **Audio Briefings**: Professional voice narration for each strategic phase
- **Secure Architecture**: Backend API proxy protects your API keys
- **Error Handling**: Graceful error boundaries and user feedback

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API key

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure your API key**

   Create a `.env.local` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   VITE_API_URL=http://localhost:3001
   PORT=3001
   ```

   Get your API key from: https://aistudio.google.com/app/apikey

5. **Run the development servers**

   You need to run both the backend and frontend servers:

   **Terminal 1 - Backend API Proxy:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

   The backend API will run on `http://localhost:3001`

## 🏗️ Project Structure

```
app/
├── src/
│   ├── components/       # React components
│   │   ├── StrategyPlanner.tsx
│   │   ├── RoadmapViewer.tsx
│   │   └── ErrorBoundary.tsx
│   ├── services/         # API services & utilities
│   │   ├── geminiService.ts  # Backend API client
│   │   ├── audioUtils.ts     # Audio processing utilities
│   │   └── audioContext.ts   # AudioContext singleton manager
│   ├── App.tsx           # Main app component
│   ├── types.ts          # TypeScript type definitions
│   ├── index.tsx         # App entry point
│   └── index.css         # Global styles & Tailwind directives
├── server/               # Backend API proxy
│   ├── index.js          # Express server
│   └── package.json      # Server dependencies
├── .env.local            # Environment variables (create this)
├── .env.example          # Example environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Available Scripts

**Frontend:**
- `npm run dev` - Start frontend development server (port 3000)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

**Backend (run from /server directory):**
- `npm run dev` - Start backend API proxy server with auto-reload (port 3001)
- `npm start` - Start backend API proxy server (production)

## 🔒 Security

✅ **Secure Architecture**: This application uses a backend proxy server to protect your API keys. The Gemini API key is never exposed to the browser.

**Security Features:**
- API keys stored server-side only (never in client bundle)
- Backend proxy handles all Gemini API calls
- Environment variables properly gitignored
- Error boundary for graceful error handling
- Proper CORS configuration

⚠️ **Important**: Never commit your API keys to the repository. The `.env.local` file is gitignored to prevent accidental commits of sensitive data.

## 📦 Technologies

**Frontend:**
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling (properly configured)
- **Lucide React** - Icon library

**Backend:**
- **Express** - Web server framework
- **Google Gemini AI** - AI-powered content generation & TTS
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management

**Features:**
- Error boundary for crash prevention
- Singleton AudioContext for efficient audio management
- Backend API proxy for security
- Type-safe API integration

## 🚀 Production Deployment

### Backend Server

Deploy the `/server` directory to your preferred Node.js hosting platform (Heroku, Railway, Render, etc.):

1. Set environment variable `GEMINI_API_KEY` in your hosting platform
2. Deploy the server directory
3. Note the production URL (e.g., `https://your-api.herokuapp.com`)

### Frontend

1. Update `.env.production` with your production API URL:
   ```env
   VITE_API_URL=https://your-api.herokuapp.com
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your static hosting (Vercel, Netlify, Cloudflare Pages, etc.)

## 📝 License

Apache-2.0

## 🙋 Support

For questions or support, contact: strategy@espacios.agency
