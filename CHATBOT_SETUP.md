# 🤖 TeamRAW AI Chatbot Setup

The chatbot now uses **Google Gemini AI** to provide intelligent responses about robotics news and TeamRAW information.

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key

## ⚙️ Setup Instructions

### Step 1: Add API Key to Environment Variables

Open the `.env.local` file in the root directory and add your API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Step 2: Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## 🎯 Features

The AI chatbot is configured to:

- ✅ Provide **latest robotics news** and technological advancements
- ✅ Answer questions about **TeamRAW** (team, projects, competitions)
- ✅ Explain **robotics concepts** and technologies
- ✅ Guide users to appropriate **website pages**
- ✅ Stay focused on **robotics and automation** topics
- ✅ Encourage interest in **joining TeamRAW**

## 💬 Example Questions You Can Ask

- "What are the latest robotics news?"
- "Tell me about TeamRAW"
- "What robots have you built?"
- "How can I join the team?"
- "What competitions do you participate in?"
- "What's new in autonomous robots?"
- "Tell me about ROBOCON"
- "How do I contact TeamRAW?"

## 🔒 Fallback Mode

If the API key is not configured, the chatbot will operate in **demo mode** with a friendly fallback message directing users to your website pages and contact information.

## 🌐 API Endpoint

The chatbot uses the following API endpoint:
- **Endpoint**: `/api/chat`
- **Method**: POST
- **Request Body**: `{ "message": "user question" }`
- **Response**: `{ "response": "AI generated answer" }`

## 📝 Customization

To customize the AI's behavior, edit the `SYSTEM_PROMPT` in:
```
src/app/api/chat/route.ts
```

You can modify:
- Team information
- Response tone and style
- Topics to focus on
- Response length guidelines

## 🚀 Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add `GEMINI_API_KEY` to your hosting platform's environment variables
2. Ensure the `.env.local` file is in `.gitignore` (already configured)
3. Never commit your API key to version control

## ⚡ Performance

- Average response time: 1-3 seconds
- Concise responses: 2-4 sentences
- Token limit: 300 tokens per response
- Safe content filtering: Enabled

## 🛟 Support

If you encounter issues:
1. Verify your API key is correct
2. Check console for error messages
3. Ensure you have an active internet connection
4. Confirm your Gemini API quota hasn't been exceeded

For more information, visit [Google AI Documentation](https://ai.google.dev/docs)
