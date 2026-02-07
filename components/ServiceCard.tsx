import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServiceCardProps {
  service: ServiceCategory;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <Link 
      to={`/services/${service.id}`}
      className="group bg-white rounded-xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transform-gpu transition-all duration-500 ease-spring flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-spring"></div>
      
      <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500 ease-spring group-hover:scale-110 transform">
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors duration-300">
        {service.title}
      </h3>
      
      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow group-hover:text-slate-700 transition-colors duration-300">
        {service.shortDescription}
      </p>
      
      <div className="flex items-center text-brand-600 font-semibold text-sm mt-auto group-hover:tracking-wide transition-all duration-300">
        Learn More <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300 ease-spring" />
      </div>
    </Link>
  );
};

export default ServiceCard;