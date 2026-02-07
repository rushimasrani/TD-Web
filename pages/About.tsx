import React from 'react';
import { Target, Eye, Award, Users, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

const About: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80')] bg-cover bg-center opacity-20 animate-pulse-slow"></div>
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <Reveal>
             <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About TechDefends</h1>
           </Reveal>
           <Reveal delay={0.1}>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               We are a cybersecurity-first technology partner, dedicated to building trust in the digital age.
             </p>
           </Reveal>
         </div>
      </div>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="relative" delay={0.2}>
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="TechDefends Team" 
                  className="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-600 rounded-lg -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-slate-200 rounded-lg -z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></div>
              </div>
            </Reveal>
            
            <div>
              <Reveal>
                <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Who We Are</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Securing the Future of Enterprise</h3>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    TechDefends is a premier cybersecurity consultancy and managed IT services provider. We were founded on the belief that security should be an enabler of business growth, not a bottleneck.
                  </p>
                  <p>
                    With a team of certified ethical hackers, security architects, and cloud engineers, we bring enterprise-grade protection to businesses of all sizes. Our approach combines offensive intelligence with defensive depth.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="mt-8">
                  <Link to="/contact" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors group">
                    Join our journey <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-500 h-full">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <Eye size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To become a globally trusted cybersecurity and managed IT partner, safeguarding digital assets and enabling secure growth for organizations worldwide.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-500 h-full">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-brand-500 rounded-full flex-shrink-0" />
                    Deliver world-class cybersecurity services.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-brand-500 rounded-full flex-shrink-0" />
                    Reduce cyber risks through proactive measures.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-brand-500 rounded-full flex-shrink-0" />
                    Enable secure cloud transformation.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-brand-500 rounded-full flex-shrink-0" />
                    Build long-term trust with transparency.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden flex-grow">
         {/* Background decoration */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-10 left-10 w-64 h-64 bg-brand-900 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="text-brand-500 font-bold tracking-wide uppercase text-sm mb-3">Core Values</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="text-3xl md:text-4xl font-extrabold">What Drives Us</h3>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Reveal delay={0.2}>
                 <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors duration-300 h-full hover:-translate-y-2 ease-spring">
                   <Lock className="text-brand-500 mb-4" size={32} />
                   <h4 className="text-xl font-bold mb-3">Integrity First</h4>
                   <p className="text-slate-400">We operate with absolute transparency and ethical standards in every engagement.</p>
                 </div>
               </Reveal>
               <Reveal delay={0.3}>
                 <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors duration-300 h-full hover:-translate-y-2 ease-spring">
                   <Award className="text-brand-500 mb-4" size={32} />
                   <h4 className="text-xl font-bold mb-3">Excellence</h4>
                   <p className="text-slate-400">We strive for perfection in our code, our audits, and our client service.</p>
                 </div>
               </Reveal>
               <Reveal delay={0.4}>
                 <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors duration-300 h-full hover:-translate-y-2 ease-spring">
                   <Users className="text-brand-500 mb-4" size={32} />
                   <h4 className="text-xl font-bold mb-3">Partnership</h4>
                   <p className="text-slate-400">We don't just work for you; we work with you as an extension of your team.</p>
                 </div>
               </Reveal>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;