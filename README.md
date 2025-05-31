# 🌾 Agric News Hub

A modern, full-stack platform that curates the latest agricultural news, research articles, and blog content — tailored for students, researchers, and enthusiasts across Africa and beyond.

Built with **Next.js**, **Supabase**, and **Tailwind CSS**.

---

## 🚀 Features

- 📚 **Research Articles** – Access curated agricultural research summaries and full publications.
- 📰 **Agri-News Feed** – Stay up to date with the latest headlines in agriculture.
- ✍️ **Blog Posts** – Expert and student-written blogs on farming, tech, and policy.
- 💌 **Newsletter** – Users can subscribe for updates via email.
- 🔐 **User Roles** – Admin and user roles with optional premium content access.
- 📦 **Fully Headless CMS** – Powered by Supabase with real-time capabilities.
- 🎨 **Beautiful UI** – Responsive, mobile-friendly design using Tailwind CSS.

---

## 🛠️ Tech Stack

| Layer        | Tool                |
|--------------|---------------------|
| Frontend     | [Next.js](https://nextjs.org) + [React](https://reactjs.org) |
| Styling      | [Tailwind CSS](https://tailwindcss.com) |
| Backend      | [Supabase](https://supabase.com) (Database, Auth, Storage) |
| Hosting      | Vercel / Supabase Hosting |
| Icons        | [Lucide](https://lucide.dev/) |
| Forms & More | Coming soon: EmailJS, SEO, Analytics |

---

## 🧪 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/barrister1990/agric-news-hub.git
cd agric-news-hub
```

### 2. Install Dependencies

Using `npm`:

```bash
npm install
```

Or using `pnpm`:

```bash
pnpm install
```

### 3. Create a `.env.local` File

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from [Supabase Project Settings → API].

---

## 🧭 Scripts

| Command              | Description                 |
|----------------------|-----------------------------|
| `npm run dev`        | Start development server    |
| `npm run build`      | Build production app        |
| `npm start`          | Start production server     |
| `npm run lint`       | Lint your codebase          |

---

## 🌐 Live Demo

👉 [https://agric-news-hub.vercel.app](https://agric-news-hub.vercel.app)

---

## 📁 Database Schema (Supabase)

Includes tables:

- `profiles` – User profiles with roles
- `research_articles` – Research article data
- `blog_posts` – Blog content with author info
- `newsletter_subscribers` – Email list for newsletters

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

```bash
# Fork, make changes, then:
git commit -m "your message"
git push origin your-branch
```

---

## 📄 License

MIT License © 2025 Charles Awuku

---

## 🌍 About

**Agric News Hub** is designed to empower the next generation of agricultural researchers and farmers with easy access to knowledge, tech, and community.

---
