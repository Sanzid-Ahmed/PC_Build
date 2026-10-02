# 🖥️ ThriftBuild — Frontend

### Build Smarter. Spend Less.

This repository contains the **frontend application of ThriftBuild**, an AI-assisted PC building and hardware marketplace platform designed to simplify PC component discovery, price comparison, custom PC configuration, and order management.

The frontend is built with **React** and communicates with the ThriftBuild backend through REST APIs.

🌐 **Live Website:** https://pc-build-ten.vercel.app/

⚙️ **Backend Repository:** https://github.com/Sanzid-Ahmed/pc-builder-api

---

## ✨ Features

### 🏠 Home Page

The ThriftBuild home page provides an overview of the platform and direct access to its major features.

* Hero section
* Start Building / Get Started actions
* Retailer showcase
* Customer reviews
* Hardware categories
* Featured products
* Popular products
* Best deals
* About ThriftBuild section

---

### 🛒 Product Marketplace

Users can browse a centralized catalog of PC hardware collected from multiple retailers.

Supported categories include:

* Processor
* Graphics Card
* Motherboard
* RAM
* SSD
* HDD
* Power Supply
* CPU Cooler
* Casing
* Monitor
* Keyboard
* Mouse

### Product Filtering

Users can filter products by:

* Category
* Brand
* Store
* Price range

### Product Sorting

Available sorting options include:

* Default
* Price: Low to High
* Price: High to Low
* Name: A to Z
* Name: Z to A

---

# 💰 Price Comparison

ThriftBuild provides a centralized interface for comparing hardware prices from different retailers.

The frontend displays:

* Product information
* Current price
* Previous price
* Discount information
* Retailer information
* Ratings
* Product images
* Product specifications
* Price comparison information

This allows users to research hardware without manually visiting multiple retailer websites.

---

# 🤖 AI-Assisted PC Builder

The frontend provides a guided **5-step PC building wizard**.

```text
PC Type
   ↓
Budget
   ↓
Preferences
   ↓
Requirements
   ↓
Recommended Build
```

Users can select their intended workload:

* 🎮 Gaming
* 💼 Professional
* 🤖 AI & ML
* 🎬 Content Creation
* 🖥️ General Use

The frontend collects the user's requirements and sends the relevant information to the backend/AI system to generate a suitable PC configuration.

---

# 🧩 Custom PC Builder

The Custom PC Builder provides experienced users with a manual component-selection interface.

Users can select:

```text
CPU
Motherboard
RAM
GPU
Storage
PSU
Case
```

### Features

* Component-by-component selection
* Compatibility indicators
* Brand filtering
* Build progress tracking
* Build summary
* Power estimation
* Persistent build state
* Product information
* Component replacement

---

# 🔐 Authentication

ThriftBuild uses **Firebase Authentication** for user authentication.

The frontend handles:

* User login
* Authentication state
* User session
* Protected routes
* User-specific features
* Admin access control

Authenticated users can access features such as:

* Custom builds
* Orders
* Order history
* Account-specific functionality

---

# 🛒 Checkout & Orders

The frontend provides the customer-facing order workflow.

Users can:

1. Configure a PC
2. Select products
3. Review their build
4. Proceed to checkout
5. Place an order
6. View their orders
7. Track order status

### Order Status

```text
Pending
   ↓
Accepted
   ↓
On the Way
   ↓
Complete
```

---

# 📦 My Orders

The **My Orders** interface provides customers with a visual order-tracking experience.

Users can view:

* Order ID
* Order date
* Order status
* Products
* Quantities
* Unit prices
* Subtotals
* Total amount
* Delivery progress

---

# 👨‍💼 Admin Interface

The frontend also includes a dedicated administrative interface.

Administrators can:

* View customer orders
* Inspect order details
* View customer information
* View ordered products
* View retailer information
* Update order status
* Delete orders

---

# 🗺️ Service Coverage

The frontend includes an interactive geographical interface using:

* **Leaflet**
* **OpenStreetMap**

The platform represents service coverage across the **64 administrative districts of Bangladesh**.

---

# 🎨 UI & Design

The interface is developed using:

* React
* Tailwind CSS
* DaisyUI

The design focuses on:

* Responsive layouts
* Reusable components
* Interactive interfaces
* Hardware-focused product cards
* Clear navigation
* User-friendly PC configuration workflows

---

# 🛠️ Technology Stack

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| React                   | Frontend framework    |
| Tailwind CSS            | Styling               |
| DaisyUI                 | UI components         |
| React Router            | Routing               |
| Firebase Authentication | Authentication        |
| Leaflet                 | Interactive maps      |
| OpenStreetMap           | Map data              |
| REST API                | Backend communication |

---

# 🏗️ Frontend Architecture

The frontend communicates with the backend through REST APIs.

```text
                    ┌────────────────────┐
                    │       User         │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │   React Frontend   │
                    │                    │
                    │ Tailwind + DaisyUI │
                    └─────────┬──────────┘
                              │
                         REST API
                              │
                              ▼
                    ┌────────────────────┐
                    │  FastAPI Backend  │
                    └────────────────────┘
```

---

# 📂 Project Structure

A simplified structure of the frontend project:

```text
PC_Build/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── layouts/
│   ├── routes/
│   ├── firebase/
│   └── ...
│
├── package.json
├── vite.config.js
└── README.md
```

> The exact project structure may change as development continues.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Sanzid-Ahmed/PC_Build.git
```

---

## 2. Enter the Project

```bash
cd PC_Build
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

The terminal will provide the local development URL.

---

# 🔐 Environment Configuration

If the frontend requires environment variables, create a `.env` file according to the project's Firebase/API configuration.

Example:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

> Use the actual environment variable names configured in the project. Never commit private credentials or secret keys to GitHub.

---

# 🔗 Backend

The frontend communicates with the separate ThriftBuild backend.

### Backend Repository

https://github.com/Sanzid-Ahmed/pc-builder-api

The backend provides APIs for functionality such as:

* Users
* Products
* Orders
* Product filtering
* Product retrieval
* Order management
* Scraped product data

---

# 🌐 Live Demo

### ThriftBuild

https://pc-build-ten.vercel.app/

---

# 📸 Screenshots

Recommended screenshots for this repository:

### Home Page

*Add screenshot here.*

### Product Marketplace

*Add screenshot here.*

### AI PC Builder

*Add screenshot here.*

### Custom PC Builder

*Add screenshot here.*

### My Orders

*Add screenshot here.*

### Admin Dashboard

*Add screenshot here.*

---

# 🔮 Future Improvements

Planned frontend improvements include:

* Saved PC configurations
* Public build sharing
* Wishlist functionality
* More detailed compatibility information
* Advanced AI configuration controls
* Improved product comparison
* Advanced user personalization
* Analytics dashboards
* Improved responsive/mobile experience

---

# 👥 Development Team

Developed by students from the **Department of Computer Science & Engineering, United International University, Dhaka, Bangladesh**.

| Member             | Role      |
| ------------------ | --------- |
| **Sanzid Ahmed**   | Developer |
| **Ali Omar Nafiz** | Developer |
| **Tahsin Haque**   | Developer |
| **Ahmed Rayeed**   | Developer |

---

# 🔗 Project Links

* 🌐 **Live Website:** https://pc-build-ten.vercel.app/
* 💻 **Frontend:** https://github.com/Sanzid-Ahmed/PC_Build
* ⚙️ **Backend:** https://github.com/Sanzid-Ahmed/pc-builder-api

---

<div align="center">

### 🖥️ ThriftBuild

**Build Smarter. Spend Less.**

</div>
