
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ContentFeed from "@/components/ContentFeed";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-400 text-lg">Carregando FeedTime...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroCarousel />
        <ContentFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
