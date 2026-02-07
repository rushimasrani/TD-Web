import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { COMPANY_NAME, COMPANY_EMAIL } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Transparency about how we collect, use, and protect your data is core to our mission.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <Reveal delay={0.2}>
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-8 text-brand-600 border-b border-slate-100 pb-6">
               <Shield size={24} />
               <span className="font-bold text-sm uppercase tracking-wide">Data Protection & Privacy</span>
            </div>
            
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-brand-500" /> Introduction
                </h2>
                <p>
                  At {COMPANY_NAME}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lock size={20} className="text-brand-500" /> Information We Collect
                </h2>
                <p className="mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                  <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of Your Information</h2>
                <p className="mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage your account.</li>
                  <li>Email you regarding your account or order.</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                  <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                  <li>Increase the efficiency and operation of the Site.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                  <li>Protect against fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                <p>
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2 font-semibold text-brand-600">
                  {COMPANY_EMAIL}
                </p>
              </section>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400 italic text-center">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default PrivacyPolicy;