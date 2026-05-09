# Uber Clone - React Native & Expo

A full-stack Uber clone built with React Native, Expo, and modern mobile development tools. This project features a complete flow from authentication to ride booking and payment integration.

## 🚀 Features

- **Authentication**: Secure login and sign-up using **Clerk**.
- **Ride Booking**: Search for destinations using **Google Places Autocomplete**.
- **Maps Integration**: Real-time map rendering with route directions using **React Native Maps**.
- **Payments**: Integrated payment processing with **Stripe**.
- **Styling**: Responsive and beautiful UI built with **NativeWind** (Tailwind CSS).
- **State Management**: Lightweight and fast state handling with **Zustand**.
- **Database**: Serverless PostgreSQL hosted on **Neon**.
- **Navigation**: File-based routing with **Expo Router**.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Language**: TypeScript
- **Styling**: [NativeWind](https://www.nativewind.dev/)
- **Auth**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Database**: [Neon](https://neon.tech/)
- **API Fetching**: [SWR](https://swr.vercel.app/)

## 📋 Prerequisites

Before you begin, ensure you have the following:
- Node.js installed.
- Expo Go app on your phone or an Android/iOS emulator.
- API Keys for:
  - Clerk (Authentication)
  - Stripe (Payments)
  - Google Maps (Maps & Places)
  - Neon (Database URL)

## ⚙️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adity0a/Uber.git
   cd uber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your keys:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   DATABASE_URL=your_neon_db_url
   ```

4. **Start the project**
   ```bash
   npx expo start
   ```

5. **Run on Android**
   - Press **`a`** in the terminal to open on an Android emulator or connected device.

## 📱 Screenshots
*(Add your screenshots here later)*

## 📄 License
This project is for educational purposes.
