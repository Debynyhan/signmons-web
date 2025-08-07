<<<<<<< HEAD

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

# signmons-web

Custom decals and Web apps

# Signmons

> **Decals, wraps & websites** that shout your name—so you don’t have to.

Signmons is a lean, single‐page React + Firebase MVP that guides the user through a visual “consultation wizard” to collect just enough info to deliver free custom mockups in under 24 hours.

---

## 🚀 Features

- **Step-by-step wizard**  
  Industry → Vehicle → Style → Assets → Colors → Contact → Timeline → Budget → Notes → Review  
  Saves state to `localStorage` so the user can pick up where they left off.

- **3D animated background**  
  Built with React Three Fiber for an award-worthy design vibe.

- **File uploads + Firestore**  
  Logos are uploaded to Firebase Storage; form data is submitted to Cloud Firestore.

- **Toast notifications**  
  Lightweight snackbars let the user know when their request is submitted.

---

## 🛠 Tech Stack

- **Framework:** React (v18) with TypeScript
- **3D:** React Three Fiber
- **UI:** MUI (Material-UI) + Framer Motion
- **State & hooks:** Custom `useDesignWizard` + `useLocalStorage`
- **Backend:** Firebase (Firestore + Storage)
- **Deploy:** Firebase Hosting (or your choice of static host)

---

## 📦 Getting Started

1. **Clone & install**

   ```bash
   git clone git@github.com:YOUR-ORG/signmons.git
   cd signmons
   npm install
   ```

2. **Configure**  
   Copy `.env.example → .env` and fill in your Firebase credentials:

   ```properties
   VITE_FIREBASE_API_KEY=…
   VITE_FIREBASE_AUTH_DOMAIN=…
   VITE_FIREBASE_PROJECT_ID=…
   VITE_FIREBASE_STORAGE_BUCKET=…
   VITE_FIREBASE_MESSAGING_SENDER_ID=…
   VITE_FIREBASE_APP_ID=…
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

4. **Build & deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### 📂 Folder Structure

```
src/
├── components/
│   ├── common/            # AnimatedHeadline, AnimatedTruck, etc.
│   └── consultation/      # Step components & ConsultationWizard
├── context/               # ToastContext, AuthContext
├── hooks/                 # useDesignWizard, useLocalStorage
├── pages/                 # HomePage, StartDesignPage, ThankYouPage
├── router/                # PageRouter
├── types/                 # consultation.ts, navigation.ts
├── utils/                 # firestoreUtils, storageUtils, validationUtils
└── firebase/              # firebase.ts initialization
```

� **Future Scope**

- User accounts & history
- Live preview
- Payment & scheduling
- Admin dashboard

📝 **Contributing**

1. Create a branch: `git checkout -b feature/awesome`
2. Commit your changes: `git commit -m "Add awesome feature"`
3. Push to the branch: `git push origin feature/awesome`
4. Open a Pull Request

Please adhere to our code style guide and keep things DRY, secure (OWASP best practices), and component-driven (single responsibility).
bash
