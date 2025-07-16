import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 text-center rounded-xl mx-4 mt-8 bg-signmons-blue shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Vision?
        </h2>
        <p className="text-xl md:text-2xl text-white opacity-90 mb-8">
          Let's create something amazing together. Get in touch for a
          personalized consultation and quote.
        </p>
        <a
          href="#contact"
          className="inline-block bg-signmons-accent text-white text-lg md:text-xl px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 shadow-xl transform hover:scale-105 shadow-signmons"
        >
          Start Your Project Today!
        </a>
      </div>
    </section>
  );
};

export default CTASection;
