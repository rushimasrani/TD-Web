import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Dynamic styles based on scroll and menu state
  const navBackground = isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent';
  const navPadding = isScrolled ? 'py-2' : 'py-5';
  
  const textColor = isScrolled || isOpen ? 'text-slate-700' : 'text-white/90';
  const hoverColor = isScrolled || isOpen ? 'hover:text-brand-600' : 'hover:text-white';
  
  const logoMainColor = isScrolled || isOpen ? 'text-slate-900' : 'text-white';
  const logoSubColor = isScrolled || isOpen ? 'text-slate-500' : 'text-slate-300';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${navBackground} ${navPadding}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Logo size={40} />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold leading-none transition-colors duration-300 ${logoMainColor}`}>
                Tech<span className="text-brand-600">Defends</span>
              </span>
              <span className={`text-[0.55rem] sm:text-[0.65rem] font-medium tracking-widest uppercase mt-1 transition-colors duration-300 ${logoSubColor}`}>
                Secure Today, Scale Tomorrow
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Home</Link>
            <Link to="/about" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>About Us</Link>
            
            <div className="relative group">
              <button className={`font-medium text-sm flex items-center gap-1 transition-colors duration-300 py-2 ${textColor} ${hoverColor}`}>
                Services <ChevronDown size={14} />
              </button>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top p-6 grid grid-cols-2 gap-4">
                 {/* Arrow */}
                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-100"></div>
                 
                 {SERVICES.map((service) => (
                   <Link 
                    key={service.id} 
                    to={`/services/${service.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors relative z-10"
                   >
                     <service.icon className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                     <div>
                       <h4 className="text-sm font-semibold text-slate-900">{service.title}</h4>
                       <p className="text-xs text-slate-500 line-clamp-1">{service.shortDescription}</p>
                     </div>
                   </Link>
                 ))}
              </div>
            </div>

            <Link to="/careers" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Careers</Link>

            <Link to="/contact" className="px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/20 transform hover:-translate-y-0.5">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 transition-colors duration-300 ${textColor} ${hoverColor}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 h-screen overflow-y-auto pb-32 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link to="/" className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">Home</Link>
            <Link to="/about" className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">About Us</Link>
            
            <div className="space-y-1">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md"
              >
                Services <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div className="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/careers" className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">Careers</Link>

            <Link to="/contact" className="block mt-4 px-3 py-3 text-center text-base font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md shadow-md">
              Get Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;