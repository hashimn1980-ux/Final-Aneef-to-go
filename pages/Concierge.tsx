import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';

interface ConciergeProps {
  language: Language;
}

const Concierge: React.FC<ConciergeProps> = ({ language }) => {
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mandate, setMandate] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Localization Content
  const content = {
    [Language.EN]: {
      titleLine1: "Application for",
      titleLine2: "Visual Audit",
      intro: "Membership is by invitation or application only. Please complete the mandate to initiate your dossier review.",
      secureLine: "Secure Line",
      hq: "Headquarters",
      bookingTitle: "Direct Scheduling",
      bookingBtn: "Book Consultation",
      address: <>EMMAR Square,<br/>Dubai Downtown,<br/>UAE</>,
      placeholders: {
        name: "Full Name",
        email: "Corporate Email",
        company: "Company Name",
        linkedin: "LinkedIn URL",
        mandate: "Select Mandate Type"
      },
      options: {
        audit: "Visual Audit",
        retainer: "Monthly Retainer",
        advisory: "Strategic Advisory"
      },
      submit: "Submit Mandate",
      successTitle: "Mandate Received.",
      successMsg: "The Directorate will review your profile within 48 hours. Secure communication channels will be established upon approval."
    },
    [Language.AR]: {
      titleLine1: "طلب",
      titleLine2: "التدقيق البصري",
      intro: "العضوية عن طريق الدعوة أو الطلب فقط. يرجى إكمال التفويض لبدء مراجعة ملفك.",
      secureLine: "الخط الآمن",
      hq: "المقر الرئيسي",
      bookingTitle: "حجز مباشر",
      bookingBtn: "احجز استشارة",
      address: <>إعمار سكوير،<br/>وسط مدينة دبي،<br/>الإمارات العربية المتحدة</>,
      placeholders: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني للعمل",
        company: "اسم الشركة",
        linkedin: "رابط لينكد إن",
        mandate: "اختر نوع التفويض"
      },
      options: {
        audit: "تدقيق بصري",
        retainer: "عقد شهري",
        advisory: "استشارات استراتيجية"
      },
      submit: "إرسال التفويض",
      successTitle: "تم استلام التفويض.",
      successMsg: "ستقوم الإدارة بمراجعة ملفك خلال 48 ساعة. سيتم إنشاء قنوات اتصال آمنة عند الموافقة."
    }
  };

  const txt = content[language];

  const mandateOptions = [
    { value: 'audit', label: txt.options.audit },
    { value: 'retainer', label: txt.options.retainer },
    { value: 'advisory', label: txt.options.advisory }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-navy min-h-screen pt-20 flex flex-col md:flex-row">
      
      {/* Left Column: Info */}
      <div className="w-full md:w-[40%] bg-navy p-12 md:p-24 flex flex-col justify-between border-r border-white/5">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight">
            {txt.titleLine1} <br/><span className="text-copper italic">{txt.titleLine2}</span>
          </h1>
          <p className="text-white/80 font-sans text-sm leading-relaxed max-w-sm">
            {txt.intro}
          </p>
        </div>

        <div className="mt-16 md:mt-0 space-y-12">
          
          {/* Booking Section - Added */}
          <div>
             <h4 className="text-copper text-xs uppercase tracking-widest mb-4">{txt.bookingTitle}</h4>
             <a 
               href="https://calendar.app.google/nT2hJMRdeYsfXVpu8" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block px-8 py-3 border border-copper text-copper hover:bg-copper hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-bold"
             >
               {txt.bookingBtn}
             </a>
          </div>

          <div>
            <h4 className="text-copper text-xs uppercase tracking-widest mb-2">{txt.secureLine}</h4>
            <p className="text-white font-serif">+971 58 935 3703</p>
          </div>
          <div>
            <h4 className="text-copper text-xs uppercase tracking-widest mb-2">{txt.hq}</h4>
            <p className="text-white/80 text-sm font-sans">
              {txt.address}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-[60%] bg-navy-light p-12 md:p-24 flex items-center justify-center relative">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-12">
            
            <div className="group">
              <input 
                type="text" 
                placeholder={txt.placeholders.name} 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
                required
              />
            </div>

            <div className="group">
              <input 
                type="email" 
                placeholder={txt.placeholders.email} 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
                required
              />
            </div>

            <div className="group">
              <input 
                type="text" 
                placeholder={txt.placeholders.company} 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
              />
            </div>

            <div className="group">
              <input 
                type="text" 
                placeholder={txt.placeholders.linkedin} 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
              />
            </div>

            {/* Custom Dropdown */}
            <div className="group relative" ref={dropdownRef}>
                <div 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white/60 cursor-pointer flex justify-between items-center"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span className={mandate ? 'text-white font-serif text-xl' : 'font-serif text-xl'}>
                        {mandate ? mandateOptions.find(o => o.value === mandate)?.label : txt.placeholders.mandate}
                    </span>
                    <span className={`material-symbols-outlined transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                </div>
                
                <div className={`absolute top-full left-0 w-full bg-navy border border-copper z-50 transition-all duration-300 origin-top ${dropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                    <ul className="flex flex-col">
                        {mandateOptions.map((opt) => (
                            <li 
                                key={opt.value}
                                className="px-6 py-4 hover:bg-copper/20 text-white font-serif cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                onClick={() => {
                                    setMandate(opt.value);
                                    setDropdownOpen(false);
                                }}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-6 border border-copper bg-transparent text-copper hover:bg-copper/20 hover:text-white transition-all duration-500 ease-out uppercase text-xs font-bold tracking-[0.3em] hover:tracking-[0.4em]"
            >
              {txt.submit}
            </button>

          </form>
        ) : (
          <div className="text-center animate-shine">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-gold-foil mb-8 relative">
              <span className="material-symbols-outlined text-6xl text-gold-foil">verified</span>
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-copper"></div>
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">{txt.successTitle}</h2>
            <p className="text-white/80 font-sans max-w-sm mx-auto leading-relaxed">
              {txt.successMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Concierge;