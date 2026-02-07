import React, { useState, useRef, useEffect } from 'react';
import { Share2, RefreshCw, Linkedin, Facebook, Twitter, Link as LinkIcon, X, Clock, Calendar, ChevronDown, ChevronUp, Check, ExternalLink, ImageOff, Send } from 'lucide-react';
import { NewsItem, MOCK_NEWS_POOL } from '../constants';

interface NewsCardProps {
  item: NewsItem;
  index: number;
  initiallyExpanded?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item: initialItem, index, initiallyExpanded = false }) => {
  const [news, setNews] = useState(initialItem);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initiallyExpanded) {
      setIsExpanded(true);
    }
  }, [initiallyExpanded]);

  // Reset image error when news changes
  useEffect(() => {
    setImgError(false);
  }, [news.imageUrl]);

  // Entrance Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Fetch New Article (Mock)
  const handleFetchNews = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter news based on date (only last 6 months)
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    // Pick random news from pool excluding current and enforcing date filter
    const availableNews = MOCK_NEWS_POOL.filter(n => {
      const isDifferent = n.id !== news.id;
      const newsDate = new Date(n.date);
      const isRecent = newsDate >= sixMonthsAgo && newsDate <= now;
      return isDifferent && isRecent;
    });

    const randomNews = availableNews[Math.floor(Math.random() * availableNews.length)];
    
    if (randomNews) {
      setNews(randomNews);
      setIsExpanded(false); // Reset expansion on new content
    }
    
    setIsLoading(false);
  };

  // Share Handlers
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareOpen(!isShareOpen);
    setCopyStatus('idle');
  };

  // Construct unique URL for this news item using query param and hash
  // Format: base_url/#/?news_id=123
  const baseUrl = window.location.href.split('?')[0].split('#')[0];
  const shareUrl = `${baseUrl}#/?news_id=${news.id}`;
  const shareTextContent = `${news.title}`;

  const copyToClipboard = async () => {
    const fullShareText = `${shareTextContent} ${shareUrl}`;
    
    if (!navigator?.clipboard) {
      console.warn("Clipboard API not available");
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2500);
      return;
    }

    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  const shareToSocial = (platform: 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram') => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareTextContent);
    let socialUrl = '';

    switch (platform) {
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        // LinkedIn typically uses just the url parameter for share-offsite
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        socialUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'telegram':
        socialUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
    }
    
    // Open in a new popup window with specific dimensions
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      socialUrl, 
      `share_${platform}`, 
      `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
    );
    
    setIsShareOpen(false);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-700 ease-spring transform flex flex-col h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container with Parallax & Fallback */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute inset-0 block cursor-pointer z-10 w-full h-full focus:outline-none"
          aria-label={isExpanded ? "Collapse article" : "Expand article"}
        ></button>

        {!imgError ? (
          <img 
            src={news.imageUrl}
            alt={news.title}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110"
            style={{
              transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.1)`
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <ImageOff className="text-slate-600" size={32} />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1 bg-brand-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
            {news.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
           <button 
             onClick={handleFetchNews}
             className={`p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all ${isLoading ? 'animate-spin' : ''}`}
             title="Load new article"
           >
             <RefreshCw size={16} />
           </button>
           <div className="relative">
             <button 
               onClick={handleShareClick}
               className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all"
               title="Share"
             >
               <Share2 size={16} />
             </button>
             
             {/* Share Modal */}
             {isShareOpen && (
               <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50 animate-fade-in-up origin-top-right">
                 <div className="flex justify-between items-center mb-3 px-1 border-b border-slate-100 pb-2">
                   <span className="text-xs font-bold text-slate-500 uppercase">Share Article</span>
                   <button onClick={() => setIsShareOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={14}/></button>
                 </div>
                 
                 {/* Pre-filled Input */}
                 <div className="mb-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
                   <p className="text-xs text-slate-500 font-semibold mb-1">Link Preview:</p>
                   <div className="text-xs text-slate-700 line-clamp-1 italic leading-relaxed break-all">
                     {shareUrl}
                   </div>
                 </div>

                 <div className="space-y-3">
                   <button onClick={copyToClipboard} className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 text-sm transition-colors border border-slate-200/50">
                     <span className="flex items-center gap-2">
                       <LinkIcon size={14} /> 
                       {copyStatus === 'copied' ? 'Copied Link' : copyStatus === 'error' ? 'Copy Failed' : 'Copy Link'}
                     </span>
                     {copyStatus === 'copied' && <Check size={14} className="text-green-500" />}
                     {copyStatus === 'error' && <X size={14} className="text-red-500" />}
                   </button>
                   
                   <div className="grid grid-cols-5 gap-2">
                    <button onClick={() => shareToSocial('whatsapp')} className="flex flex-col items-center justify-center p-2 hover:bg-green-50 rounded-lg text-slate-600 hover:text-green-600 transition-colors" title="Share on WhatsApp">
                      {/* WhatsApp Logo */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </button>
                    <button onClick={() => shareToSocial('twitter')} className="flex flex-col items-center justify-center p-2 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-black transition-colors" title="Share on X (Twitter)">
                      {/* X Logo */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button onClick={() => shareToSocial('linkedin')} className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded-lg text-slate-600 hover:text-blue-700 transition-colors" title="Share on LinkedIn">
                      <Linkedin size={18} />
                    </button>
                    <button onClick={() => shareToSocial('facebook')} className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded-lg text-slate-600 hover:text-blue-600 transition-colors" title="Share on Facebook">
                      <Facebook size={18} />
                    </button>
                    <button onClick={() => shareToSocial('telegram')} className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded-lg text-slate-600 hover:text-blue-400 transition-colors" title="Share on Telegram">
                      <Send size={18} />
                    </button>
                   </div>
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative bg-white transition-transform duration-300 ease-spring group-hover:scale-[1.01] origin-center z-10">
        <div className="flex items-center gap-4 text-slate-400 text-xs mb-3 font-medium">
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {news.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {news.readTime}</span>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="block text-left group-hover:text-brand-600 transition-colors"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
            {news.title}
          </h3>
        </button>
        
        <div className="relative mb-4 flex-grow">
          <p className={`text-slate-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {news.description}
          </p>
        </div>

        {/* Expanded Content Extras */}
        {isExpanded && news.sourceUrl && (
          <div className="mb-4 animate-fade-in">
             <a 
               href={news.sourceUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline decoration-2 underline-offset-2 transition-all"
             >
               View Original Source <ExternalLink size={12} />
             </a>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">By {news.author}</span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-brand-600 text-sm font-bold hover:text-brand-700 transition-colors flex items-center gap-1 group/btn"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" /></>
            ) : (
              <>Read More <ChevronDown size={16} className="group-hover/btn:translate-y-0.5 transition-transform" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;