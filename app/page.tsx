"use client";
  import { useEffect, useState, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Space_Grotesk } from "next/font/google";
  import Image from "next/image";

  const spaceGrotesk = Space_Grotesk({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
  });

  const sections = [
    { id: "intro", title: "Intro" },
    { id: "about", title: "About" }
  ];

  type AudienceType = 'anyone' | 'recruiters';

  const audienceContent = {
    anyone: {
      title: "For Anyone",
      description: (
        <>
          Hi there! I'm a designer & economist creating data-driven solutions to turn everyday problems into real-world wins. Currently based in NYC.
        </>
      ),
      skills: []
    },
    recruiters: {
      title: "Recruiters",
      description: (
        <>
          I excel at meticulous and rapid full-cycle product development. A sponge for knowledge, I am always open to impactful opportunities.
        </>
      ),
      skills: [
        <a href="/Ethan Yuen - Resume.pdf" download className="hover:text-[#fefeff] transition-colors underline">
          Download Resume
        </a>,
        <a href="https://www.linkedin.com/in/ethan-yuen/" target="_blank" rel="noopener noreferrer" className="text-[#969696] hover:text-[#fefeff] transition-colors underline">
          LinkedIn
        </a>, 
        <a href="mailto:yuenethanw@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#969696] hover:text-[#fefeff] transition-colors underline">
          yuenethanw@gmail.com
        </a>
      ]
    }
  };

  export default function Home() {
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("intro");
    const [selectedAudience, setSelectedAudience] = useState<AudienceType>("anyone");
    const [isNameExpanded, setIsNameExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleHorizontalScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleHorizontalScroll);
        return () => container.removeEventListener('scroll', handleHorizontalScroll);
      }
    }, []);

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = sectionId === "intro" ? 0 : section.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        setIsMenuOpen(false);
      }
    };

    const remainingLetters = "than Yuen".split("");

    return (
      <div className={`${spaceGrotesk.className} bg-black text-[#fefeff] flex flex-col min-h-screen`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-screen w-screen flex items-center justify-end bg-black pr-4 md:pr-24"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-[12vw] md:text-[8vw] font-medium leading-none text-right md:pr-24"
                  animate={{
                    opacity: [1, 0],
                    y: [0, -20],
                    transition: { duration: 0.5, delay: 1.5 }
                  }}
                >
                  <span className="block">Ethan Yuen</span>
                  <span className="block">— Builder</span>
                </motion.h1>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-grow"
            >
              {/* Logo */}
              <motion.div 
                className="fixed top-8 left-4 md:left-8 z-50 cursor-pointer hidden md:flex"
                onHoverStart={() => setIsNameExpanded(true)}
                onHoverEnd={() => setIsNameExpanded(false)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative text-3xl font-medium flex">
                  <span>E</span>
                  <AnimatePresence>
                    {isNameExpanded && (
                      <div className="flex">
                        {remainingLetters.map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{
                              duration: 0.1,
                              delay: index * 0.02,
                              ease: "easeOut"
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <button 
                className="fixed top-8 right-4 z-50 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="space-y-2">
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="fixed inset-0 bg-black z-40 md:hidden pt-24 px-8"
                  >
                    {sections.map(({ id, title }) => (
                      <div key={id} className="mb-6">
                        <button
                          onClick={() => scrollToSection(id)}
                          className="text-2xl font-medium"
                        >
                          <span className={`${activeSection === id ? 'text-[#fefeff]' : 'text-[#969696]'}`}>
                            {title}
                          </span>
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Navigation */}
              <nav className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
                {sections.map(({ id, title }) => (
                  <div key={id} className="mb-4 text-left">
                    <button
                      onClick={() => scrollToSection(id)}
                      className="group flex items-center gap-2 text-sm"
                    >
                      <span className={`transition-all duration-300 ${
                        activeSection === id ? 'text-[#fefeff]' : 'text-[#969696]'
                      }`}>
                        {title}
                      </span>
                    </button>
                  </div>
                ))}
              </nav>

              {/* Main Content */}
              <main className="flex-grow">
                <section id="intro" className="min-h-[60vh] px-4 md:px-24 pt-24">
                  <div className="ml-12 md:ml-64">
                    {/* Header Navigation */}
                    <div className="relative md:static mb-8">
                      {/* Left and Right Gradient Overlays */}
                      <div
                        className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"
                        style={{
                          opacity: scrollPosition > 0 ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      ></div>
                      <div className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

                      {/* Scrollable Nav */}
                      <div
                        ref={scrollContainerRef}
                        className="flex gap-4 md:gap-8 justify-start text-sm overflow-x-auto scrollbar-hide pl-4 pr-4"
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch',
                        }}
                      >
                        {(['anyone', 'recruiters'] as AudienceType[]).map((audience) => (
                          <button
                            key={audience}
                            onClick={() => setSelectedAudience(audience)}
                            className={`transition-colors whitespace-nowrap flex-shrink-0 ${
                              selectedAudience === audience
                                ? 'text-[#fefeff] font-medium'
                                : 'text-[#969696] hover:text-[#fefeff]'
                            }`}
                          >
                            {audienceContent[audience].title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Intro Content */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedAudience}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="text-left text-3xl md:text-6xl text-[#fefeff] leading-tight mb-12 max-w-3xl">
                            {audienceContent[selectedAudience].description}
                          </p>
                          <div className="text-l flex gap-4 flex-wrap">
                            {audienceContent[selectedAudience].skills.map((skill, index) => (
                              <span key={index} className="text-sm text-[#969696]">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="px-4 md:px-24 pt-24 mr-12 md:mr-64">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex justify-end"
                >
                  {/* Right Side - Image */}
                  <div className="image">
                  <figure className="relative">
                    <Image
                      src="/ethan.JPG"
                      alt="Ethan Yuen"
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </figure>
                </div>
                </motion.div>
              </section>

                {/* About Section */}
                <section id="about" className="px-4 md:px-24 pt-24 pb-24">
                  <div className="ml-12 md:ml-64">

                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="max-w-5xl"
                    >
                      <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">about.</h2>
                      <div className="grid md:grid-cols-2 md:grid-rows-3 gap-8 ml-12 md:ml-24">
                        {/* Block 1: Row 1, Col 1 */}
                        <div className="md:row-start-1 md:col-start-2">
                          <div className="space-y-8">
                            <p className="text-base text-[#fefeff]">
                              Ethan is a passionate problem-solver, 
                              enjoys working with people, and has a strong reputation for rapid, sharp execution.
                              He is curious and acquires skills quickly, thriving in fast-paced environments. 
                              He currently works IT within the banking industry -- and takes every opportunity to learn something new.
                              He is knee-deep in personal finance/retirement planning and is currently full-stacking a minimalist & lean iOS app with Swift. 
                            </p>
                          </div>
                        </div>
  
                        {/* Block 2: Row 2, Col 2 */}
                        <div className="md:row-start-2 md:col-start-1">
                          <div className="space-y-8">
                            <p className="text-base text-[#fefeff]">
                              Ethan lives in New York City and tries to maximize time outside. He has no pets and would
                              love - should his landlord allow - to adopt one in the near future. 
                              In his free time he enjoys trying new food, watching an endless backlog of movies, and 
                              striking up conversation with people on the street. You can find also Ethan reading a good book, hanging out with friends & 
                              family, or discovering new music. He is always open to recommendations!
                            </p>
                          </div>
                        </div>
                        
                      </div>
  
                    </motion.div>
                    
                  </div>
                </section>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
