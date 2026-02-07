import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { MOCK_NEWS, MOCK_NEWS_POOL } from '../constants';
import { Reveal } from '../components/Reveal';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Combine all news for lookup
  const allNews = [...MOCK_NEWS, ...MOCK_NEWS_POOL];
  const news = allNews.find(n => n.id === id);

  useEffect(() => {
    if (news) {
      document.title = `${news.title} - TechDefends News`;
      window.scrollTo(0, 0);
    }
  }, [news]);

  if (!news) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <Reveal>
             <Link to="/" className="inline-flex items-center gap-2 text-brand-400 hover:text-white transition-colors mb-6 text-sm font-semibold uppercase tracking-wider">
               <ArrowLeft size={16} /> Back to Home
             </Link>
           </Reveal>
           <Reveal delay={0.1}>
             <span className="px-3 py-1 bg-brand-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg mb-4 inline-block">
               {news.category}
             </span>
           </Reveal>
           <Reveal delay={0.2}>
             <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">{news.title}</h1>
           </Reveal>
           <Reveal delay={0.3}>
             <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-2"><User size={16} /> {news.author}</span>
                <span className="flex items-center gap-2"><Calendar size={16} /> {news.date}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {news.readTime}</span>
             </div>
           </Reveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal delay={0.4}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
             <img src={news.imageUrl} alt={news.title} className="w-full h-64 md:h-96 object-cover" />
             <div className="p-8 md:p-12">
               <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 font-medium">
                 {news.description}
               </p>
               <hr className="border-slate-100 my-8" />
               <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                 <p>
                   <strong>(Full Article Content Placeholder)</strong>
                 </p>
                 <p>
                   In a rapidly evolving digital landscape, staying ahead of cybersecurity threats is not just an option—it's a necessity. This article explores the recent findings regarding {news.title.toLowerCase()}. Our team at TechDefends has analyzed the vectors and potential impact on enterprise infrastructure.
                 </p>
                 <p>
                   Security researchers warn that without proper mitigation strategies, organizations remain vulnerable to these advanced persistent threats. The complexity of modern attacks requires a multi-layered defense approach, combining real-time monitoring, AI-driven threat detection, and rigorous employee training.
                 </p>
                 <p>
                   For more detailed technical analysis and remediation steps, please refer to the official advisories or contact our security operations center.
                 </p>
               </div>
               {news.sourceUrl && (
                 <div className="mt-8 pt-8 border-t border-slate-100">
                   <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:underline">
                     View original source <Share2 size={16} />
                   </a>
                 </div>
               )}
             </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default NewsDetail;