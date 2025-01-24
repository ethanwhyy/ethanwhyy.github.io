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
    { id: "work", title: "Projects" },
    { id: "background", title: "Work" },
    { id: "about", title: "About" },
    { id: "contact", title: "Contact" }
  ];

  const workProjects = [
    {
      title: "Pomodoro Timer",
      description: "A simple Pomodoro Timer to help curb distractions from my ADHD-riddled brain.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://iflysohigh.github.io/PomodoroTimer/",
      platforms: [
        { icon: TbWorld, color: "#4285F4" },
        // { icon: FaWindows, color: "#00A4EF" },
        // { icon: FcLinux }
      ]
    },
    {
      title: "Old Portfolio", 
      description: "Spotify-Based portfolio with information turnstiles. Also shows my favorite music!",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://iflysohigh.github.io/OldPortfolio/",
      platforms: [
        { icon: TbWorld, color: "#4285F4" },
        // { icon: FaBitcoin, color: "#F7931A" }
      ]
    },
    {
      title: "NY Housing Data", 
      description: "(School project) Create several data visualizations to better understand the NYC housing market.",
      tags: ["R Shiny", "HTML"],
      link: "https://iflysohigh.shinyapps.io/projectyuen/",
      platforms: [
        { icon: TbWorld, color: "#4285F4" },
        // { icon: FaBitcoin, color: "#F7931A" }
      ]
    },

    // {
    //   title: "Black Scholes", 
    //   description: "A quick & easy Black Scholes model, demonstrating my former desire of quant.",
    //   tags: ["HTML", "CSS", "JavaScript"],
    //   link: "https://iflysohigh.github.io/BlackScholes/",
    //   platforms: [
    //     { icon: TbWorld, color: "#4285F4" },
    //     // { icon: FaBitcoin, color: "#F7931A" }
    //   ]
    // },
  ];

  type AudienceType = 'anyone' | 'investors' | 'recruiters' | 'economists';

  const audienceContent = {
    anyone: {
      title: "For Anyone",
      description: (
        <>
          Hiya! I'm Ethan, an NYC-based entrepreneur & jack of all trades who loves long walks, late night talks, and caffeine.
        </>
      ),
      skills: [""]
    },
    investors: {
      title: "Investors/Founders",
      description: (
        <>
          I build fin-ed passion projects, aiming to help you unlock {" "}
          <span className="hover:text-[#37ab43] transition-colors cursor-default">financial freedom</span> without breaking the bank. 
        </>
      ),
      skills: [""]
    },
    recruiters: {
      title: "Recruiters",
      description: (
        <>
          I’m a quick study with a knack for finding creative solutions to recurring issues. I’m actively searching for new roles.
        </>
      ),
      skills: [<a href="/Ethan Yuen - Resume.pdf" download className="hover:text-[#fefeff] transition-colors">Download Resume</a>]
    },
    "economists": {
      title: "Economists",
      description: (
        <>
          I've written Economic papers on topics such as {" "}
          <a 
            href="/Effects of TCJA TCR on Shareholder Payouts.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-sky-500"
            style={{ display: "inline-flex"}}
          > thin-cap rates&#x2197;
          </a>,
          <a 
            href="/EV Tax Credit Impact on Stock Price.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-sky-500"
            style={{ display: "inline-flex"}}
          > EV tax credits&#x2197; 
          </a>, 
          <a 
            href="/Inflation Target impact on Inflation Rate.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-sky-500"
            style={{ display: "inline-flex"}}
          > inflation policies&#x2197;
          </a>,
          <br></br>
          and more!
        </>
      ),
      skills: [""]
    },
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
      }, 2500);
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

              {/* Header */}
              <header className="p-4 md:p-8 pt-24 md:pt-8">
                <div className="relative md:static mb-8">
                  <div 
                    className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"
                    style={{
                      opacity: scrollPosition > 0 ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  ></div>
                  <div className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 md:gap-8 justify-start md:justify-center text-sm overflow-x-auto scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {(['anyone', 'investors', 'recruiters', 'economists'] as AudienceType[]).map((audience) => (
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
              </header>

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
                <section id="intro" className="min-h-screen px-4 md:px-24">
                  <div className="pt-16 pb-8"> {/* Adjusted padding-bottom to 8 */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center max-w-7xl mx-auto"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedAudience}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="text-3xl md:text-6xl text-[#fefeff] leading-tight mb-12 max-w-3xl mx-auto">
                            {audienceContent[selectedAudience].description}
                          </p>
                          <div className="flex gap-4 flex-wrap justify-center">
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

                {/* Work Section */}
                <section id="work" className="min-h-screen px-4 md:px-24 py-8 md:py-32 md:ml-16"> {/* Adjusted padding-top to 8 */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl"
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 md:col-start-2">
                        <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">projects.</h2>
                        <div className="grid gap-8 md:gap-16 max-w-2xl">
                          {workProjects.map((project, index) => (
                            <motion.div
                              key={index}
                              className="group"
                              whileHover={{ y: -10 }}
                            >
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block p-4 md:p-8 border border-[#969696] rounded-lg hover:border-[#969696] transition-colors relative">
                                <h3 className="text-xl md:text-2xl font-medium mb-4">{project.title}</h3>
                                <p className="text-sm text-[#fefeff] mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-4">
                                  {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="text-sm text-[#969696]">{tag}</span>
                                  ))}
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                  {project.platforms.map((Platform, i) => (
                                    <Platform.icon 
                                      key={i} 
                                      className="text-xl"
                                      style={Platform.color ? { color: Platform.color } : {}}
                                    />
                                  ))}
                                </div>
                              </a>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Background Section */}
                <section id="background" className="min-h-screen px-4 md:px-24 py-16 md:py-32 md:ml-16">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl"
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 md:col-start-2">
                      <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">work.</h2>
                        <div className="relative w-48 h-40 flex-shrink-0 mb-4">
                          <Image
                            src="/smbc_logo_white.svg"
                            alt="Sumitomo Mitsui Banking Corp Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="space-y-4 max-w-2xl">
                          <p className="font-mono text-sm text-[#969696]">SUMITOMO MITSUI BANKING CORPORATION</p>
                          <h3 className="text-4xl font-medium text-[#fefeff]">Analyst, Information Systems</h3>
                          <p className="text-sm text-[#fefeff]">NOW &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New York, NY</p>
                          <p className="text-sm text-[#969696]">
                            I am currently working as part of the Desktop team.
                          </p>
                          {/* <p className="text-sm text-[#969696]">
                            Key achievements include implementing responsive designs, optimizing performance, and collaborating with cross-functional teams 
                            to deliver high-quality software solutions.
                          </p> */}
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="mt-16">
                        <div className="relative w-48 h-40 flex-shrink-0 mb-4">
                          <Image
                            src="/smbc_logo_white.svg"
                            alt="Sumitomo Mitsui Banking Corp Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                          <div className="space-y-4 max-w-2xl">
                            <p className="font-mono text-sm text-[#969696]">SUMITOMO MITSUI BANKING CORPORATION</p>
                            <h3 className="text-4xl font-medium text-[#fefeff]">Intern, Data Center Operations</h3>
                            <p className="text-sm text-[#fefeff]">2023 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New York, NY</p>
                            <p className="text-sm text-[#969696]">
                              I researched and onboarded several Data Center Infrastructure Management systems, ultimately
                              selecting the best solution based on SMBC criterium. I also developed several data governance and 
                              hardware reference designs to improve efficiency of IT Asset Management. 
                            </p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* About Section */}
                <section id="about" className="min-h-screen px-4 md:px-24 py-16 md:py-32 md:ml-16">
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
                          <p className="text-sm text-[#fefeff]">
                          I'm a lifelong learner and strategist with an eye for detail and the ability to quickly pick up skills.
                          I thrive in fast-paced environments. I try to engage in everything with a passion; failure provides me an opportunity to grow! 
                          </p>
                        </div>
                      </div>
                      
                      <div className="md:col-span-1 md:col-start-3 md:mt-32">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                          My skillset allows me to design solutions that align both company and individual objectives.
                          I want to build simple and effective products. Ones we can use
                           to save bandwidth, and spend more time chasing dreams.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <br /> */}
                    <br />
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-1 md:col-start-2">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                            In my free time I enjoy taking photos, trying new food, and 
                            talking to strangers on the streets of New York City. If I'm not exploring,
                            you can find me reading a good book or uncovering new music.
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-1 md:col-start-3 md:mt-32">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                            I want to encourage others to chase their dreams, be it a startup, writing a novel,
                            or traveling the world. Learn something new from everyone you meet! :)
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="min-h-screen px-4 md:px-24 py-16 md:py-32 md:ml-16">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl"
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 md:col-start-2">
                        <div className="space-y-8 max-w-2xl">
                          <Image
                            src="/ethan.JPG"
                            alt="Ethan Yuen"
                            width={500}
                            height={300}
                            className="mb-8"
                          />
                          <p className="text-xl md:text-xl text-[#fefeff] underline">yuenethanw@gmail.com</p>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <div className="w-2 h-2 bg-[#fefeff] rounded-full animate-pulse"></div>
                              <div className="absolute top-0 left-0 w-2 h-2 bg-[#fefeff] rounded-full animate-[ping_1.5s_ease-in-out_infinite] opacity-90"></div>
                            </div>
                            <p className="text-l text-[#969696]">Looking for new opportunities.</p>
                          </div>
                          <div className="flex gap-8 pt-8">
                          <a
                              href="mailto:yuenethanw@gmail.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm"
                            >
                              Email
                            </a>
                            <a
                              href="https://www.linkedin.com/in/ethan-yuen/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm"
                            >
                              LinkedIn
                            </a>
                            <a
                              href="https://github.com/iflysohigh/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm"
                            >
                              GitHub
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>
              </main>

              {/* Footer */}
              <footer className="px-4 md:px-24 py-8 text-[#969696] md:ml-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="text-sm text-center md:text-left">© 2025 Ethan Yuen.</span>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
