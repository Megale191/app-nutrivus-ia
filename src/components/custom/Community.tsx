'use client';

// Nutrivus.IA - Community Component (Functional Version)

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Users, Send, X, Image as ImageIcon } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  bio?: string;
}

interface Post {
  id: string;
  user_id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  category: string;
  liked?: boolean;
  user_profile?: UserProfile;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Usuário atual (simulado)
  const currentUser = {
    id: 'current-user',
    username: 'voce',
    display_name: 'Você',
    avatar: '😊'
  };

  // Carregar posts do localStorage ou usar dados iniciais
  useEffect(() => {
    const savedPosts = localStorage.getItem('nutrivus_community_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const initialPosts: Post[] = [
        {
          id: '1',
          user_id: 'user1',
          author: 'Maria Silva',
          avatar: '👩',
          time: '2h atrás',
          content: 'Completei meu primeiro mês de jejum intermitente! Perdi 4kg e me sinto incrível! 💪',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
          likes: 124,
          comments: 18,
          category: 'Jejum',
          liked: false
        },
        {
          id: '2',
          user_id: 'user2',
          author: 'Carlos Santos',
          avatar: '👨',
          time: '5h atrás',
          content: 'Receita incrível de smoothie proteico! 🥤 Banana, whey, aveia e pasta de amendoim. Perfeito pós-treino!',
          image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
          likes: 89,
          comments: 12,
          category: 'Receitas',
          liked: false
        },
        {
          id: '3',
          user_id: 'user3',
          author: 'Ana Costa',
          avatar: '👩‍🦰',
          time: '1d atrás',
          content: 'Sequência de 50 dias mantendo a meta de hidratação! A pele está muito melhor! 💧✨',
          likes: 156,
          comments: 24,
          category: 'Hidratação',
          liked: false
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('nutrivus_community_posts', JSON.stringify(initialPosts));
    }
  }, []);

  // Salvar posts no localStorage sempre que mudarem
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('nutrivus_community_posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Criar novo post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      user_id: currentUser.id,
      author: currentUser.display_name,
      avatar: currentUser.avatar,
      time: 'Agora',
      content: newPostContent,
      likes: 0,
      comments: 0,
      category: 'Geral',
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  // Toggle like
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Abrir comentários
  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
    
    // Carregar comentários do localStorage
    const savedComments = localStorage.getItem(`nutrivus_comments_${post.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Comentários de exemplo
      const exampleComments: Comment[] = [
        {
          id: '1',
          post_id: post.id,
          user_id: 'user4',
          author: 'Pedro Lima',
          avatar: '👨‍💼',
          content: 'Parabéns! Continue assim! 🎉',
          time: '1h atrás'
        },
        {
          id: '2',
          post_id: post.id,
          user_id: 'user5',
          author: 'Julia Mendes',
          avatar: '👩‍💻',
          content: 'Inspirador! Vou começar também!',
          time: '30min atrás'
        }
      ];
      setComments(exampleComments);
    }
  };

  // Adicionar comentário
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: Comment = {
      id: Date.now().toString(),
      post_id: selectedPost.id,
      user_id: currentUser.id,
      author: currentUser.display_name,
      avatar: currentUser.avatar,
      content: newComment,
      time: 'Agora'
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    
    // Salvar no localStorage
    localStorage.setItem(`nutrivus_comments_${selectedPost.id}`, JSON.stringify(updatedComments));
    
    // Atualizar contagem de comentários
    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));
    
    setNewComment('');
  };

  // Compartilhar post
  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: 'Nutrivus.IA - Comunidade',
        text: post.content,
        url: window.location.href
      });
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(`${post.content}\n\n- ${post.author} no Nutrivus.IA`);
      alert('Link copiado para a área de transferência!');
    }
  };

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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Comunidade</h1>
        <p className="text-gray-600 dark:text-white/60">Conecte-se, compartilhe e inspire-se</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center shadow-sm">
          <Users className="w-6 h-6 text-[#00FF00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5K</p>
          <p className="text-gray-600 dark:text-white/60 text-xs">Membros</p>
        </div>

        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center shadow-sm">
          <MessageCircle className="w-6 h-6 text-[#00BFFF] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
          <p className="text-gray-600 dark:text-white/60 text-xs">Posts</p>
        </div>

        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center shadow-sm">
          <TrendingUp className="w-6 h-6 text-[#00CC00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">892</p>
          <p className="text-gray-600 dark:text-white/60 text-xs">Ativos Agora</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Create Post */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center text-xl flex-shrink-0">
                {currentUser.avatar}
              </div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Compartilhe seu progresso..."
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none resize-none min-h-[80px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all">
                  <ImageIcon className="w-5 h-5 text-gray-600 dark:text-white/60" />
                </button>
              </div>
              <button 
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-6 py-2 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-gray-900 font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publicar
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:border-[#00FF00]/30 transition-all duration-300 shadow-sm"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center text-2xl">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{post.author}</p>
                    <p className="text-gray-600 dark:text-white/60 text-sm">{post.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full text-[#00FF00] text-xs font-medium">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-all ${
                    post.liked 
                      ? 'text-red-500' 
                      : 'text-gray-600 dark:text-white/60 hover:text-[#00FF00]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <button 
                  onClick={() => handleOpenComments(post)}
                  className="flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-[#00BFFF] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button 
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-[#00CC00] transition-all"
                >
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
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00FF00]" />
              Tópicos em Alta
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <div className="text-left">
                    <p className="text-gray-900 dark:text-white font-medium">#{topic.name}</p>
                    <p className="text-gray-600 dark:text-white/60 text-xs">{topic.posts} posts</p>
                  </div>
                  <span className="text-[#00FF00] text-xl">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sugestões para Seguir</h3>
            <div className="space-y-3">
              {['Pedro Lima', 'Julia Mendes', 'Rafael Costa'].map((name, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#0099CC] flex items-center justify-center">
                      {['👨‍💼', '👩‍💻', '👨‍🎓'][index]}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{name}</p>
                      <p className="text-gray-600 dark:text-white/60 text-xs">@{name.toLowerCase().replace(' ', '')}</p>
                    </div>
                  </div>
                  <button className="px-4 py-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-gray-900 text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all">
                    Seguir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-gray-200 dark:border-white/10">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Comentários</h3>
              <button 
                onClick={() => setShowComments(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-white/60" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#0099CC] flex items-center justify-center text-xl flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{comment.author}</p>
                      <p className="text-gray-700 dark:text-white/80 text-sm mt-1">{comment.content}</p>
                    </div>
                    <p className="text-gray-500 dark:text-white/40 text-xs mt-1 ml-3">{comment.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t border-gray-200 dark:border-white/10">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center text-xl flex-shrink-0">
                  {currentUser.avatar}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Adicione um comentário..."
                    className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-gray-900 font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
