# Uber Clone - React Native & Expo

A full-stack Uber clone built with React Native, Expo, and modern mobile development tools. This project features a complete flow from authentication to ride booking and payment integration.

## 📖 Project Overview

This project is a comprehensive mobile application designed to demonstrate the power of modern cross-platform development. The primary goal was to replicate the core functionality of a ride-sharing platform like Uber, providing a seamless and intuitive user experience. 

It solves the complex challenges of:
- **Real-time Location Services**: Fetching and displaying the user's current position and allowing them to search for destinations with live suggestions.
- **Dynamic Mapping**: Calculating routes and visualizing them on a map with interactive markers.
- **Full-stack Integration**: Connecting a mobile frontend with a serverless backend and a real-world database to manage users, drivers, and ride history.
- **Secure Transactions**: Ensuring safe and reliable payment flows for a production-ready feel.

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

## 🧠 Key Skills Demonstrated

- **Cross-Platform Mobile Development**: Building a high-performance native app for both iOS and Android using a single codebase.
- **Advanced UI/UX**: Implementing responsive layouts with **Tailwind CSS (NativeWind)** and smooth transitions with **Reanimated**.
- **Location Services**: Integrating real-time geolocation, map rendering, and route calculation using **Google Maps API**.
- **Secure Authentication**: Managing user sessions and secure login flows with **Clerk**.
- **Payment Processing**: Implementing end-to-end financial transactions using the **Stripe SDK**.
- **State Management**: Handling complex application states efficiently with **Zustand**.
- **Serverless Backend**: Designing and connecting to a serverless **PostgreSQL** database with **Neon**.
- **Modern Navigation**: Architecting deep-linking and nested navigation using **Expo Router**.

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
