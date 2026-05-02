import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Utensils, 
  Truck, 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowUp,
  Facebook,
  Instagram,
  ShoppingBag
} from 'lucide-react';

// --- Data ---
const MENU_ITEMS = [
  {
    category: "Signature Dishes",
    items: [
      { id: 1, name: "Ewa Agoyin + Agege Bread", desc: "Authentic spicy mashed beans served with fluffy Nigerian Agege bread.", price: "₦1,500", emoji: "🍞" },
      { id: 2, name: "Ewa Agoyin + Fried Plantain", desc: "Our signature mashed beans paired with sweet, golden dodo.", price: "₦2,000", emoji: "🍌" },
      { id: 3, name: "Ewa Agoyin + White Rice", desc: "Hearty mashed beans served with steamed white rice and extra sauce.", price: "₦2,500", emoji: "🍚" },
    ]
  },
  {
    category: "Extras / Sides",
    items: [
      { id: 4, name: "Extra Sauce", desc: "Our famous dark, spicy Agoyin pepper sauce.", price: "₦500", emoji: "🌶️" },
      { id: 5, name: "Fried Egg", desc: "A perfect addition to your Agoyin meal.", price: "₦400", emoji: "🍳" },
      { id: 6, name: "Soft Drink", desc: "Coke, Fanta, or Sprite.", price: "₦400", emoji: "🥤" },
    ]
  },
  {
    category: "Specials",
    items: [
      { id: 7, name: "Full Combo Plate", desc: "Ewa + Bread + Plantain + Drink. The ultimate meal.", price: "₦3,500", emoji: "✨" },
      { id: 8, name: "Family Pack", desc: "Feeds 4. Perfect for your home or office.", price: "₦8,000", emoji: "👨‍👩‍👧‍👦" },
    ]
  }
];

const REVIEWS = [
  { name: "Chidi", text: "The sauce is everything! Best Agoyin in Abule Egba by far.", date: "2 days ago" },
  { name: "Amaka", text: "I order every weekend. Delivery is fast and food is always hot.", date: "1 week ago" },
  { name: "Tunde", text: "Reminds me of home. The Agege bread is so fresh and soft.", date: "2 weeks ago" },
  { name: "Fatima", text: "Great service and even better food. Highly recommended!", date: "1 month ago" },
];

// --- Components ---

