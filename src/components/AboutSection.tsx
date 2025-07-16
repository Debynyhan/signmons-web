
import type { FC } from "react";

const AboutSection: FC = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 px-6 md:px-12 bg-signmons-purple text-white rounded-xl mx-4 mt-8 shadow-lg"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Choose Signmons Studio?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: AI-Inspired Design */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-md border-b-4 border-signmons-blue">
            <div className="text-signmons-blue mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              AI-Inspired Creativity
            </h3>
            <p className="text-gray-600">
              Leveraging modern design insights and AI-driven concepts to spark
              unique and impactful wrap ideas for your business or personal
              project.
            </p>
          </div>

          {/* Feature 2: Cameo 4 Pro Precision */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-md border-b-4 border-signmons-blue">
            <div className="text-signmons-blue mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Cameo 4 Pro Precision
            </h3>
            <p className="text-gray-600">
              Utilizing the advanced Silhouette Cameo 4 Pro for flawless,
              intricate cuts and superior quality vinyl applications.
            </p>
          </div>

          {/* Feature 3: Your Expertise */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-md border-b-4 border-signmons-blue">
            <div className="text-signmons-blue mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Developer & Design Skill
            </h3>
            <p className="text-gray-600">
              Combining technical development prowess with keen design
              sensibilities to ensure your project is both functional and
              beautiful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
