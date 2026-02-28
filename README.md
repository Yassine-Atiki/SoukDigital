<div align="center">

# 🛍️ Souk Digital

### A full-stack mobile marketplace celebrating Moroccan artisanal craftsmanship

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-D97853.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/Yassine-Atiki/SoukDigital)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Live Demo](#-live-demo)

</div>

---

## 📱 Overview

**Souk Digital** is a cross-platform mobile marketplace that connects customers with Moroccan artisans. Buyers can discover and purchase handcrafted goods — pottery, zellige, leather, textiles, jewelry, and woodwork — while artisans manage their own shops with a dedicated dashboard. The UI blends modern mobile design with authentic Moroccan aesthetics: terracotta tones, zellige-inspired patterns, and golden accents.

---

## 🖼️ Screenshots

<div align="center">
<img src="assets/icon.png" alt="Souk Digital App Icon" width="120" />

> *Full app screenshots coming soon — run the app locally to see the UI in action.*
</div>

---

## ✨ Features

### 🛒 For Customers
- **Browse Products** — Explore handcrafted items filtered by category (Tissage, Zellige, Poterie, Bois, Cuir, Bijoux)
- **Smart Search** — Full-text product search screen
- **Product Detail** — High-resolution images, artisan info, price, and stock
- **Shopping Cart** — Add/remove items, adjust quantities, view totals
- **Checkout & Orders** — Place orders and track order history
- **Favorites** — Save and revisit preferred products
- **Address Book** — Manage multiple delivery addresses
- **Profile Management** — Edit personal info and avatar

### 🎨 For Artisans
- **Artisan Dashboard** — Overview of sales, orders, and product stats
- **Product Management** — Add, edit, and delete product listings with image upload
- **Order Tracking** — View and manage incoming orders
- **Public Profile** — Artisan bio, specialty, location, and ratings

### 🔐 Authentication
- Role-based sign-up (Customer / Artisan)
- JWT-secured login & session persistence via AsyncStorage
- Password hashing with bcrypt

### 🎨 Design System
- Moroccan-inspired color palette (terracotta, emerald, gold, Majorelle blue)
- Reusable components: `CustomButton`, `CustomInput`, `MoroccanPattern`, `MoroccanDivider`, `SafeAreaWrapper`, `RoleSelector`
- Responsive grid layout, safe area support across all devices

---

## 🛠️ Tech Stack

<div align="center">

[![Tech Stack](https://skillicons.dev/icons?i=react,nodejs,express,mysql,js)](https://skillicons.dev)

</div>

| Layer | Technology |
|---|---|
| Mobile App | React Native 0.81.5 + Expo ~54.0 |
| Navigation | React Navigation 7.x (Stack + Bottom Tabs) |
| State Management | React Context API |
| Backend API | Node.js + Express 5 |
| Database | MySQL 8 |
| Authentication | JWT + bcrypt |
| Image Upload | Multer |
| Local Storage | AsyncStorage |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MySQL** 8.0 running locally
- **Expo Go** app on your iOS/Android device, or an emulator/simulator

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Yassine-Atiki/SoukDigital.git
cd SoukDigital
```

#### 2. Install mobile app dependencies

```bash
npm install
```

#### 3. Install API dependencies

```bash
cd soukdigital-api
npm install
```

---

### Environment Setup

#### Database

1. Start your MySQL server
2. Create the database and tables:

```bash
mysql -u root -p < soukdigital-api/database/schema.sql
```

#### API environment variables

```bash
cp soukdigital-api/.env.example soukdigital-api/.env
```

Open `soukdigital-api/.env` and fill in your values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=soukdigital
DB_PORT=3306

PORT=3000
NODE_ENV=development

JWT_SECRET=your_strong_random_secret

ALLOWED_ORIGINS=http://localhost:19006,http://localhost:8081
```

#### API URL (mobile app)

Open `src/config/api.js` and set your machine's local IP if testing on a physical device:

```js
export const API_BASE_URL = 'http://YOUR_LOCAL_IP:3000';
// Example: 'http://192.168.1.100:3000'
// Use 'http://localhost:3000' for emulator/simulator
```

---

### Run Locally

#### Start the backend API

```bash
cd soukdigital-api
npm run dev      # Development (nodemon auto-reload)
# or
npm start        # Production
```

The API will be available at `http://localhost:3000`. Verify it with:

```bash
curl http://localhost:3000/api/health
```

#### Start the Expo app (in a separate terminal)

```bash
# From project root
npm start         # Opens Expo Dev Tools

npm run android   # Launch on Android emulator
npm run ios       # Launch on iOS simulator (macOS only)
npm run web       # Launch in browser
```

Then scan the QR code with **Expo Go** on your mobile device.

---

## 📁 Project Structure

```
SoukDigital/
│
├── App.js                        # App entry — context providers + navigation root
├── index.js                      # Expo entry point
├── app.json                      # Expo configuration
├── package.json                  # Mobile app dependencies
│
├── assets/                       # App icons and splash screen images
│
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── CustomButton.js       # Styled button with Moroccan ornaments
│   │   ├── CustomInput.js        # Input field with gold accent & validation
│   │   ├── MoroccanDivider.js    # Decorative dividers (4 variants)
│   │   ├── MoroccanPattern.js    # Decorative SVG-like patterns (4 variants)
│   │   ├── RoleSelector.js       # Customer / Artisan role picker
│   │   └── SafeAreaWrapper.js    # Safe area utility wrapper
│   │
│   ├── config/
│   │   └── api.js                # API base URL and all endpoint constants
│   │
│   ├── constants/
│   │   └── theme.js              # Design system: colors, spacing, fonts, shadows
│   │
│   ├── context/                  # Global state via React Context
│   │   ├── AppInitializer.js     # Restore auth session on startup
│   │   ├── AuthContext.js        # Auth state & login/logout actions
│   │   ├── CartContext.js        # Shopping cart state
│   │   ├── FavoritesContext.js   # Favorites list
│   │   ├── OrdersContext.js      # Orders state
│   │   └── ProductsContext.js    # Products state
│   │
│   ├── navigation/
│   │   ├── AuthNavigator.js      # Login / Sign-up stack
│   │   ├── MainContainer.js      # Bottom tabs for authenticated users
│   │   └── RootNavigator.js      # Root switch: auth vs. main app
│   │
│   ├── screens/                  # One file per screen
│   │   ├── HomeScreen.js         # Product grid + category filter
│   │   ├── SearchScreen.js       # Full-text product search
│   │   ├── ProductDetailScreen.js
│   │   ├── CartScreen.js
│   │   ├── CheckoutScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── OrderHistoryScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── EditProfileScreen.js
│   │   ├── AddressesScreen.js
│   │   ├── PaymentMethodsScreen.js
│   │   ├── SettingsScreen.js
│   │   ├── ArtisanDashboardScreen.js
│   │   ├── ArtisanProfileScreen.js
│   │   ├── ManageProductsScreen.js
│   │   ├── AddEditProductScreen.js
│   │   ├── LoginScreen.js
│   │   └── SignUpScreen.js
│   │
│   └── services/                 # API communication layer
│       ├── AuthService.js
│       ├── ArtisanService.js
│       ├── DataService.js
│       ├── HttpService.js
│       ├── OrderService.js
│       └── StorageService.js
│
└── soukdigital-api/              # Node.js / Express backend
    ├── server.js                 # Express app entry point
    ├── .env.example              # Environment variable template
    ├── package.json
    │
    ├── config/
    │   ├── database.js           # MySQL connection pool
    │   ├── multer.js             # Product image upload config
    │   └── multer-avatar.js      # Avatar upload config
    │
    ├── database/
    │   └── schema.sql            # Full MySQL schema
    │
    ├── middleware/
    │   └── auth.js               # JWT verification middleware
    │
    ├── routes/
    │   ├── auth.js               # POST /api/auth/register|login|verify
    │   ├── products.js           # CRUD /api/products
    │   ├── orders.js             # CRUD /api/orders
    │   ├── favorites.js          # GET|POST /api/favorites
    │   ├── users.js              # GET|PUT /api/users/profile
    │   ├── addresses.js          # CRUD /api/addresses
    │   └── artisans.js           # GET /api/artisans
    │
    └── uploads/                  # Uploaded product and avatar images
        ├── products/
        └── avatars/
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `POST` | `/api/auth/verify` | Verify JWT token |
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create product (artisan) |
| `PUT` | `/api/products/:id` | Update product (artisan) |
| `DELETE` | `/api/products/:id` | Delete product (artisan) |
| `GET` | `/api/orders` | List user orders |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/favorites` | List favorites |
| `POST` | `/api/favorites/toggle` | Add/remove favorite |
| `GET` | `/api/users/profile` | Get current user profile |
| `PUT` | `/api/users/profile` | Update profile |
| `GET` | `/api/addresses` | List addresses |
| `POST` | `/api/addresses` | Add address |
| `GET` | `/api/health` | Health check |

---

## 🔗 Live Demo

> 🚧 **Coming Soon** — [https://your-live-demo-url.com](https://your-live-demo-url.com)

---

## 👤 Author

**[Your Name]**

[![GitHub](https://img.shields.io/badge/GitHub-@Yassine--Atiki-181717?logo=github)](https://github.com/Yassine-Atiki)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin)](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for Moroccan artisanal craftsmanship**

[⬆ Back to top](#️-souk-digital)

</div>

