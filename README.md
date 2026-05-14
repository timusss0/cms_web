# 🗞️ Distributed News CMS

A powerful, modern Content Management System (CMS) built with Next.js 16, designed for managing and distributing news across multiple platforms from a single dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-v0.45-C5F74F?style=for-the-badge&logo=drizzle)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

## 🚀 Overview

This Distributed News CMS allows editors to create, manage, and distribute news content to various target websites. It features a robust multi-site architecture where a single piece of news can be pushed to multiple external platforms via a distribution logging system.

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated user authentication system using `bcryptjs` and `jose` for JWT-based session management.
- **📰 Centralized News Management**: Full CRUD operations for news articles, including rich content and image support.
- **🌐 Multi-Site Distribution**: Manage a fleet of target websites and track distribution status for each article.
- **📊 Distribution Logging**: Real-time tracking of news distribution across websites with status updates (Pending, Success, Failed).
- **🎨 Modern UI/UX**: Built with Shadcn UI and Tailwind CSS v4, featuring a sleek, responsive dashboard and dark mode support.
- **🛠️ Type-Safe Database**: Leveraging Drizzle ORM for end-to-end type safety and efficient MySQL interactions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MySQL](https://www.mysql.com/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Auth**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [jose](https://github.com/panva/jose)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- MySQL Instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cms.git
   cd cms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/cms_db"
   JWT_SECRET="your_super_secret_key"
   ```

4. **Database Setup:**
   Run migrations and seed the database:
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components
├── db/             # Database schema and Drizzle config
├── lib/            # Shared utilities and logic
├── styles/         # Global styles and Tailwind configuration
└── types/          # Global TypeScript definitions
```

## 📜 License

This project is licensed under the MIT License.

---

Built with ❤️ for the News Distribution Ecosystem.
