import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { pushGTMEvent } from "@/utils/gtm";
import { fetchPages, Page } from "@/services/cmsService";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const getPages = async () => {
      try {
        const data = await fetchPages({ status: "published", type: "page" });
        setPages(data);
      } catch (err) {
        console.error("Failed to fetch navbar pages:", err);
      }
    };

    window.addEventListener("scroll", handleScroll);
    getPages();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: "الرئيسية", slug: "" },
    ...pages.map(p => ({ title: p.title, slug: p.slug })),
    { title: "المدونة", slug: "blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="انطلاقة"
                className={`h-12 w-auto transition-all duration-300 ${!isScrolled ? 'invisible md:visible opacity-0 md:opacity-100' : 'visible opacity-100'
                  }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={`/${link.slug}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === `/${link.slug}` ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                    }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

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
                onClick={() => pushGTMEvent('cta_click', { button_name: 'احجز استشارتك المجانية', location: 'navbar' })}
                className="gradient-brand text-white px-6 py-2.5 rounded-full font-semibold shadow-soft hover:shadow-medium transition-all text-sm md:text-base whitespace-nowrap"
              >
                احجز استشارتك المجانية
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={`/${link.slug}`}
                  className={`text-lg font-medium py-2 transition-colors hover:text-primary ${location.pathname === `/${link.slug}` ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {link.title}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <a
                href="tel:966532759488+"
                className="text-lg font-medium text-muted-foreground flex items-center gap-2"
              >
                966532759488+
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

