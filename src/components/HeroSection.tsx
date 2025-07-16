import { useEffect } from "react";
import type { FC } from "react";

interface HeroSectionProps {
  astronautLogoSrc: string; // Prop for the astronaut logo image source
}

const HeroSection: FC<HeroSectionProps> = ({ astronautLogoSrc }) => {
  useEffect(() => {
    // Apply animation to the astronaut image
    const astronaut = document.querySelector(
      ".hero-section .animate-bounce-slow"
    );
    if (astronaut) {
      (astronaut as HTMLElement).style.animation = "bounce-slow 3s infinite ease-in-out";
    }
  }, []);

  return (
    <section className="hero-section relative bg-white py-16 md:py-24 px-6 md:px-12 text-center overflow-hidden rounded-xl mx-4 mt-8 shadow-lg">
      <div className="hero-bg-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <img
          src={astronautLogoSrc}
          alt="Signmons Astronaut Character"
          className="h-40 w-auto mx-auto mb-6 drop-shadow-lg animate-bounce-slow"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-signmons-purple leading-tight mb-4">
          Precision Designs, <br className="hidden md:block" /> Perfect Wraps.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your vision, our expertise, unmatched quality. We bring your ideas to
          life with custom vinyl creations, powered by modern design and
          cutting-edge precision.
        </p>
        <a
          href="#contact"
          className="inline-block bg-signmons-blue text-white text-lg md:text-xl px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 shadow-xl transform hover:scale-105 shadow-signmons"
        >
          Get a Free Quote
        </a>
      </div>
    </section>
  );
};

export default HeroSection ;

