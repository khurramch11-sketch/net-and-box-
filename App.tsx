import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, Monitor, Settings, Zap, Check, Phone, Mail, MapPin, X, ArrowRight, Star, Quote, Shield, Cpu, Globe, Layers } from 'lucide-react';

export default function App() {
  const [legalView, setLegalView] = useState<string | null>(null);
  const [blogView, setBlogView] = useState<number | null>(null);
  const [showCtaPopup, setShowCtaPopup] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowCtaPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeLegal = () => setLegalView(null);
  const closeBlog = () => setBlogView(null);

  return (
    <div id="website-root" className="min-h-screen bg-[#0a0a0a] font-sans text-white selection:bg-blue-500/30">
      <MarketingIntegrations />
      <Navigation />
      <Hero />
      <Portfolio />
      <TerritoryCheck />
      <ProcessSection />
      <CreativeServices />
      <AccountAnalysis />
      <Pricing />
      <About />
      <CreativeTestimonials />
      <TrustSection />
      <BlogSection onBlogClick={setBlogView} />
      <FAQ />
      <WriteForUsSection />
      <Contact />
      <Newsletter />
      <Footer onLegalClick={setLegalView} />

      <AnimatePresence>
        {legalView && (
          <LegalModal type={legalView} onClose={closeLegal} />
        )}
        {blogView !== null && (
          <BlogModal postId={blogView} onClose={closeBlog} />
        )}
        {showCtaPopup && (
          <FloatingCtaPopup onClose={() => setShowCtaPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MarketingIntegrations() {
  React.useEffect(() => {
    // 1. Google Search Console
    const metaEnv = (import.meta as any).env;
    const gscCode = metaEnv.VITE_GOOGLE_SEARCH_CONSOLE_CODE;
    if (gscCode && !document.querySelector('meta[name="google-site-verification"]')) {
      const meta = document.createElement('meta');
      meta.name = 'google-site-verification';
      meta.content = gscCode;
      document.head.appendChild(meta);
    }

    // 2. Google Analytics (gtag.js)
    const gaId = metaEnv.VITE_GOOGLE_ANALYTICS_ID;
    if (gaId && !(window as any).dataLayer) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(inlineScript);
    }

    // 3. Google Tag Manager
    const gtmId = metaEnv.VITE_GOOGLE_TAG_MANAGER_ID;
    if (gtmId && !document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, []);

  return null;
}

function FloatingCtaPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-[320px] bg-[#141414] border border-blue-500/50 rounded-xl shadow-2xl p-6 backdrop-blur-xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-blue-600 rounded flex items-center justify-center text-white">
          <Zap size={20} className="fill-current" />
        </div>
        <div>
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none mb-1">Live Support</div>
          <div className="text-sm font-bold text-white leading-none">Ready to Connect?</div>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 uppercase tracking-tighter mb-4 leading-relaxed">
        Verify service availability and explore representative plans in your area.
      </p>
      <div className="flex flex-col gap-3">
        <a 
          href="tel:8884092279"
          className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded text-xs font-black uppercase tracking-widest transition-all hover:bg-gray-200 active:scale-95 border border-white/10"
        >
          <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Tv size={8} className="fill-current" />
          </div>
          (888) 409-2279
        </a>
        <a 
          href="#contact"
          onClick={onClose}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/40 active:scale-95"
        >
          Check Availability
        </a>
      </div>
    </motion.div>
  );
}

function BlogModal({ postId, onClose }: { postId: number; onClose: () => void }) {
  const posts = [
    {
      title: "The Future of Fiber Optics in 2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&h=600&auto=format&fit=crop",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>The telecommunications landscape is undergoing a radical shift as fiber optic infrastructure becomes the gold standard for both residential and commercial connectivity. In 2026, the push for multi-gigabit speeds is no longer a luxury but a necessity for the modern digital economy.</p>
          
          <h4 class="text-white font-bold text-lg">Why Fiber Wins</h4>
          <p>Unlike traditional copper-based systems, fiber optics utilize light to transmit data, resulting in virtually zero signal degradation over long distances. This means symmetrical upload and download speeds, which are critical for high-definition video conferencing, cloud computing, and real-time gaming.</p>
 
          <h4 class="text-white font-bold text-lg">The Industry Advantage</h4>
          <p>As an Independent Telecommunications Reseller, Bill Payment Net And Box LLC is at the forefront of this rollout. We provide structured technical audits to ensure that the fiber infrastructure being brought to your doorstep is optimized for your specific hardware ecosystem.</p>
        </div>
      `
    },
    {
      title: "Maximizing Your Home Entertainment Setup",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&h=600&auto=format&fit=crop",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>Having a premium cable package is only half the battle. To truly experience cinema-quality entertainment at home, your hardware and signal distribution must be flawlessly synchronized.</p>
          
          <h4 class="text-white font-bold text-lg">Hardware Synchronization</h4>
          <p>Modern 4K UHD boxes require high-bandwidth HDMI interfaces and stable low-latency connections to prevent buffering or artifacts. Our technicians specialize in calibrating these devices to work harmoniously with your supported service lines.</p>
 
          <h4 class="text-white font-bold text-lg">Content Curation</h4>
          <p>We help families and businesses organize their channel lineups to prioritize the content that matters most—whether it's premium sports networks, international news, or 24/7 educational broadcasting.</p>
        </div>
      `
    },
    {
      title: "Why Cord-Cutting isn't the Only Answer",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1200&h=600&auto=format&fit=crop",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>The "Cord-Cutting" trend has dominated headlines, but many consumers are discovering that managing ten different streaming subscriptions can be more expensive and frustrating than a single, high-quality cable bundle.</p>
          
          <h4 class="text-white font-bold text-lg">The Hybrid Value Proposition</h4>
          <p>Many consumers in 2026 are finding value in hybrid models. By bundling broadband with a core cable package, you secure local news, live sports, and live events that streaming platforms often lack—all while keeping your monthly bill predictable.</p>
 
          <h4 class="text-white font-bold text-lg">Support Availability Information</h4>
          <p>Connectivity support depends on your local network's real-time environment. Cable TV provides a dedicated, managed signal path that ensures your viewing experience isn't interrupted by a neighbor's heavy download usage.</p>
        </div>
      `
    }
  ];

  const post = posts[postId];
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full max-w-4xl bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 md:h-80 shrink-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
          <button onClick={onClose} className="absolute top-6 right-6 h-10 w-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <X size={20} />
          </button>
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white">{post.title}</h3>
          </div>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto" dangerouslySetInnerHTML={{ __html: post.body }} />
        <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex justify-between items-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Bill Payment Net And Box LLC | Independent Telecommunications Reseller</div>
          <button onClick={onClose} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded hover:bg-blue-600 hover:text-white transition-all">Close Article</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProcessSection() {
  const steps = [
    { title: 'Check Coverage', desc: 'Verify service availability in your area.' },
    { title: 'Select Bundle', desc: 'Choose from available internet and connectivity options based on provider coverage in your area.' },
    { title: 'Support Coordination', desc: 'Installation support professionals provide coordination and setup assistance for your viewing ecosystem.' }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-[80px] font-black text-white/5 absolute -top-12 -left-4 pointer-events-none group-hover:text-blue-500/10 transition-colors">0{i+1}</div>
              <h4 className="text-xl font-bold mb-4 relative z-10">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/70 mb-6">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-8">The Professional <br /><span className="font-bold underline decoration-white/30">Standard</span> in Telecom</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              As an Independent Telecommunications Reseller, we help customers compare and set up available telecom service options through third-party providers. Our team provides the bridge between giant telecom infrastructure and your specific living or working space.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-[10px] font-black text-white/60 uppercase tracking-widest">Tech Ops</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Service availability depends on location</div>
                <div className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Connectivity Support</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { t: 'Secure Billing', d: 'Secure checkout and encrypted payment processing available.' },
              { t: 'Setup Assistance', d: 'Installation support professionals provide coordination and setup assistance.' },
              { t: 'Transparent Pricing', d: 'Transparent rate cards with primary provider accuracy.' },
              { t: 'Unified Support', d: 'One contact point for multiple provider management.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/20 transition-all">
                <h4 className="text-sm font-black uppercase text-white mb-3">{item.t}</h4>
                <p className="text-[10px] text-white/60 uppercase tracking-tighter leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalModal({ type, onClose }: { type: string; onClose: () => void }) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>Effective Date: January 01, 2026</p>
          <p>Bill Payment Net And Box LLC ("we", "us", or "our") is committed to protecting the privacy and security of our clients' and visitors' personal data. This Privacy Policy outlines our practices regarding data collection, usage, and disclosure in compliance with industry standards and legal requirements.</p>
          
          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">1. Information We Collect</h4>
            <p>We collect personal information necessary for the provision of telecom solutions, including but not limited to: contact details (name, email, phone), service addresses, and technical preferences. We also collect non-personal data through cookies and analytics to enhance our digital platform performance.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">2. Use of Information</h4>
            <p>Data is utilized primarily for service fulfillment, order processing, and account management. We may also use your contact information to provide critical service updates and professional industry insights, subject to your communication preferences and applicable opt-out rights.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">3. Data Security and Protection</h4>
            <p>We implement multi-layered security protocols to safeguard Personally Identifiable Information (PII) against prohibited access, alteration, or disclosure. All electronic data storage and transmissions are conducted within secured, industry-compliant environments.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">4. Third-Party Disclosures</h4>
            <p>We do not sell or trade your personal information. Data may be shared with approved service providers (e.g., telecom infrastructure partners) solely for the purpose of fulfilling your specific service requests or as required by law.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">5. Regulatory Compliance</h4>
            <p>We maintain strict adherence to the National Do Not Call Registry, TCPA guidelines, and state-specific privacy regulations including CCPA/GDPR frameworks where applicable.</p>
          </section>
        </div>
      `
    },
    terms: {
      title: "Terms of Service",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>By engaging with the digital platform or services of Bill Payment Net And Box LLC, you agree to the following legally binding Terms of Service.</p>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">1. Professional Scope</h4>
            <p>Bill Payment Net And Box LLC operates as an Independent Telecommunications Reseller and technical consultant for various telecommunications and infrastructure providers. Our role is limited to consultation, technical audits, and service facilitation.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">2. Intellectual Property</h4>
            <p>All content, trademarks, and technological assets on this platform remain the exclusive property of Bill Payment Net And Box LLC or its respective licensors. Unapproved reproduction or utilization is strictly prohibited.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">3. User Responsibilities</h4>
            <p>Users agree to provide accurate information for service verification and to use all provided telecom infrastructures in compliance with local, state, and federal laws.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">4. Limitation of Liability</h4>
            <p>Bill Payment Net And Box LLC shall not be held liable for indirect, incidental, or consequential damages arising from the use of third-party service provider networks or equipment. Our liability is strictly limited to the professional consultancy services provided directly by our firm.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">5. Agreement Modifications</h4>
            <p>We reserve the right to modify these terms at our discretion. Continued use of our platform after such modifications constitutes acceptance of the updated terms.</p>
          </section>
        </div>
      `
    },
    refund: {
      title: "Refund & Cancellation Policy",
      body: `
        <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>Bill Payment Net And Box LLC maintains a transparent and professional approach to fees and service cancellations.</p>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">1. Consultation and Setup Fees</h4>
            <p>All initial consultation, technical audit, and administrative setup fees are considered fully earned once the service engagement has commenced. These fees are non-refundable as they cover direct professional labor and administrative deployment costs.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">2. Third-Party Provider Subscriptions</h4>
            <p>Billing, cancellations, and refund requests related to actual telecom subscriptions (e.g., Internet, Cable TV Packages) are managed directly by the respective service provider. Bill Payment Net And Box LLC serves as a facilitator and will assist clients in navigating these provider-specific policies.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">3. Service Termination</h4>
            <p>Clients may terminate their engagement with Bill Payment Net And Box LLC at any time. However, such termination does not entitle the client to a refund of previously rendered professional services or setup costs.</p>
          </section>

          <section>
            <h4 class="text-white font-bold uppercase tracking-wider mb-2">4. Dispute Resolution</h4>
            <p>We encourage clients to contact our professional support team directly to resolve any concerns or billing inquiries prior to initiating external disputes or chargeback processes.</p>
          </section>
        </div>
      `
    }
  }[type as keyof typeof content];

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-[#141414] border border-white/10 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 p-6 bg-[#1a1a1a]">
          <h3 className="text-xl font-light tracking-tight">{content.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div 
          className="p-8 max-h-[70vh] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
        <div className="border-t border-white/5 p-6 bg-[#0a0a0a] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded hover:bg-blue-500 hover:text-white transition-all"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navigation() {
  return (
    <nav id="main-nav" className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 text-white shadow-lg shadow-blue-900/40">
            <Tv size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none uppercase">
              Net And Box <span className="text-blue-500">LLC</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mt-1">
              Connectivity Solutions Company
            </span>
          </div>
        </div>
        <div className="hidden gap-8 md:flex">
          {['Services', 'Packages', 'About', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              id={`nav-link-${item.toLowerCase()}`}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          id="nav-cta"
          href="tel:8884092279"
          className="rounded bg-white px-5 py-2 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-blue-500 hover:text-white active:scale-95"
        >
          (888) 409-2279
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase mb-6">
              Independent Telecommunications Reseller
            </div>
            <h1 className="text-5xl font-light leading-[1.1] tracking-tight text-white md:text-7xl mb-6">
              Telecommunications <br />
              <span className="text-blue-500 italic-serif-header">& Connectivity Solutions</span>
            </h1>
            <p className="text-sm text-gray-400 md:text-base leading-relaxed mb-8 max-w-xl">
              We help customers compare and set up internet, TV, and connectivity services through third-party providers. Bill Payment Net And Box LLC provides equipment support and installation assistance for residential and business customers in eligible service areas.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                id="hero-availability-cta"
                href="#contact"
                className="rounded bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-900/40 active:scale-95"
              >
                Check Availability
              </a>
              <a
                id="hero-primary-cta"
                href="#packages"
                className="rounded bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-gray-200"
              >
                Explore Rate Bundles
              </a>
              <a
                id="hero-secondary-cta"
                href="tel:8884092279"
                className="rounded border border-white/10 bg-[#141414] px-8 py-4 text-xs font-black uppercase tracking-widest transition-all hover:border-white/30"
              >
                Consult a Specialist
              </a>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Transparent Service Information</span>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <span>Secure checkout and encrypted payment processing</span>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <span>Customer Support Available</span>
            </div>
          </motion.div>
          
          <motion.div
            id="hero-image-container"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#141414] shadow-2xl">
              <img
                src="https://picsum.photos/seed/cinema-ultra-hd/1200/800"
                alt="Professional TV setup"
                className="h-full w-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 border border-white/10 rounded bg-[#1a1a1a] p-6 text-white shadow-xl hidden md:block backdrop-blur-md">
              <div className="text-sm font-light text-blue-500 mb-1 uppercase tracking-tight">Service availability depends on location</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Connectivity Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    { 
      title: 'MDU Infrastructure', 
      location: 'Riverside, CA',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1545258122-47400ccafe6d?q=80&w=800&h=600&auto=format&fit=crop',
      desc: 'Complete technical audit and fiber line deployment for a multi-dwelling unit (MDU) complex.'
    },
    { 
      title: 'Corporate HQ Sync', 
      location: 'Moreno Valley, CA',
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop',
      desc: 'Unified broadband synchronization across 40+ workstations with high-capacity signal routing.'
    },
    { 
      title: 'Smart Home Hub', 
      location: 'Corona, CA',
      category: 'Modern Living',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&h=600&auto=format&fit=crop',
      desc: 'Integration of 4K entertainment ecosystem with smart security and high-speed fiber backbone.'
    },
    { 
      title: 'Retail Connectivity', 
      location: 'Fullerton, CA',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&h=600&auto=format&fit=crop',
      desc: 'Managed retail network implementation providing stable POS and customer Wi-Fi infrastructure.'
    }
  ];

  return (
    <section id="portfolio" className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4 font-sans">The Portfolio</h2>
            <h3 className="text-3xl font-light tracking-tight md:text-5xl uppercase">Technical <span className="italic-serif-header">Deployments</span></h3>
          </div>
          <div className="max-w-md text-[10px] text-gray-500 uppercase tracking-widest font-black leading-relaxed">
            Showcasing a selection of coordinated service implementations and technical audits across the California territory.
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-[#141414] border border-white/10"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image}
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-3 py-1 rounded tracking-[0.2em]">{project.category}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.location}</span>
                </div>
                <h4 className="text-2xl font-light tracking-tight text-white mb-2">{project.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativeServices() {
  const services = [
    {
      title: 'Broadband Infrastructure',
      icon: <Globe size={24} />,
      desc: 'Deployment of high-capacity data lines with structured technical analysis and location-based coverage verification.',
      size: 'large',
      color: 'bg-blue-600/10 text-blue-500'
    },
    {
      title: 'Entertainment Hubs',
      icon: <Tv size={24} />,
      desc: 'Expert coordination for premium 4K UHD cable packages and hardware synchronization for cinema-quality output.',
      size: 'small',
      color: 'bg-white/5 text-white'
    },
    {
      title: 'Hardware Optimization',
      icon: <Cpu size={24} />,
      desc: 'Strategic calibration of receivers, modems, and routers to ensure maximum throughput and minimal signal artifacts.',
      size: 'small',
      color: 'bg-white/5 text-white'
    },
    {
      title: 'Service Audits',
      icon: <Shield size={24} />,
      desc: 'Comprehensive account reviews to identify performance bottlenecks and align service levels with real-world requirements.',
      size: 'medium',
      color: 'bg-white/5 text-white'
    },
    {
      title: 'Unified Support',
      icon: <Layers size={24} />,
      desc: '24/7 technical assistance providing a single point of professional contact for multi-provider ecosystems.',
      size: 'medium',
      color: 'bg-blue-600 shadow-lg shadow-blue-900/40 text-white'
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Professional Scope</h2>
          <h3 className="text-3xl font-light tracking-tight md:text-5xl uppercase">Creative <span className="italic-serif-header">Telecom Services</span></h3>
        </div>
        
        <div className="grid md:grid-cols-6 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group p-8 rounded-2xl border border-white/5 bg-[#141414] hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between ${
                s.size === 'large' ? 'md:col-span-4 md:row-span-2' : 
                s.size === 'medium' ? 'md:col-span-3' : 'md:col-span-2'
              }`}
            >
              <div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${s.color}`}>
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight uppercase group-hover:text-blue-500 transition-colors">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-medium">
                  {s.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                Learn More <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativeTestimonials() {
  const testimonials = [
    {
      name: 'Dr. Michael Chen',
      role: 'Property Owner, MDU Complex',
      text: "Net & Box LLC transformed our building's connectivity. Their technical audit identified signal bottlenecks we didn't know existed. Flawless execution.",
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=mc'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Creative Director',
      text: "As a remote creative, downtime is not an option. Their team coordinated a high-speed fiber setup that has been rock solid for a year. Highly recommend.",
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=sj'
    },
    {
      name: 'Robert Rodriguez',
      role: 'Business Operations Manager',
      text: "Managed our multi-line office setup with extreme professionalism. They took care of the hardware sync and provider coordination seamlessly.",
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=rr'
    }
  ];

  return (
    <section className="py-24 bg-[#141414] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Quote size={400} className="absolute -top-20 -left-20 rotate-12" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6 underline decoration-blue-500/30 underline-offset-8">Client Success</h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight uppercase">Trusted by <span className="italic-serif-header">Modern Industry</span></h3>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-700"
            >
              <div className="absolute top-8 right-10 text-white/5 group-hover:text-blue-500/10 transition-colors">
                <Quote size={60} />
              </div>
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed italic mb-10 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <img src={t.avatar} className="h-12 w-12 rounded-full border-2 border-white/10 group-hover:border-blue-500 transition-colors" alt={t.name} />
                <div>
                  <div className="text-sm font-bold uppercase tracking-tight text-white">{t.name}</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mt-1">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 border border-white/10 rounded-full">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-[#141414] bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-[#141414] bg-blue-600 flex items-center justify-center text-[8px] font-black">+500</div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Technical excellence verified by enterprise clients nationwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountAnalysis() {
  const strategies = [
    { 
      t: 'Plan Review Expertise', 
      d: 'We help customers review available service plans and understand provider options based on their needs.' 
    },
    { 
      t: 'Optimization Support', 
      d: 'We provide guidance on device synchronization and hardware setup for stable signal support.' 
    },
    { 
      t: 'Provider Agreements', 
      d: 'Every account adjustment is performed within the official framework of provider service agreements and location-based availability.' 
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&h=800&auto=format&fit=crop" 
                alt="Financial billing optimization" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            </div>
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6 font-sans">Professional Consultation</h2>
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-8">Expert Account <span className="italic-serif-header">Management</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Managing complex telecom billing requires specialized industry knowledge. As Industry Experts, we provide comprehensive account analysis to identify redundancies and streamline your services.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-10">
              By reviewing available service plans and evaluating current market options, we advise our customers on official methods to maintain service efficiency that align with provider policies.
            </p>
            
            <div className="space-y-6">
              {strategies.map((s, i) => (
                <div key={i} className="flex gap-6 p-6 bg-[#141414] border border-white/5 rounded-lg hover:border-blue-500/30 transition-colors">
                  <div className="h-10 w-10 shrink-0 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded font-sans font-black text-xs">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white mb-2 tracking-widest">{s.t}</h4>
                    <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="mt-12 group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:text-blue-500 transition-colors">
              Request a Professional Review <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [activeTab, setActiveTab] = React.useState('Spectrum');

  const providerData: Record<string, any> = {
    'Spectrum': {
      tag: 'Broadband & Mobile',
      rates: [
        { name: 'Standard Internet', price: '$80' },
        { name: 'Ultra Internet', price: '$110' },
        { name: 'Gigabit Internet', price: '$180' },
        { name: 'Mobile Plan', price: '$70' },
        { name: 'TV Select Plan', price: '$20' }
      ]
    },
    'Mobility Services': {
      tag: 'Portable Internet Solutions',
      rates: [
        { name: 'Unlimited Starter (1GB)', price: '$45' },
        { name: 'Unlimited Plus (5GB)', price: '$55' },
        { name: 'Unlimited Pro (10GB)', price: '$60' },
        { name: 'Unlimited Ultra (15GB)', price: '$63' }
      ]
    },
    'Xfinity': {
      tag: 'Comcast Cable',
      rates: [
        { name: 'Blast! Internet', price: '$50' },
        { name: 'Performance Pro', price: '$30' },
        { name: 'Premier TV Package', price: '$65' },
        { name: 'Preferred Plus TV', price: '$55' }
      ]
    },
    'AT&T & DTV': {
      tag: 'U-Verse & DirectTV',
      rates: [
        { name: 'U200 TV Package', price: '$65' },
        { name: 'AT&T Uverse TV', price: '$130' },
        { name: 'Internet (25-99 MB)', price: '$150' },
        { name: 'Internet (100 MB+)', price: '$100' },
        { name: 'DTV Premium', price: '$140' }
      ]
    },
    'Vivint': {
      tag: 'Smart Home Security',
      rates: [
        { name: 'Starter Kit Plan', price: '$1799' },
        { name: 'Monthly Monitoring', price: '$19.99+' },
        { name: 'Smart Home Video', price: '$44.99' },
        { name: 'Security Complete', price: '$69.99' }
      ]
    },
    'Verizon': {
      tag: 'Fios & 5G Home',
      rates: [
        { name: 'Fios 300 Mbps', price: '$49.99' },
        { name: 'Fios 500 Mbps', price: '$69.99' },
        { name: 'Fios 1 Gig', price: '$89.99' },
        { name: '5G Home Internet', price: '$35' },
        { name: 'Unlimited Welcome', price: '$65' }
      ]
    },
    'Frontier': {
      tag: 'Fiber Optic',
      rates: [
        { name: 'FiberOptic 500M', price: '$70' },
        { name: 'FiberOptic 1G', price: '$90' },
        { name: 'Video Services', price: '$18' },
        { name: 'Unlimited Voice', price: '$75' }
      ]
    }
  };

  const otherProviders = [
    'Buckeye', 'CenturyLink', 'COX', 'Hughesnet', 'Mediacom', 'Metronet', 
    'Astound', 'Rise', 'SmithVille', 'Bend', 'Hawaiian Telecom', 'Ziply', 
    'TDS', 'Windstream', 'WOW', 'Altice', 'Viasat'
  ];

  return (
    <section id="packages" className="py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Representative service plans</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h3 className="text-3xl font-light tracking-tight md:text-5xl">Provider Rate Explorer</h3>
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest border border-white/10 px-3 py-1 rounded">
              Representative service plans
            </div>
          </div>
          <p className="mt-6 text-[10px] text-gray-500 italic uppercase tracking-widest leading-relaxed max-w-2xl">
            Plans shown are for informational purposes and may vary by provider and location.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 px-2">Major Providers</div>
            {Object.keys(providerData).map(name => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`w-full text-left px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === name 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {name}
              </button>
            ))}
            <div className="pt-8 text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 px-2">Other Partners</div>
            <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {otherProviders.map(p => (
                <div key={p} className="text-[10px] text-gray-500 py-1 px-2 border border-transparent">
                  • {p}
                </div>
              ))}
            </div>
            <div className="mt-8 text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed px-2 font-medium">
              Pricing and availability are subject to third-party provider terms and may vary by location. All plans are subject to provider availability and eligibility requirements.
            </div>
          </div>

          <div className="lg:col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#141414] border border-white/10 rounded-lg p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 opacity-5 -mr-20 -mt-20">
                <Tv size={300} />
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-blue-600"></div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
                    {providerData[activeTab].tag}
                  </div>
                </div>
                
                <h4 className="text-4xl font-light mb-12">{activeTab} <span className="italic-serif-header">Offerings</span></h4>
                
                <div className="grid gap-4">
                  {providerData[activeTab].rates.map((rate: any, i: number) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between py-4 border-b border-white/5 group hover:border-blue-500/30 transition-colors"
                    >
                      <div className="text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">
                        {rate.name}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-light text-blue-500">{rate.price}</div>
                        <div className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-gray-500">MONTHLY</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0a] p-8 rounded border border-white/5">
                  <div>
                    <div className="text-xs font-black uppercase text-white mb-1">Custom Configuration?</div>
                    <p className="text-xs text-gray-500 uppercase tracking-tighter">We assist with specific account consultations and setup requirements.</p>
                  </div>
                  <a
                    href="tel:8884092279"
                    className="whitespace-nowrap px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded"
                  >
                    Get Expert Quote
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#141414] border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6 font-sans">Strategic Partnership</h2>
            <h3 className="text-3xl font-light tracking-tight md:text-5xl mb-8">Telecommunications <span className="italic-serif-header">Reseller</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Bill Payment Net And Box LLC serves as an Independent Telecommunications Reseller. We help customers compare and set up available telecom service options through third-party providers.
            </p>
            <p className="text-sm text-gray-500 italic mb-10">
              "As an Independent Telecommunications Reseller, we aim to ensure every user understands their options and can manage their viewing experience effectively."
            </p>
            
            <div className="grid gap-4 grid-cols-2 text-right md:text-left">
              {[
                { label: 'Independent', val: 'RESELLER' },
                { label: 'Location-dependent availability', val: 'SUPPORT' },
                { label: 'Setup Assistance', val: 'COORDINATED' },
                { label: 'Regional Support', val: 'AVAILABLE' },
              ].map((stat, idx) => (
                <div key={stat.label} className="border border-white/5 bg-[#0a0a0a] p-6 rounded transition-colors hover:border-blue-500/30">
                  <div className="text-2xl font-light text-blue-500 mb-1">{stat.val}</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=800&auto=format&fit=crop" 
                alt="Service Coverage Across Multiple Regions" 
                className="w-full h-full object-cover opacity-70"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-[10px] uppercase tracking-tighter text-center leading-none p-4 shadow-2xl animate-pulse">
              Independent Telecommunications Reseller
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TerritoryCheck() {
  return (
    <section className="py-20 bg-[#1a1a1a] border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-blue-600 rounded-lg p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative">
          <div className="absolute right-0 top-0 opacity-10 -mr-10 -mt-10 pointer-events-none">
            <Monitor size={300} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/70 mb-4">Regional Availability</h3>
            <h4 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">Serviceable in <span className="font-bold underline decoration-white/30">Your Area</span></h4>
            <p className="text-white/80 text-sm md:text-base leading-relaxed uppercase font-medium tracking-tight">
              As an Independent Telecommunications Reseller, we help customers compare and set up available telecom service options through third-party providers. Connect with us to verify local provider availability in your specific area.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a 
              href="#contact" 
              className="bg-white text-black px-10 py-5 rounded text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl"
            >
              Verify My ZIP Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection({ onBlogClick }: { onBlogClick: (id: number) => void }) {
  const posts = [
    {
      title: "The Future of Fiber Optics in 2026",
      excerpt: "Explore how multi-gigabit fiber infrastructure is shaping residential and commercial connectivity across the US.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=600&auto=format&fit=crop"
    },
    {
      title: "Maximizing Your Home Entertainment Setup",
      excerpt: "An expert audit on combining 4K hardware with premium supported cable packages for the ultimate cinema experience.",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&h=600&auto=format&fit=crop"
    },
    {
      title: "Why Cord-Cutting isn't the Only Answer",
      excerpt: "Analyzing the value proposition of hybrid cable-streaming bundles vs. standalone internet subscriptions in the current market.",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&h=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Telecom Insights</h2>
          <h3 className="text-3xl font-light tracking-tight md:text-5xl">Industry <span className="italic-serif-header">Knowledge Base</span></h3>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onBlogClick(i)}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 border border-white/10">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-500 transition-colors uppercase tracking-tight leading-tight">{post.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-tighter">{post.excerpt}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-blue-500 transition-colors">
                Read Full Insight <Zap size={12} className="fill-current" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WriteForUsSection() {
  return (
    <section id="write-for-us" className="py-24 bg-[#141414] border-y border-white/5 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 opacity-5 -ml-20 -mb-20 pointer-events-none">
        <Monitor size={400} />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="max-w-3xl">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Expert Contributions</h2>
          <h3 className="text-3xl font-light tracking-tight md:text-4xl mb-8">Write For <span className="italic-serif-header">Bill Payment Net And Box LLC</span></h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-10">
            Are you a telecommunications expert, tech enthusiast, or industry analyst? We are seeking high-quality guest contributions focused on cable technology, connectivity solutions, and smart home innovations. Join our network of professional voices and reach our engaged audience.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {[
              { t: 'Strategic Reach', d: 'Connect with a growing audience of telecom consumers.' },
              { t: 'Domain Authority', d: 'Build your profile as a recognized expert.' },
              { t: 'Brand Exposure', d: 'Showcase your insights on our professional platform.' },
              { t: 'Network Growth', d: 'Join the Reseller community ecosystem.' }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-black uppercase text-white mb-1">{benefit.t}</div>
                  <p className="text-[10px] text-gray-500 uppercase">{benefit.d}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="#contact" 
            className="inline-block bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded"
          >
            Submit Proposal
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do I start a new Service connection?", a: "Begin by selecting your preferred provider from our rate explorer. Installation support professionals will handle the infrastructure setup coordination and hardware synchronization." },
    { q: "What cable providers are available in Riverside, CA?", a: "We support major providers including Spectrum, Xfinity, COX, and Frontier, alongside portable internet solutions." },
    { q: "Can I bundle high-speed internet with my TV package?", a: "Yes, we specialize in optimized bundles that combine broadband or fiber options with premium 4K UHD cable packages for maximum savings." },
    { q: "What is the benefit of using an Independent Telecommunications Reseller?", a: "Independent Telecommunications Resellers like Bill Payment Net And Box LLC provide personalized technical audits, local support, and assistance comparing available service plans and options." }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Support & FAQ</h2>
          <h3 className="text-3xl font-light tracking-tight md:text-5xl">Common Inquiries</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 border border-white/5 bg-[#141414] rounded-lg">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 text-blue-500">{faq.q}</h4>
              <p className="text-xs text-gray-500 leading-relaxed uppercase">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Contact</h2>
            <h3 className="text-4xl font-light tracking-tight mb-8">Get Assistance</h3>
            <div className="space-y-10">
              <div className="group">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Voice Assistance</div>
                <a href="tel:8884092279" className="text-2xl font-light hover:text-blue-500 transition-colors">(888) 409-2279</a>
              </div>
              <div className="group">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Electronic Mail</div>
                <a href="mailto:netpayllc5@gmail.com" className="text-xl font-light hover:text-blue-500 transition-colors lowercase">netpayllc5@gmail.com</a>
              </div>
              <div className="group">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Central Location</div>
                <address className="text-sm font-light text-gray-400 not-italic leading-relaxed">
                  6769 Palm Ct #139, <br />
                  Riverside, CA 92506, US
                </address>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#141414] border border-white/10 p-10 rounded-lg">
            <form id="contact-form" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                  <input id="name" type="text" className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-4 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all rounded" placeholder="Required" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                  <input id="email" type="email" className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-4 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all rounded" placeholder="Required" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Select Service Inquiry</label>
                <div className="grid grid-cols-2 gap-3">
                  {['New Setup', 'Upgrades', 'Channels', 'Support'].map(opt => (
                    <button key={opt} type="button" className="py-3 px-4 border border-white/5 bg-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-blue-500 hover:text-white rounded">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Message Context</label>
                <textarea id="message" rows={4} className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-4 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all rounded resize-none" placeholder="Provide details..."></textarea>
              </div>
              <button id="submit-button" type="submit" className="w-full bg-white py-5 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-blue-500 hover:text-white rounded">
                Transmit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-white mb-2">Join Our Professional Network</h3>
            <p className="text-white/70 text-xs uppercase font-black tracking-widest">Get representative service plans, service updates, and technical insights weekly.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR@PROFESSIONAL.EMAIL" 
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-xs font-black uppercase text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-black px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ onLegalClick }: { onLegalClick: (type: string) => void }) {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#0a0a0a] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white shadow-lg shadow-blue-900/40">
                <Tv size={18} />
              </div>
              <span className="text-sm font-bold tracking-tighter uppercase">
                Bill Payment Net And Box <span className="text-blue-500">LLC</span>
              </span>
            </div>
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
              Equipment & Installation Support
            </p>
            <p className="text-[11px] font-medium leading-relaxed uppercase tracking-tighter text-gray-500 mb-6">
              Independent Telecommunications Reseller serving our customers with dedication. Committed to technical excellence in broadband and TV connectivity solutions.
            </p>
          </div>
          
          <div>
            <p className="text-[10px] text-gray-600 uppercase mb-4 font-black">Resources</p>
            <nav className="flex flex-col gap-3">
              <button onClick={() => onLegalClick('privacy')} className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors text-left font-sans font-bold">Privacy Policy</button>
              <button onClick={() => onLegalClick('terms')} className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors text-left font-sans font-bold">Terms of Service</button>
              <button onClick={() => onLegalClick('refund')} className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors text-left font-sans font-bold">Refund Policy</button>
              <a href="#write-for-us" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors">Write For Us</a>
            </nav>
          </div>

          <div>
            <p className="text-[10px] text-gray-600 uppercase mb-4 font-black">Support Channels</p>
            <nav className="flex flex-col gap-3">
              <a href="#contact" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors">Technical Helpdesk</a>
              <a href="#blog" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors">Insights Center</a>
              <a href="#packages" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors">Rate Explorer</a>
            </nav>
          </div>

          <div>
            <p className="text-[10px] text-gray-600 uppercase mb-4 font-black">Headquarters</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-gray-400">
                <MapPin size={14} className="text-blue-500" /> Riverside, California
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-gray-400">
                <Mail size={14} className="text-blue-500" /> netpayllc5@gmail.com
              </div>
              <div className="bg-white/5 p-4 rounded border border-white/5">
                <div className="text-[9px] font-black uppercase text-blue-500 mb-1">Business Hours</div>
                <div className="text-[10px] font-bold uppercase text-white">Mon - Sat: 05:00 AM - 01:00 PM PT</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-6">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
            © {new Date().getFullYear()} Bill Payment Net And Box LLC. Independent Telecommunications Reseller.
          </div>

        </div>
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-[9px] text-gray-600 uppercase tracking-tighter leading-relaxed">
            DISCLAIMER: Bill Payment Net And Box LLC is an independent telecommunications reseller. We do not own or operate any telecom networks and are not affiliated with providers except as a reseller or referral partner. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
