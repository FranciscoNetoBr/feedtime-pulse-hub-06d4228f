import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Eye, Youtube, Instagram, X as TwitterX } from "lucide-react";

// Define types for the content feed
type Platform = "all" | "news" | "youtube" | "instagram" | "twitter" | "tiktok";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  platform: Platform;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

// Helper function to generate mock data
const generateMockPosts = (count: number): Post[] => {
  const platforms: Platform[] = ["news", "youtube", "instagram", "twitter", "tiktok"];
  const posts: Post[] = [];

  for (let i = 0; i < count; i++) {
    const platform = platforms[i % platforms.length];
    posts.push({
      id: i + 1,
      title: `Post ${i + 1} - ${platform}`,
      content: `This is a mock post from ${platform}.`,
      imageUrl: `https://source.unsplash.com/800x450/?${platform},${i}`,
      platform: platform,
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 1000),
    });
  }

  return posts;
};

const ContentFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<Platform>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts from an API
    const mockPosts = generateMockPosts(30);
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  const categories: { id: Platform; name: string; icon?: any }[] = [
    { id: "all", name: "Todas" },
    { id: "news", name: "Últimas Notícias" },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "tiktok", name: "TikTok" },
    { id: "twitter", name: "X (Twitter)", icon: TwitterX },
    { id: "instagram", name: "Instagram", icon: Instagram },
  ];

  const filteredPosts = activeCategory === "all"
    ? posts
    : posts.filter(post => post.platform === activeCategory);

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section: Últimas Notícias */}
        <div id="noticias" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Últimas Notícias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.platform === "news").slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Section: YouTube */}
        <div id="youtube" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            YouTube
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.platform === "youtube").slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Section: TikTok */}
        <div id="tiktok" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            TikTok
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.platform === "tiktok").slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Section: X (Twitter) */}
        <div id="twitter" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            X (Twitter)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.platform === "twitter").slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Section: Instagram */}
        <div id="instagram" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Instagram
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.platform === "instagram").slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-gray-800">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-white">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{post.content.substring(0, 100)}...</p>
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>{post.shares}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFeed;
