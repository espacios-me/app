# Espacios Growth & Automation Platform

A done-for-you growth and automation agency platform powered by AI. This app helps businesses map their growth transformation with strategic planning and automated roadmap generation.

## 🚀 Features

- **AI Growth Architect**: Strategic business planning powered by Google Gemini AI
- **Interactive Roadmaps**: Step-by-step growth plans with audio briefings
- **Multiple Focus Areas**: Lead generation, WhatsApp sales, AI automation, email nurturing, CRM infrastructure, and custom workflows
- **Audio Briefings**: Professional voice narration for each strategic phase

## 📋 Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API key

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your API key**

   Create or edit `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   Get your API key from: https://aistudio.google.com/app/apikey

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
app/
├── src/
│   ├── components/       # React components
│   │   ├── StrategyPlanner.tsx
│   │   ├── RoadmapViewer.tsx
│   │   └── ...
│   ├── services/         # API services
│   │   ├── geminiService.ts
│   │   └── audioUtils.ts
│   ├── App.tsx           # Main app component
│   ├── types.ts          # TypeScript type definitions
│   └── index.tsx         # App entry point
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security

⚠️ **Important**: Never commit your API keys to the repository. The `.env.local` file is gitignored to prevent accidental commits of sensitive data.

## 📦 Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI-powered content generation
- **Lucide React** - Icons

## 📝 License

Apache-2.0

## 🙋 Support

For questions or support, contact: strategy@espacios.agency
