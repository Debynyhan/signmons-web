
import type { FC } from "react";
import Header from "./components/Header.tsx";
import HeroSection from "./components/HeroSection.tsx";
import ServicesSection from "./components/ServicesSection.tsx";
import AboutSection from "./components/AboutSection.tsx";
import CTASection from "./components/CTASection.tsx";
import Footer from "./components/Footer.tsx";

// Define the logo source. In a Vite project, if your image is in the 'public' folder,
// you can reference it directly from the root, e.g., '/logo.jpg'.
// If it's in 'src/assets', you would import it: import logo from './assets/logo.jpg';
import signmonsLogo from "./assets/logo.png";

const App: FC = () => {
  // Adding a console log to help confirm App component is being reached (though this error is build-time)
  console.log("App component is rendering. Checking component imports...");

  return (
    <div className="antialiased text-gray-800">
      <Header logoSrc={signmonsLogo} />
      <HeroSection astronautLogoSrc={signmonsLogo} />
      <ServicesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default App;
