# 🍽️ Bite Bliss - Premium Food Blog & Recipe Platform

<div align="center">

![Bite Bliss Banner](.github/screenshots/banner.png)


![Bite Bliss](https://img.shields.io/badge/Bite%20Bliss-Premium%20Food%20Blog-10B981?style=for-the-badge&logo=react)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5.33.0-2F2E8B?style=for-the-badge&logo=strapi)](https://strapi.io/)
[![TypeScript](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**A modern, premium food blog platform with stunning scrollytelling experiences and subscription-based premium content.**

[🌐 Live Demo](#) | [📖 Documentation](#features) | [🚀 Quick Start](#installation)

</div>

---

## ✨ Features

### 🎨 **Premium UI/UX**
- **Stunning Scrollytelling Hero** - Immersive canvas-based recipe animations
- **Dark Mode** - Fully responsive light/dark theme with smooth transitions
- **Framer Motion Animations** - Buttery smooth page transitions and micro-interactions
- **Premium Design System** - TailwindCSS 4 with custom design tokens

### 🔐 **Authentication & Authorization**
- Email/Password authentication with JWT
- Google OAuth integration
- Protected routes and role-based access
- Session persistence with automatic refresh

### 💳 **Subscription System**
- Stripe payment integration
- Multiple subscription tiers (Free, Premium, VIP)
- Subscription management dashboard
- Automatic billing portal

### 📚 **Content Management**
- Browse and search recipes
- Category filtering
- Premium recipe access control
- Rich text editor for recipe creation
- AI-powered recipe generation (Google Gemini)

### 👤 **User Account Management**
- Profile customization with avatar upload
- Password change functionality
- Email notifications preferences
- Dark mode toggle
- Account deletion option

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **Vite 7** - Lightning-fast build tool
- **TailwindCSS 4** - Modern utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Router 7** - Client-side routing
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **React Hook Form** - Performant form validation
- **Axios** - HTTP client

### **Backend**
- **Strapi 5** - Headless CMS
- **Node.js** - JavaScript runtime
- **SQLite** - Development database (PostgreSQL for production)
- **Stripe** - Payment processing
- **Cloudinary** - Media storage
- **Google Gemini API** - AI recipe generation
- **Nodemailer** - Email service

---

## 📸 Screenshots

<div align="center">

### 🏠 Home Page - Scrollytelling Hero
![Scrollytelling Hero](.github/screenshots/home-hero.png)
*Immersive canvas-based animation that tells the story of cooking*

---

### 📚 Recipe Browsing
![Recipe Browsing](.github/screenshots/recipes-page.png)
*Beautiful card-based layout with filtering and search capabilities*

---

### 👤 Account Dashboard
![Account Dashboard](.github/screenshots/account-page.png)
*Modern profile management with subscription details and settings*

---

### 🌙 Dark Mode
<table>
<tr>
<td width="50%">

![Light Mode](.github/screenshots/light-mode.png)
*Light Mode*

</td>
<td width="50%">

![Dark Mode](.github/screenshots/dark-mode.png)
*Dark Mode*

</td>
</tr>
</table>

*Seamless theme switching across all pages*

---

### 📱 Mobile & Responsive Views
<table>
<tr>
<td width="33%">

![Mobile Home](.github/screenshots/mobile-home.png)
*Mobile Home*

</td>
<td width="33%">

![Mobile Recipes](.github/screenshots/mobile-recipes.png)
*Mobile Recipes*

</td>
<td width="33%">

![Mobile Account](.github/screenshots/mobile-account.png)
*Mobile Account*

</td>
</tr>
</table>

*Fully responsive design optimized for all screen sizes*

</div>

---

## 🚀 Installation

### **Prerequisites**
- Node.js 20+ and npm 6+
- Git

### **Clone Repository**
```bash
git clone https://github.com/FardinKhan-Dev/Bite-Bliss.git
cd Bite-Bliss
```

### **Backend Setup**

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (Generate new ones for production!)
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
ENCRYPTION_KEY=your-encryption-key
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# APIs
GEMINI_API_KEY=your-gemini-api-key
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Email
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
EMAIL_ADDRESS_FROM=your-email@gmail.com
EMAIL_ADDRESS_REPLY=your-email@gmail.com
```

4. Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:1337`

### **Frontend Setup**

1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
VITE_API_URL=http://localhost:1337/api
```

4. Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

### **Backend Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google AI API key | `AIza...` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_SECRET` | Cloudinary API secret | `abc123...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
| `GMAIL_USER` | Gmail account | `your@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail app password | `xxxx xxxx xxxx xxxx` |

### **Frontend Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:1337/api` |

---

## 📚 Usage

### **Admin Panel**
1. Visit `http://localhost:1337/admin`
2. Create your admin account
3. Configure permissions in Settings → Users & Permissions → Roles
4. Set Public role permissions for `Recipe` and `Subscription-plan`

### **Create Subscription Plans**
In Strapi admin panel, create plans:

**Free Plan:**
- Name: `Free Reader`
- Price: `0`
- Tier: `0`
- Features: Basic recipe access

**Premium Plan:**
- Name: `Premium Cook`
- Price: `9.99`
- Tier: `1`
- Stripe Price ID: From Stripe Dashboard
- Features: Premium recipes, ad-free

**VIP Plan:**
- Name: `VIP Chef`
- Price: `19.99`
- Tier: `2`
- Stripe Price ID: From Stripe Dashboard
- Features: Exclusive content, early access

### **Google OAuth Setup**
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:1337/connect/google/redirect`
6. Add credentials to Strapi admin: Settings → Providers → Google

---

## 🌐 Deployment

### **Recommended Stack**
- **Frontend**: Vercel (Free tier)
- **Backend**: Railway or Strapi Cloud
- **Database**: PostgreSQL (production)

### **Quick Deploy**

#### **Frontend to Vercel:**
```bash
cd frontend
npm run build
vercel deploy
```

Set environment variable:
- `VITE_API_URL`: Your backend URL

#### **Backend to Railway:**
1. Connect GitHub repository
2. Select `backend` folder
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### **Detailed Deployment Guides**
- [Deployment Readiness Checklist](docs/deployment-readiness.md)
- [Strapi Cloud Deployment Guide](docs/strapi-cloud-deployment.md)

---

## 📁 Project Structure

```
Bite-Bliss/
├── backend/                  # Strapi backend
│   ├── config/              # Configuration files
│   ├── src/
│   │   ├── admin/           # Admin panel customizations
│   │   ├── api/             # API endpoints
│   │   │   ├── recipe/     # Recipe controller
│   │   │   ├── subscription/ # Subscription logic
│   │   │   └── ...
│   │   ├── extensions/      # Plugin extensions
│   │   └── middlewares/     # Custom middlewares
│   └── package.json
│
├── frontend/                 # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/         # UI components
│   │   │   ├── RecipeScrollCanvas.jsx
│   │   │   ├── ScrollytellingHero.jsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Auth pages
│   │   │   ├── Account.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Recipes.jsx
│   │   │   └── ...
│   │   ├── store/          # Zustand stores
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   └── App.jsx
│   └── package.json
│
├── LICENSE
└── README.md
```

---

## 🎯 Key Features Breakdown

### **Scrollytelling Hero**
- Canvas-based animation using 100+ recipe frames
- Synchronized text overlays with scroll position
- Smooth frame interpolation for 60 FPS performance
- Responsive design with mobile optimization
- Call-to-action button integration

### **Subscription System**
- Stripe Checkout integration
- Webhook handling for subscription events
- Customer portal for billing management
- Automatic access control based on subscription tier
- Subscription status tracking

### **Advanced Account Management**
- Profile photo upload with Cloudinary
- Username customization
- Password change with validation
- Email notification preferences
- Newsletter subscription toggle
- Account deletion with confirmation

---

## 🧪 Testing

### **Frontend Testing**
```bash
cd frontend
npm run test
```

### **Backend Testing**
```bash
cd backend
npm run test
```

---

## 🤝 Contributing

This is a proprietary project. Contributions are not currently accepted.

---

## 📄 License

Copyright © 2024-2026 Fardin Khan. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification of this software, via any medium, is strictly prohibited.

See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Fardin Khan**
- GitHub: [@FardinKhan-Dev](https://github.com/FardinKhan-Dev)
- LinkedIn: [Fardin Khan](#)
- Email: your-email@example.com

---

## 🙏 Acknowledgments

- [Strapi](https://strapi.io/) - Headless CMS
- [React](https://reactjs.org/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Stripe](https://stripe.com/) - Payment Processing
- [Cloudinary](https://cloudinary.com/) - Media Management
- [Google Gemini](https://ai.google.dev/) - AI Integration

---

## 📞 Support

For support, email support@bitebliss.com or open an issue in this repository.

---

<div align="center">

**Built with ❤️ using React, Strapi, and modern web technologies**

⭐ Star this repo if you find it helpful!

</div>
