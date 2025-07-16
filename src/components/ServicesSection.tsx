
import type { FC } from "react";

const ServicesSection: FC = () => {
  return (
    <section
      id="services"
      className="py-16 md:py-24 px-6 md:px-12 bg-white rounded-xl mx-4 mt-8 shadow-lg"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-signmons-darkblue mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service Card 1: Vehicle Decals */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-b-4 border-signmons-blue transform hover:scale-105 transition-transform duration-300">
            <div className="text-signmons-blue mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 7h-1V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-4 0h-4V6h4v1zM5 18V9h14l.01 9H5zm2-4h2v2H7zm6 0h2v2h-2zm-4 0h2v2h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Vehicle Decals & Lettering
            </h3>
            <p className="text-gray-600 mb-4">
              Transform your car, truck, or van into a mobile billboard with
              custom-cut vinyl decals and professional lettering.
            </p>
            <a
              href="#"
              className="text-signmons-blue hover:underline font-medium"
            >
              Learn More &rarr;
            </a>
          </div>

          {/* Service Card 2: Custom Apparel */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-b-4 border-signmons-purple transform hover:scale-105 transition-transform duration-300">
            <div className="text-signmons-purple mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2c-3.87 0-7 3.13-7 7 0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-1 2h2v6h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Custom Apparel & Heat Transfers
            </h3>
            <p className="text-gray-600 mb-4">
              Personalized T-shirts, hoodies, and accessories with durable heat
              transfer vinyl designs for your brand or event.
            </p>
            <a
              href="#"
              className="text-signmons-purple hover:underline font-medium"
            >
              Learn More &rarr;
            </a>
          </div>

          {/* Service Card 3: Business Signage */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-b-4 border-signmons-blue transform hover:scale-105 transition-transform duration-300">
            <div className="text-signmons-blue mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM9 8h2v8H9zm4 0h2v8h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Business Signage & Decals
            </h3>
            <p className="text-gray-600 mb-4">
              Window decals, wall graphics, and custom signs to enhance your
              business's visibility and brand presence.
            </p>
            <a
              href="#"
              className="text-signmons-blue hover:underline font-medium"
            >
              Learn More &rarr;
            </a>
          </div>

          {/* Service Card 4: Specialty Projects */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-b-4 border-signmons-purple transform hover:scale-105 transition-transform duration-300">
            <div className="text-signmons-purple mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-signmons-purple mb-3">
              Specialty & Custom Projects
            </h3>
            <p className="text-gray-600 mb-4">
              From intricate paper crafts to unique home decor, we bring your
              most creative ideas to life with precision cutting.
            </p>
            <a
              href="#"
              className="text-signmons-purple hover:underline font-medium"
            >
              Learn More &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
