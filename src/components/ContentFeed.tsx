import { useState, useEffect } from "react";
import { Youtube, Instagram, X as TwitterX, Clock, Eye, Heart } from "lucide-react";

interface Post {
  id: string;
  platform: string;
  title: string;
  description: string;
  image: string;
  author: string;
  time: string;
  stats: {
    views?: number;
    likes: number;
    comments?: number;
    retweets?: number;
  };
  category: string;
}

const ContentFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const generateMockPosts = (pageNum: number) => {
    const platforms = ["noticias", "youtube", "tiktok", "twitter", "instagram"];
    const newPosts = [];

    for (let i = 0; i < 10; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      newPosts.push({
        id: `${pageNum}-${i}`,
        platform,
        title: getPlatformTitle(platform, i),
        description: getPlatformDescription(platform),
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId()}?w=400&h=300&fit=crop`,
        author: getRandomAuthor(platform),
        time: getRandomTime(),
        stats: getRandomStats(platform),
        category: getPlatformCategory(platform),
      });
    }

    return newPosts;
  };

  const getPlatformCategory = (platform: string) => {
    const categories = {
      noticias: "Últimas Notícias",
      youtube: "YouTube",
      tiktok: "TikTok",
      twitter: "X (Twitter)",
      instagram: "Instagram"
    };
    return categories[platform as keyof typeof categories] || "Conteúdo";
  };

  const getPlatformTitle = (platform: string, index: number) => {
    const titles = {
      noticias: [
        "Breaking: Novidades da Tecnologia",
        "Economia: Mercado em Alta",
        "Política: Últimas Decisões",
        "Esporte: Resultados de Hoje",
        "Ciência: Nova Descoberta",
        "Mundo: Eventos Importantes"
      ],
      youtube: [
        "Tutorial Completo de React 2024",
        "Top 10 Músicas Mais Tocadas",
        "Como Ganhar Dinheiro Online",
        "Review do Novo iPhone",
        "Receitas Fáceis para o Dia a Dia",
        "Gaming: Novidades e Gameplay"
      ],
      tiktok: [
        "Dance Challenge Viral",
        "Receita Rápida em 60 Segundos",
        "Transformação Incrível",
        "Comédia do Dia a Dia",
        "Dicas de Beleza Express",
        "Trend Musical do Momento"
      ],
      twitter: [
        "Thread: Dicas de Produtividade",
        "Opinião: Futuro das Criptomoedas",
        "Análise: Mercado Financeiro",
        "Debate: Inteligência Artificial",
        "Tendência: Memes do Dia",
        "Urgente: Notícias de Última Hora"
      ],
      instagram: [
        "Look do Dia: Estilo Casual",
        "Receita Fitness para o Café",
        "Viagem dos Sonhos: Maldivas",
        "Decoração: Tendências 2024",
        "Treino em Casa: 15 Minutos",
        "Arte Digital: Processo Criativo"
      ]
    };
    
    const platformTitles = titles[platform as keyof typeof titles];
    if (!platformTitles || platformTitles.length === 0) {
      return "Conteúdo Interessante";
    }
    return platformTitles[index % platformTitles.length];
  };

  const getPlatformDescription = (platform: string) => {
    const descriptions = {
      noticias: "Fique por dentro das últimas notícias e acontecimentos importantes do Brasil e do mundo.",
      youtube: "Novo vídeo publicado com conteúdo exclusivo e de qualidade. Não perca!",
      tiktok: "Vídeo curto e viral que está bombando na plataforma. Assista agora!",
      twitter: "Thread importante sobre assuntos relevantes e atuais. Confira a discussão completa.",
      instagram: "Nova publicação com fotos incríveis e momentos especiais compartilhados."
    };
    return descriptions[platform as keyof typeof descriptions] || "Confira este conteúdo incrível!";
  };

  const getRandomUnsplashId = () => {
    const ids = [
      "1649972904349-6e44c42644a7",
      "1488590528505-98d2b5aba04b",
      "1518770660439-4636190af475",
      "1461749280684-dccba630e2f6",
      "1581091226825-a6a2a5aee158",
      "1526374965328-7f61d4dc18c5"
    ];
    return ids[Math.floor(Math.random() * ids.length)];
  };

  const getRandomAuthor = (platform: string) => {
    const authors = {
      noticias: ["G1", "UOL", "Folha", "Estadão", "CNN Brasil", "Band News"],
      youtube: ["TechChannel", "MusicVibe", "LifeHacks", "ReviewBR", "CookingPro", "GameZone"],
      tiktok: ["@viral_creator", "@dance_queen", "@comedy_king", "@life_hacks", "@beauty_tips", "@music_trends"],
      twitter: ["@tech_news", "@crypto_expert", "@political_talk", "@market_analysis", "@ai_researcher", "@breaking_br"],
      instagram: ["@influencer_style", "@fitness_guru", "@travel_lover", "@home_decor", "@art_digital", "@lifestyle_br"]
    };
    
    const platformAuthors = authors[platform as keyof typeof authors];
    if (!platformAuthors || platformAuthors.length === 0) {
      return "@creator";
    }
    return platformAuthors[Math.floor(Math.random() * platformAuthors.length)];
  };

  const getRandomTime = () => {
    const times = ["1 min", "5 min", "15 min", "30 min", "1h", "2h", "3h"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const getRandomStats = (platform: string) => {
    if (platform === "youtube") {
      return {
        views: Math.floor(Math.random() * 100000) + 1000,
        likes: Math.floor(Math.random() * 5000) + 100
      };
    } else if (platform === "instagram") {
      return {
        likes: Math.floor(Math.random() * 10000) + 500,
        comments: Math.floor(Math.random() * 500) + 10
      };
    } else {
      return {
        retweets: Math.floor(Math.random() * 1000) + 50,
        likes: Math.floor(Math.random() * 5000) + 100
      };
    }
  };

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newPosts = generateMockPosts(page + 1);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const initialPosts = generateMockPosts(1);
    setPosts(initialPosts);

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      loadMorePosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "noticias": return () => <div className="w-4 h-4 bg-current rounded-sm">📰</div>;
      case "youtube": return Youtube;
      case "tiktok": return () => <div className="w-4 h-4 bg-current rounded-sm"></div>;
      case "twitter": return TwitterX;
      case "instagram": return Instagram;
      default: return Youtube;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "noticias": return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "youtube": return "text-red-500 border-red-500/30 bg-red-500/10";
      case "tiktok": return "text-purple-500 border-purple-500/30 bg-purple-500/10";
      case "twitter": return "text-blue-500 border-blue-500/30 bg-blue-500/10";
      case "instagram": return "text-pink-500 border-pink-500/30 bg-pink-500/10";
      default: return "text-orange-500 border-orange-500/30 bg-orange-500/10";
    }
  };

  const getSectionId = (category: string) => {
    switch (category) {
      case "Últimas Notícias": return "noticias";
      case "YouTube": return "youtube";
      case "TikTok": return "tiktok";
      case "X (Twitter)": return "twitter";
      case "Instagram": return "instagram";
      default: return "";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const postsByCategory = posts.reduce((acc: { [key: string]: Post[] }, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});

  const categoryOrder = [
    "Últimas Notícias",
    "YouTube", 
    "TikTok",
    "X (Twitter)",
    "Instagram"
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {categoryOrder.map((category) => {
          const categoryPosts = postsByCategory[category];
          if (!categoryPosts || categoryPosts.length === 0) return null;
          
          return (
            <div key={category} id={getSectionId(category)} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">📱</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPosts.slice(0, 6).map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform);
                  return (
                    <article
                      key={post.id}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="w-4 h-4" />
                            <span className="text-xs font-medium capitalize">{post.platform}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 rounded-full text-xs text-gray-300">
                            <Clock className="w-3 h-3" />
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {post.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="font-medium">{post.author}</span>
                          <div className="flex items-center space-x-4">
                            {post.platform === "youtube" && post.stats.views && (
                              <>
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{formatNumber(post.stats.views)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{formatNumber(post.stats.likes)}</span>
                                </div>
                              </>
                            )}
                            {(post.platform === "instagram" || post.platform === "twitter" || post.platform === "tiktok" || post.platform === "noticias") && (
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{formatNumber(post.stats.likes)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando mais conteúdo...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentFeed;
