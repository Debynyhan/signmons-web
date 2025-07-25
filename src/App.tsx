import type { FC } from "react";
// For Sprint 0, we'll start with a very minimal App component
// to confirm the basic setup (Tailwind, dark background, font).

const App: FC = () => {
  return (
    <div className="antialiased text-gray-100 bg-signmons-dark-bg min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-signmons-blue-light">
        Signmons MVP - Sprint 0
      </h1>
    </div>
  );
};

export default App;