const SectionHeading = ({ children, title }: { children?: React.ReactNode, title: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{title}</h2>
    <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
    {children}
  </div>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);

      // Active link logic
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-primary');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* --- HEADER --- */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Utensils className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-serif text-text tracking-tight">
              Ewa Agoyin <span className="text-primary italic">Cafe</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {['Home', 'About', 'Menu', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="nav-link text-text hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={(e) => scrollToSection(e as any, 'menu')}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-secondary transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-text" onClick={toggleMenu}>
            {isMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bg md:hidden pt-24 px-6 flex flex-col gap-6"
          >
            {['Home', 'About', 'Menu', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="text-3xl font-serif font-semibold text-text"
              >
                {item}
              </a>
            ))}
            <button className="w-full bg-primary text-white py-4 rounded-xl text-xl font-bold mt-4">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
          <img 
            src="https://picsum.photos/seed/ewa-hero/1920/1080?blur=4" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 text-text px-4 py-2 rounded-full mb-6 font-medium border border-accent/20">
              <Star className="text-accent fill-accent w-4 h-4" />
              <span>4.6 Rating · 57 Reviews · ₦2,000–₦4,000</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
              Authentic Nigerian <br />
              <span className="text-primary italic">Flavors</span>
            </h1>
            <p className="text-xl md:text-2xl text-text/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Experience the rich taste of Ewa Agoyin — Lagos's favorite comfort food, made with love and traditional recipes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={(e) => scrollToSection(e as any, 'menu')}
                className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
              >
                View Menu
              </button>
              <button className="w-full sm:w-auto border-2 border-primary text-primary px-10 py-5 rounded-full text-lg font-bold hover:bg-primary/5 transition-all active:scale-95">
                Order Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Food Elements (Visual interest) */}
        <div className="absolute bottom-10 right-10 hidden lg:block animate-bounce-slow">
           <div className="bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="text-4xl">🍞</div>
              <div>
                <p className="font-bold">Agege Bread</p>
                <p className="text-xs text-text/60">Freshly Baked</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Our Story">
            <p className="text-lg text-text/70 max-w-2xl mx-auto">
              Ewa Agoyin Cafe is a beloved Lagos restaurant serving authentic Nigerian bean stew with Agege bread and other local delicacies. We believe in high-quality ingredients and the power of food to bring people together.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: <Utensils className="w-8 h-8" />, title: "Authentic Recipes", color: "bg-primary" },
              { icon: <Truck className="w-8 h-8" />, title: "Fast Delivery", color: "bg-secondary" },
              { icon: <Heart className="w-8 h-8" />, title: "Made with Love", color: "bg-accent" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-bg p-10 rounded-3xl text-center border border-text/5 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text/60">Using only the finest ingredients passed down through generations to ensure every bite is a memory.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Our Menu" />

          <div className="space-y-20">
            {MENU_ITEMS.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-3xl font-bold mb-10 text-text flex items-center gap-4">
                  <span className="w-12 h-1 bg-primary rounded-full"></span>
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-text/5"
                    >
                      <div className="h-48 bg-secondary/10 flex items-center justify-center text-6xl relative overflow-hidden group">
                        <span className="z-10 group-hover:scale-125 transition-transform duration-500">{item.emoji}</span>
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-bold text-text leading-tight">{item.name}</h4>
                          <span className="text-primary font-bold text-lg">{item.price}</span>
                        </div>
                        <p className="text-text/60 text-sm mb-8 leading-relaxed h-12 overflow-hidden">
                          {item.desc}
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 border-2 border-text/10 py-3 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all font-bold">
                          <ShoppingBag size={18} />
                          Add to Order
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="How We Serve You" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Utensils size={40} />, title: "Dine-In", text: "Enjoy your meal in our cozy Lagos restaurant." },
              { icon: <ShoppingBag size={40} />, title: "Takeaway", text: "Pick up your order fresh and hot." },
              { icon: <Truck size={40} />, title: "No-Contact Delivery", text: "Safe delivery right to your door." },
            ].map((service, idx) => (
              <div key={idx} className="flex gap-6 items-start p-8 rounded-3xl bg-bg border border-text/5">
                <div className="text-primary mt-1">{service.icon}</div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                  <p className="text-text/60">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-24 bg-primary text-white relative flex overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg italic leading-relaxed mb-8">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-primary">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold">{review.name}</h5>
                    <p className="text-xs text-white/60">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOCATION & CONTACT --- */}
      <section id="contact" className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Find Us" />

          <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 rounded-[40px] shadow-sm border border-text/5">
            <div className="p-6 md:p-10">
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Our Address</h4>
                    <p className="text-text/70 leading-relaxed">
                      36 Olayiwola St, Alimosho, <br />
                      Abule Egba 101232, Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Phone</h4>
                    <p className="text-text/70 text-lg font-medium">0908 000 0361</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Hours</h4>
                    <p className="text-text/70">Monday – Sunday, Open until 9 PM</p>
                    <p className="text-sm text-primary mt-1 font-medium">Currently Open</p>
                  </div>
                </div>

                <a 
                  href="https://maps.google.com/?q=36+Olayiwola+St+Alimosho+Abule+Egba+Lagos+Nigeria" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-primary transition-all active:scale-95"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="h-[500px] rounded-[30px] overflow-hidden bg-text/5 relative shadow-inner">
               <iframe 
                title="Ewa Agoyin Cafe Location"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.262590747123!2d3.29841!3d6.6146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9134bb4859a7%3A0xe2be10ef9ff069e2!2s36%20Olayiwola%20St%2C%20Abule%20Egba%20101232%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714650000000!5m2!1sen!2sng"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- ORDER / CTA SECTION --- */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-[50px] backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Taste the Best <br className="hidden md:block" /> Ewa Agoyin in Lagos?</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
              Call us or walk in — we're open every day until 9 PM. Freshly made sauce and steaming beans await you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="tel:09080000361" 
                className="w-full sm:w-auto bg-accent text-primary px-10 py-5 rounded-full text-xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl"
              >
                <Phone size={24} />
                Call Now → 0908 000 0361
              </a>
              <button 
                onClick={(e) => scrollToSection(e as any, 'contact')}
                className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all backdrop-blur-md"
              >
                Get Directions
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-text text-white py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Utensils className="text-primary w-8 h-8" />
                <span className="text-3xl font-bold font-serif tracking-tight">
                  Ewa Agoyin <span className="text-primary italic">Cafe</span>
                </span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm mb-8">
                Authentic Nigerian Taste, serving the finest comfort food in the heart of Lagos since 2018.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook size={20} />, href: "#" },
                  { icon: <Instagram size={20} />, href: "#" },
                  { icon: <WhatsAppIcon />, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-xl font-bold mb-8">Quick Links</h5>
              <ul className="space-y-4 text-white/50">
                {['Home', 'About', 'Menu', 'Reviews', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, item.toLowerCase())}
                      className="hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xl font-bold mb-8">Visit Us</h5>
              <div className="space-y-6 text-white/50 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <p>36 Olayiwola St, Alimosho, Abule Egba 101232, Lagos, Nigeria</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  <p>0908 000 0361</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p>&copy; 2025 Ewa Agoyin Cafe. <br />All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => scrollToSection(e as any, 'home')}
            className="fixed bottom-8 right-8 z-[60] bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-secondary transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
