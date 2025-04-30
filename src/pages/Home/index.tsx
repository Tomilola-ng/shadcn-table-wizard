import HomeHero from "./hero";
import TechStack from "./tech-stack";
import HomeFeatures from "./features";

import Header from "@/components/reusable/Header";
import { Footer } from "@/components/reusable/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-24">
        <HomeHero />
        <HomeFeatures />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
