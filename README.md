# Currency Converter

![Logo](public/placeholder-logo.svg)


A modern, responsive currency converter app built with Next.js, React, and Tailwind CSS. Instantly convert between major world currencies with a beautiful UI and theming support.

---

## ✨ Features

- **Real-time currency conversion** (mocked for demo; easily extendable to real APIs)
- **Supports major currencies**: USD, EUR, GBP, NGN, GHS, CAD, JPY, AUD
- **Modern UI** with [shadcn/ui](https://ui.shadcn.com/) components
- **Dark/light mode** with system preference support
- **Responsive design** for mobile and desktop
- **Conversion details**: see rates, fees (currently zero), and amounts
- **Easy to extend**: add more currencies or connect to a real API

---

## 📸 Screenshots

You can find reference screenshots in [`public/images/reference1.jpeg`](public/images/reference1.jpeg) and [`public/images/reference2.jpeg`](public/images/reference2.jpeg).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone the repository
$ git clone <repo-url>
$ cd currency-converter

# Install dependencies
$ npm install
# or
yarn install
# or
pnpm install
```

### Running the App

```bash
# Start the development server
$ npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
$ npm run build
$ npm start
```

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI components)
- [next-themes](https://github.com/pacocoursey/next-themes) for theming

---

## ⚙️ Project Structure

- `app/` — Next.js app directory (main pages, layout, and styles)
- `components/` — Reusable UI components (shadcn/ui)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets (images, logo, screenshots)
- `styles/` — Global styles (Tailwind CSS)

---

## 📝 Notes

- **Exchange rates are mocked** for demonstration. To use real rates, connect to an API (see comments in `app/page.tsx`).
- Theming is handled via `next-themes` and can be customized in `components/theme-provider.tsx`.
- UI is built with [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/).

---

## 🙏 Credits

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Currency flag emojis](https://emojipedia.org/)


This project is for educational/demo purposes. Please check with the author before using in production. 