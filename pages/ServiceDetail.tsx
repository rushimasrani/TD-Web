import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Reveal } from '../components/Reveal';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.id === slug);

  useEffect(() => {
    if (service) {
      // Dynamic Title
      document.title = `${service.title} - TechDefends Services`;

      // Dynamic Meta Description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', service.shortDescription);
    }

    // Cleanup to reset title when leaving the page
    return () => {
      document.title = "TechDefends - Premium Cybersecurity Services";
    };
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
             <Reveal>
               <div className="p-4 bg-brand-600 rounded-xl shadow-lg shadow-brand-900/50">
                 <Icon size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Services
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-3xl md:text-5xl font-extrabold">{service.title}</h1>
               </Reveal>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <Reveal delay={0.3}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Overview</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>
            </Reveal>

            {/* Sub Services */}
            <section>
              <Reveal delay={0.1}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Capabilities</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.subServices.map((sub, index) => (
                  <Reveal key={index} delay={0.1 + (index * 0.1)}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all h-full hover:-translate-y-1 duration-300">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{sub.title}</h3>
                      <p className="text-slate-500 text-sm">{sub.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <Reveal delay={0.2}>
              <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
                <h2 className="text-2xl font-bold mb-6 relative z-10">Key Benefits</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact CTA */}
            <Reveal delay={0.4}>
              <div className="bg-brand-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-500 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Need {service.title}?</h3>
                <p className="text-brand-100 mb-6 relative z-10">
                  Get a customized quote for your organization. Our experts are ready to help.
                </p>
                <Link to="/contact" className="block w-full py-3 bg-white text-brand-700 font-bold text-center rounded-lg hover:bg-slate-100 transition-all shadow-md hover:shadow-xl relative z-10 hover:-translate-y-1">
                  Get a Quote
                </Link>
              </div>
            </Reveal>

            {/* Other Services Navigation */}
            <Reveal delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Other Services</h3>
                <ul className="space-y-2">
                  {SERVICES.filter(s => s.id !== service.id).map(s => (
                    <li key={s.id}>
                      <Link 
                        to={`/services/${s.id}`} 
                        className="flex items-center justify-between text-slate-600 hover:text-brand-600 hover:bg-slate-50 p-2 rounded-md transition-all text-sm font-medium group"
                      >
                        {s.title}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;