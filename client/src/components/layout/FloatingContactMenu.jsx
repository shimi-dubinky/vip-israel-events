import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// --- אייקונים ---
const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const WhatsAppIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.6C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 20.13C10.56 20.13 9.11 19.74 7.85 19L7.54 18.82L4.44 19.65L5.28 16.63L5.09 16.31C4.24 14.96 3.82 13.46 3.82 11.91C3.82 7.36 7.52 3.66 12.04 3.66C14.28 3.66 16.33 4.54 17.89 6.11C19.45 7.67 20.33 9.72 20.33 11.91C20.33 16.46 16.56 20.13 12.04 20.13M16.56 14.47C16.33 14.36 15.1 13.78 14.89 13.7C14.68 13.62 14.53 13.58 14.38 13.81C14.23 14.04 13.78 14.59 13.64 14.74C13.5 14.89 13.35 14.91 13.12 14.8C12.89 14.69 11.94 14.35 10.83 13.38C10.03 12.67 9.53 11.82 9.42 11.61C9.3 11.4 9.44 11.28 9.56 11.16C9.67 11.04 9.81 10.85 9.93 10.71C10.05 10.57 10.1 10.46 10.18 10.3C10.26 10.14 10.21 10 10.14 9.89C10.07 9.79 9.61 8.64 9.42 8.19C9.23 7.74 9.04 7.79 8.91 7.78H8.4C8.27 7.78 8.05 7.84 7.85 8.04C7.65 8.24 7.15 8.71 7.15 9.81C7.15 10.91 7.88 11.99 8 12.11C8.12 12.23 9.62 14.59 11.97 15.54C12.87 15.93 13.53 16.11 14.02 16.27C14.75 16.5 15.34 16.45 15.82 16.1C16.36 15.71 16.79 15.12 16.98 14.8C17.17 14.48 16.98 14.24 16.79 14.12C16.79 14.12 16.79 14.12 16.56 14.47Z"></path></svg> );
const PhoneIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg> );
const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> );


const FloatingContactMenu = () => {

  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "972587554578";
  const email = "7686266@gmail.com";
  const whatsappMessage = "שלום, הגעתי דרך האתר ואשמח לקבל פרטים נוספים.";
  
  const links = [
    { type: 'whatsapp', Icon: WhatsAppIcon, href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}` },
    { type: 'phone', Icon: PhoneIcon, href: `tel:${phoneNumber}` },
    { type: 'mail', Icon: MailIcon, href: `mailto:${email}` },
  ];

  const itemVariants = {
    closed: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
    open: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 15, delay: i * 0.05 },
    }),
  };
  
  const positions = [
    { y: -70, x: 0 },
    { y: -50, x: -50 },
    { y: 0, x: -70 },
  ];

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div>
            {links.map((link, i) => (
              <motion.a
                key={link.type}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-12 h-12 bg-slate-700 hover:bg-gold-base text-white rounded-full flex items-center justify-center shadow-lg"
                style={{ top: '4px', right: '4px' }}
                variants={itemVariants}
                initial="closed"
                animate={{
                    y: positions[i].y,
                    x: i18n.dir() === 'rtl' ? positions[i].x : -positions[i].x,
                    opacity: 1,
                    scale: 1,
                }}
                exit="closed"
                custom={i}
              >
                <link.Icon />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-gold-base text-primary rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
        aria-label="Open contact menu"
      >
        <ChatIcon />
      </button>
    </div>
  );
};

export default FloatingContactMenu;