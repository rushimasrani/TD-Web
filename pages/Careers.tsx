import React from 'react';
import { Briefcase, MapPin, Clock, IndianRupee, Heart, Zap, Coffee, Globe, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

const JOB_OPENINGS = [
  {
    id: 1,
    title: 'Business Development Executive (BDE)',
    department: 'Sales',
    location: 'Ahmedabad, Gujarat (On-site)',
    type: 'Full-time',
    salary: '₹3,00,000 - ₹5,00,000 PA + Incentives',
    tags: ['Sales', 'Lead Gen', 'Client Acquisition']
  },
  {
    id: 2,
    title: 'Senior Sales Executive',
    department: 'Sales',
    location: 'Ahmedabad, Gujarat (On-site)',
    type: 'Full-time',
    salary: '₹5,00,000 - ₹8,00,000 PA + Commission',
    tags: ['B2B', 'Negotiation', 'Closing']
  },
  {
    id: 3,
    title: 'Senior Penetration Tester',
    department: 'Offensive Security',
    location: 'Ahmedabad, Gujarat (On-site)',
    type: 'Full-time',
    salary: '₹12,00,000 - ₹18,00,000 PA',
    tags: ['OSCP', 'Python', 'Red Teaming']
  },
  {
    id: 4,
    title: 'SOC Analyst (Level 2)',
    department: 'Defensive Security',
    location: 'Ahmedabad, Gujarat (Hybrid)',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹10,00,000 PA',
    tags: ['SIEM', 'Incident Response', 'Blue Teaming']
  }
];

const PERKS = [
  { icon: Building2, title: 'Hybrid & On-site', desc: 'Collaborate in our modern Ahmedabad office. We believe in face-to-face innovation with hybrid flexibility.' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance coverage for you and your family members.' },
  { icon: Zap, title: 'Continuous Learning', desc: 'Annual learning allowance for certifications (CEH, OSCP), conferences, and courses.' },
  { icon: Coffee, title: 'Flexible PTO', desc: 'Take the time you need to recharge. We believe in work-life balance.' },
];

const Careers: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-900/50 border border-brand-700/50 rounded-full text-brand-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              We're Hiring in Ahmedabad
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Defend the <span className="text-brand-500">Future</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Join a team of elite ethical hackers, engineers, and sales leaders building the next generation of cybersecurity solutions.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#openings" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-lg hover:-translate-y-1">
              View Open Positions <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Culture/Perks Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Life at TechDefends</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-3xl font-extrabold text-slate-900">More Than Just a Job</h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PERKS.map((perk, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                    <perk.icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h4>
                  <p className="text-slate-600 text-sm">{perk.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">Current Openings</h2>
          </Reveal>

          <div className="space-y-4">
            {JOB_OPENINGS.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full border border-brand-100">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                      <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.salary}</span>
                    </div>

                    <div className="flex gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to="/contact" 
                    className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-12 bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Don't see the right fit?</h4>
              <p className="text-slate-600 mb-6">
                We are always looking for exceptional talent. Send us your resume and tell us how you can help.
              </p>
              <Link to="/contact" className="text-brand-600 font-bold hover:text-brand-700 underline decoration-2 underline-offset-4">
                Contact our HR team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Careers;