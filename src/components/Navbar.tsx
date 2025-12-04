import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="انطلاقة"
              className={`h-12 w-auto transition-all duration-300 ${!isScrolled ? 'invisible md:visible opacity-0 md:opacity-100' : 'visible opacity-100'
                }`}
            />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="tel:+966532759488"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span>966532759488+</span>
            </a>

            <Link to="/form" onMouseEnter={prefetchForm} onFocus={prefetchForm} onTouchStart={prefetchForm}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-brand text-white px-6 py-2.5 rounded-full font-semibold shadow-soft hover:shadow-medium transition-all"
              >
                ابدأ الآن
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
