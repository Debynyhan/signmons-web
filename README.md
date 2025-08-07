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
Configure
Copy .env.example → .env and fill in your Firebase credentials:

text
Copy
Edit
VITE_FIREBASE_API_KEY=…
VITE_FIREBASE_AUTH_DOMAIN=…
VITE_FIREBASE_PROJECT_ID=…
VITE_FIREBASE_STORAGE_BUCKET=…
VITE_FIREBASE_MESSAGING_SENDER_ID=…
VITE_FIREBASE_APP_ID=…
Run locally

bash
Copy
Edit
npm run dev
Build & deploy

bash
Copy
Edit
npm run build
firebase deploy
📂 Folder Structure
bash
Copy
Edit
src/
├── components/
│   ├── common/            # HeroShapes, CameraController, etc.
│   └── consultation/      # IndustryStep, VehicleStep, … ConsultationWizard
├── context/               # ToastContext, AuthContext
├── hooks/                 # useDesignWizard, useLocalStorage
├── pages/                 # HomePage, StartDesignPage, ThankYouPage
├── router/                # PageRouter
├── types/                 # consultation.ts, navigation.ts
├── utils/                 # firestoreUtils, storageUtils, validationUtils
└── firebase/              # firebase.ts initialization
🔮 Future Scope
User accounts & history
Save past mockup requests, let users log in.

Live preview
Show an interactive mockup of their decal on a 3D vehicle model.

Payment & scheduling
Allow users to pay for a full design package or schedule installation.

Admin dashboard
See incoming requests, download assets, assign to designers/installers.

📝 Contributing
Create a branch: git checkout -b feature/awesome

Commit your changes: git commit -m "Add awesome feature"

Push to the branch: git push origin feature/awesome

Open a Pull Request

Please adhere to our code style guide and keep things DRY, secure (OWASP best practices), and component-driven (single responsibility).
