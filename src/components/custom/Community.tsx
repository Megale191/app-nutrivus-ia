'use client';

// Nutrivus.IA - Community Component

import { Heart, MessageCircle, Share2, TrendingUp, Users } from 'lucide-react';

export default function Community() {
  const posts = [
    {
      id: 1,
      author: 'Maria Silva',
      avatar: '👩',
      time: '2h atrás',
      content: 'Completei meu primeiro mês de jejum intermitente! Perdi 4kg e me sinto incrível! 💪',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      likes: 124,
      comments: 18,
      category: 'Jejum'
    },
    {
      id: 2,
      author: 'Carlos Santos',
      avatar: '👨',
      time: '5h atrás',
      content: 'Receita incrível de smoothie proteico! 🥤 Banana, whey, aveia e pasta de amendoim. Perfeito pós-treino!',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
      likes: 89,
      comments: 12,
      category: 'Receitas'
    },
    {
      id: 3,
      author: 'Ana Costa',
      avatar: '👩‍🦰',
      time: '1d atrás',
      content: 'Sequência de 50 dias mantendo a meta de hidratação! A pele está muito melhor! 💧✨',
      likes: 156,
      comments: 24,
      category: 'Hidratação'
    }
  ];

  const trendingTopics = [
    { name: 'Jejum Intermitente', posts: 1234 },
    { name: 'Receitas Saudáveis', posts: 892 },
    { name: 'Low Carb', posts: 756 },
    { name: 'Proteína', posts: 645 },
    { name: 'Hidratação', posts: 523 }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Comunidade</h1>
        <p className="text-white/60">Conecte-se, compartilhe e inspire-se</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <Users className="w-6 h-6 text-[#00FF00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">12.5K</p>
          <p className="text-white/60 text-xs">Membros</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <MessageCircle className="w-6 h-6 text-[#00BFFF] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">3.2K</p>
          <p className="text-white/60 text-xs">Posts Hoje</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <TrendingUp className="w-6 h-6 text-[#00CC00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">892</p>
          <p className="text-white/60 text-xs">Ativos Agora</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <textarea
              placeholder="Compartilhe seu progresso..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                  📷
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                  🎥
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                  😊
                </button>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300">
                Publicar
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#00FF00]/30 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center text-2xl">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-white/60 text-sm">{post.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full text-[#00FF00] text-xs">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-white mb-4">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
                <button className="flex items-center gap-2 text-white/60 hover:text-[#00FF00] transition-all">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-white/60 hover:text-[#00BFFF] transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-white/60 hover:text-[#00CC00] transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00FF00]" />
              Tópicos em Alta
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <div className="text-left">
                    <p className="text-white font-medium">#{topic.name}</p>
                    <p className="text-white/60 text-xs">{topic.posts} posts</p>
                  </div>
                  <span className="text-[#00FF00] text-xl">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Sugestões para Seguir</h3>
            <div className="space-y-3">
              {['Pedro Lima', 'Julia Mendes', 'Rafael Costa'].map((name, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#0099CC] flex items-center justify-center">
                      {['👨‍💼', '👩‍💻', '👨‍🎓'][index]}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{name}</p>
                      <p className="text-white/60 text-xs">@{name.toLowerCase().replace(' ', '')}</p>
                    </div>
                  </div>
                  <button className="px-4 py-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all">
                    Seguir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
