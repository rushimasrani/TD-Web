import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, SERVICES } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Logo size={40} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-none text-white">
                  Tech<span className="text-brand-500">Defends</span>
                </span>
                <span className="text-[0.55rem] sm:text-[0.65rem] font-medium tracking-widest uppercase mt-1 text-slate-400 group-hover:text-brand-400 transition-colors">
                  Secure Today, Scale Tomorrow
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Global leader in cybersecurity and managed IT services. We protect your digital assets so you can focus on growth.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors bg-slate-800 p-2 rounded-full">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors bg-slate-800 p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors bg-slate-800 p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors bg-slate-800 p-2 rounded-full">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-900 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">Request Consultation</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-900 pb-2 inline-block">Core Services</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map(service => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`} className="text-slate-400 hover:text-brand-500 text-sm transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-900 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-slate-400 text-sm">{COMPANY_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-500 flex-shrink-0" size={18} />
                <span className="text-slate-400 text-sm">{COMPANY_PHONE}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-500 flex-shrink-0" size={18} />
                <span className="text-slate-400 text-sm">{COMPANY_EMAIL}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} TechDefends. All rights reserved. 
            <span className="hidden sm:inline"> | Designed for Excellence.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;