"use client";
  import { useEffect, useState, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Space_Grotesk } from "next/font/google";
  import Image from "next/image";
  import { FaBitcoin, FaWindows } from "react-icons/fa";
  import { FcLinux } from "react-icons/fc";
  import { TbWorld } from "react-icons/tb";
  import { FaXTwitter } from "react-icons/fa6";

  const spaceGrotesk = Space_Grotesk({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
  });

  const sections = [
    { id: "intro", title: "Intro" },
    { id: "about", title: "About" },
    { id: "contact", title: "Contact" }
  ];

  type AudienceType = 'anyone' | 'recruiters';

  const audienceContent = {
    anyone: {
      title: "For Anyone",
      description: (
        <>
          Hiya! I'm a creative and analytic who enjoys long walks, late night talks, and trying new things. Currently in NYC!
        </>
      ),
      skills: [""]
    },
    recruiters: {
      title: "Recruiters",
      description: (
        <>
          I'm a quick study and self-starter. Currently building minimal, efficient apps. I am actively searching for new roles.
        </>
      ),
      skills: [<a href="/Ethan Yuen - Resume.pdf" download className="hover:text-[#fefeff] transition-colors">Download Resume</a>]
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

    const handleLogoClick = () => {
      window.location.reload();
    };

    const remainingLetters = "than Yuen".split("");

    return (
      <div className={`${spaceGrotesk.className} bg-black text-[#fefeff] flex flex-col min-h-screen`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-screen w-screen flex items-center justify-center bg-black"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-[12vw] md:text-[8vw] font-medium leading-none"
                  animate={{
                    opacity: [1, 0],
                    y: [0, -20],
                    transition: { duration: 0.5, delay: 1.5 }
                  }}
                >
                  Ethan Yuen
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
                className="fixed top-8 left-4 md:left-8 z-50 cursor-pointer"
                onHoverStart={() => setIsNameExpanded(true)}
                onHoverEnd={() => setIsNameExpanded(false)}
                onClick={handleLogoClick}
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
                <section id="intro" className="min-h-screen px-4 md:px-24 pt-24">
                  <div className="ml-12 md:ml-64"> {/* Shift entire block to the right */}
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
                          <div className="flex gap-4 flex-wrap">
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

                {/* About Section */}
                <section id="about" className="min-h-screen px-4 md:px-24 py-8 md:py-16 md:ml-16">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl"
                  >
                    <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">about.</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-1 md:col-start-2">
                        <div className="space-y-8">
                          <p className="text-[#fefeff]">
                          Ethan is a curious and thoughtful person with an eye for detail. He picks up new skills quickly and thrives 
                          in fast-paced environments. He lives in New York City and maximizes his time spent outside. He has no pets and would
                          love -- should his landlord allow -- to adopt one in the near future.
                          </p>
                        </div>
                      </div>

                      <br />
                      
                      <div className="md:col-span-1 md:col-start-3 md:mt-32">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                            Ethan currently works IT within the banking industry. He is passionate about problem-solving, 
                            enjoys working with people, and has a reputation for reliability and efficiency. He's knee-deep into personal 
                            finance (and pairs-trading strategies!) and is currently full-stacking a minimalist and lean iOS app with Swift. 
                          </p>
                        </div>
                      </div>
                    </div>

                    <br />
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-1 md:col-start-2">
                        <div className="space-y-8">
                          <p className="text-[#fefeff]">
                            In his free time he enjoys trying new food, watching a seemingly endless list of movies, and 
                            striking up conversation with people on the streets. You can find him reading a good book, hanging out with friends & 
                            family, or discovering new music. He is always open to new recommendations!
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="md:px-24 md:ml-16 section contact">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="content grid md:grid-cols-2 gap-8"
                >
                  {/* Left Side - Text */}
                  <div className="text flex flex-col justify-between space-y-8">
                    <div className="content space-y-6">
                    <div className="look flex items-center gap-2 px-4">
                      <div className="dot w-2 h-2 rounded-full bg-[#fefeff] animate-ping" />
                      <div className="status text-[#969696] text-2xl">
                        <h3>Always looking for new opportunities.</h3>
                      </div>
                    </div>
                    </div>

                    <div className="actions grid grid-cols-2 sm:grid-cols-2 gap-8">
                      <div className="item">
                          <a
                            href="mailto:yuenethanw@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors underline"
                          >
                            yuenethanw@gmail.com
                          </a>
                        </div>
                        <div className="item">
                          <a
                            href="https://www.linkedin.com/in/ethan-yuen/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors underline"
                          >
                            LinkedIn
                          </a>
                        </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="image">
                  <figure className="relative">
                    <Image
                      src="/ethan.JPG"
                      alt="Ethan Yuen"
                      width={500}
                      height={500}
                      className="object-cover"
                      // className="w-full h-full object-cover"
                    />
                  </figure>
                </div>
                </motion.div>
              </section>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
