import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, SERVICES } from '../constants';
import { Reveal } from '../components/Reveal';
import { SmartCaptcha, SmartCaptchaHandle } from '../components/SmartCaptcha';

const Contact: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<SmartCaptchaHandle>(null);
  
  // UI State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Enhanced Form Validation Logic
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required.';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters.';
        break;
      case 'companyName':
        if (!value.trim()) error = 'Company name is required.';
        break;
      case 'email':
        if (!value.trim()) error = 'Business email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address.';
        break;
      case 'phone':
        // Optional but validated if present. Supports international formats.
        if (value.trim() && !/^\+?[0-9\s\-\(\)]{7,20}$/.test(value.trim())) {
          error = 'Please enter a valid phone number (e.g., +1 555-000-0000).';
        }
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required.';
        else if (value.trim().length < 10) error = 'Please provide more details (at least 10 characters).';
        break;
      case 'service':
        if (!value) error = 'Please select a service.';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    // Captcha Validation
    if (!captchaToken) {
        newErrors['captcha'] = "Please verify you are not a robot.";
    }

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0 && captchaToken) {
      setIsSubmitting(true);
      
      try {
        // Use AJAX submission to avoid redirection
        const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            // FormSubmit Configuration
            _subject: `New Inquiry: ${formData.fullName} - TechDefends`,
            _template: "box",
            _captcha: "false", // Disable FormSubmit's captcha as we handle it on client side
            
            // Map internal state keys to readable labels for the email
            "Full Name": formData.fullName,
            "Company": formData.companyName,
            "Email": formData.email,
            "Phone": formData.phone,
            "Service Interest": formData.service,
            "Message": formData.message,
            "Human Verified": "Yes",
            "Verification Token": captchaToken
          })
        });

        if (response.ok) {
          // Success Animation State
          setIsSubmitting(false);
          setIsSuccess(true);
          
          // Delay actual transition to show success state on button
          setTimeout(() => {
            setSubmitted(true);
            window.scrollTo(0, 0);
            setCaptchaToken(null);
            captchaRef.current?.reset();
            setIsSuccess(false);
          }, 1500);
        } else {
          setIsSubmitting(false);
          // If server responds with error
          const errorData = await response.json().catch(() => ({}));
          console.error("Submission failed:", errorData);
          alert("Something went wrong. Please try again later or contact us directly via phone.");
        }
      } catch (error) {
        setIsSubmitting(false);
        console.error("Network error:", error);
        alert("Unable to send message. Please check your internet connection.");
      }
    }
  };

  // Helper to get input class based on state
  const getInputClass = (fieldName: string) => {
    // Shared layout classes
    const layoutClass = "w-full px-4 py-3 rounded-lg border outline-none transition-all";
    
    // Error State
    if (touched[fieldName] && errors[fieldName]) {
      return `${layoutClass} border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50 text-red-900 placeholder-red-300`;
    }
    
    // Success State
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof typeof formData]) {
      return `${layoutClass} border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50 text-green-900`;
    }
    
    // Default State - Enforcing White Theme
    // Explicitly setting bg-white, slate text and placeholder to override any user agent defaults
    return `${layoutClass} bg-white border-slate-300 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500`;
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 relative">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-brand-900/5"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <Reveal>
             <h1 className="text-4xl font-extrabold mb-4">Contact TechDefends</h1>
           </Reveal>
           <Reveal delay={0.1}>
             <p className="text-lg text-slate-300 max-w-2xl mx-auto">
               Ready to secure your digital future? Reach out to our team of experts for a free consultation.
             </p>
           </Reveal>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
          
          {/* Contact Information */}
          <div>
            <Reveal delay={0.2}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                Whether you need urgent incident response, a vulnerability assessment, or a long-term managed security partner, we are here to help. Fill out the form, and we will get back to you within 24 hours.
              </p>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.3}>
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-100 p-3 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    <Phone size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                    <p className="text-slate-600">{COMPANY_PHONE}</p>
                    <p className="text-slate-400 text-sm">Mon-Fri 9am-6pm IST</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-100 p-3 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    <Mail size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Email</h3>
                    <p className="text-slate-600">{COMPANY_EMAIL}</p>
                    <p className="text-slate-400 text-sm">Online Support 24/7</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-100 p-3 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    <MapPin size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Headquarters</h3>
                    <p className="text-slate-600 w-2/3">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <div className="mt-12 bg-white p-6 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Need Urgent Help?</h3>
                <p className="text-slate-600 text-sm mb-4">
                  For active cyber attacks or data breaches, call our emergency hotline immediately.
                </p>
                <a href={`tel:${COMPANY_PHONE}`} className="inline-flex items-center text-brand-600 font-bold hover:underline hover:text-brand-700 transition-colors">
                  Call Emergency Line <Phone size={16} className="ml-2" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={0.3} className="h-full">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full">
              {submitted ? (
                <div className="text-center py-20 animate-fade-in" role="alert">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce-slow">
                    <CheckCircle size={40} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Message Sent!</h3>
                  <p className="text-slate-600">
                    Thank you for contacting TechDefends. One of our security consultants will reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        service: '',
                        message: ''
                      });
                      setErrors({});
                      setTouched({});
                    }}
                    className="mt-8 text-brand-600 font-semibold hover:text-brand-700 underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-6" 
                  noValidate
                >
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('fullName')}
                        placeholder="John Doe"
                      />
                      {touched.fullName && !errors.fullName && formData.fullName && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" size={18} />
                      )}
                      {touched.fullName && errors.fullName && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 pointer-events-none" size={18} />
                      )}
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p id="fullName-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.companyName}
                        aria-describedby={errors.companyName ? "companyName-error" : undefined}
                        value={formData.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('companyName')}
                        placeholder="Your Company Ltd"
                      />
                      {touched.companyName && !errors.companyName && formData.companyName && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" size={18} />
                      )}
                      {touched.companyName && errors.companyName && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 pointer-events-none" size={18} />
                      )}
                    </div>
                    {touched.companyName && errors.companyName && (
                      <p id="companyName-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.companyName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Business Email <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={getInputClass('email')}
                          placeholder="john@company.com"
                        />
                         {touched.email && !errors.email && formData.email && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" size={18} />
                        )}
                        {touched.email && errors.email && (
                          <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 pointer-events-none" size={18} />
                        )}
                      </div>
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.email}</p>
                      )}
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={getInputClass('phone')}
                          placeholder="+1 (555) 000-0000"
                        />
                        {touched.phone && !errors.phone && formData.phone && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" size={18} />
                        )}
                        {touched.phone && errors.phone && (
                          <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 pointer-events-none" size={18} />
                        )}
                      </div>
                      {touched.phone && errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                      Service Interested In <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? "service-error" : undefined}
                        value={formData.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('service')}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other / General Inquiry">Other / General Inquiry</option>
                      </select>
                    </div>
                    {touched.service && errors.service && (
                      <p id="service-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.service}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('message')}
                        placeholder="Tell us about your project or security needs..."
                      ></textarea>
                       {touched.message && !errors.message && formData.message && (
                          <CheckCircle className="absolute right-3 top-4 text-green-500 pointer-events-none" size={18} />
                        )}
                        {touched.message && errors.message && (
                          <AlertCircle className="absolute right-3 top-4 text-red-500 pointer-events-none" size={18} />
                        )}
                    </div>
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">{errors.message}</p>
                    )}
                  </div>

                  {/* Security Check - Replaced with SmartCaptcha */}
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-brand-600"/> Security Check
                    </label>
                    
                    <SmartCaptcha
                      ref={captchaRef}
                      onVerify={(token) => {
                         setCaptchaToken(token);
                         if (token) setErrors(prev => ({...prev, captcha: ''}));
                      }}
                    />

                    {errors.captcha && (
                      <p className="mt-1 text-xs text-red-600 font-medium animate-fade-in" role="alert">
                        {errors.captcha}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`w-full text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                      isSuccess 
                        ? 'bg-green-600 hover:bg-green-700 shadow-green-200 focus:ring-green-500' 
                        : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200 focus:ring-brand-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : isSuccess ? (
                      <>
                        Message Sent <CheckCircle size={20} className="animate-bounce-slow" />
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6 z-40" style={{ right: '6rem' }}>
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 animate-fade-in-up"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Contact;