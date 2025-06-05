
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Youtube, Instagram, X as TwitterX } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    {
      id: 1,
      title: "Últimas Tendências do YouTube",
      description: "Descubra os vídeos mais populares e criadores em alta no momento. Conteúdo sempre atualizado das principais categorias.",
      platform: "youtube",
      icon: Youtube,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      time: "Há 2 minutos"
    },
    {
      id: 2,
      title: "Destaques do Instagram",
      description: "As melhores publicações, stories e reels que estão bombando na plataforma. Fique por dentro das novidades.",
      platform: "instagram",
      icon: Instagram,
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop",
      time: "Há 5 minutos"
    },
    {
      id: 3,
      title: "Notícias do X (Twitter)",
      description: "Trending topics e discussões mais relevantes acontecendo agora. Mantenha-se informado sobre tudo.",
      platform: "twitter",
      icon: TwitterX,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      time: "Há 1 minuto"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "youtube": return "bg-red-500";
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "twitter": return "bg-blue-500";
      default: return "bg-orange-500";
    }
  };

  return (
    <section className="relative pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Acompanhe as últimas tendências e notícias das principais plataformas em um só lugar.
          </h2>
          <p className="text-gray-300 text-lg">
            Conteúdo sempre atualizado para você ficar por dentro de tudo!
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {highlights.map((highlight) => (
                <div key={highlight.id} className="w-full flex-shrink-0">
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30"
                      style={{ backgroundImage: `url(${highlight.image})` }}
                    ></div>
                    
                    <div className="relative h-full flex items-end p-8 md:p-12">
                      <div className="max-w-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${getPlatformColor(highlight.platform)}`}>
                            <highlight.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-orange-400 font-medium">{highlight.platform}</span>
                          <span className="text-gray-400 text-sm">{highlight.time}</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                          {highlight.title}
                        </h3>
                        
                        <p className="text-gray-200 text-lg leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-orange-500 w-8" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
