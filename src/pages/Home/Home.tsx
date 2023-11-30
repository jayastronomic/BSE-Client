import { useState, Suspense } from "react";
import Sticks from "../../components/Sticks";

const Home = () => {
  const [speed, setSpeed] = useState(0.5);
  return (
    <main className="h-full">
      <Suspense fallback={null}>
        <Sticks speed={speed} />
      </Suspense>
    </main>
  );
};

export default Home;
