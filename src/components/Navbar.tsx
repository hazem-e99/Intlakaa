import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.png";
import { pushGTMEvent } from "@/utils/gtm";
import { fetchPages, Page } from "@/services/cmsService";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    const getPages = async () => {
      try {
        setPages(await fetchPages({ status: "published", type: "page" }));
      } catch {}
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    getPages();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  const navLinks = [
    { title: "الرئيسية", slug: "" },
    ...pages.map(p => ({ title: p.title, slug: p.slug })),
    { title: "المدونة", slug: "blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? "rgba(13,5,32,0.92)" : "rgba(13,5,32,0.5)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderBottom: `1px solid ${isScrolled ? "rgba(155,80,232,0.18)" : "rgba(255,255,255,0.04)"}`,
        boxShadow: isScrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <motion.img whileHover={{ scale: 1.06 }} src={logo} alt="انطلاقة" className="h-9 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === `/${link.slug}`;
              return (
                <Link
                  key={link.slug}
                  to={`/${link.slug}`}
                  className={`relative text-sm font-semibold py-1 transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/85"
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #9b50e8, #c084fc)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+966532759488"
              className="hidden md:flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5" />
              +966 532 759 488
            </a>

            <Link to="/form" onMouseEnter={prefetchForm} className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => pushGTMEvent("cta_click", { button_name: "احجز استشارتك المجانية", location: "navbar" })}
                className="px-6 py-2.5 rounded-full font-bold text-white text-sm shadow-lg whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #7c3aed, #9b50e8)" }}
              >
                احجز استشارتك المجانية
              </motion.button>
            </Link>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{ background: "rgba(13,5,32,0.98)", borderTop: "1px solid rgba(155,80,232,0.12)" }}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.slug}
                  to={`/${link.slug}`}
                  className={`text-base font-semibold py-3 px-4 rounded-xl transition-all ${
                    location.pathname === `/${link.slug}`
                      ? "text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                  style={
                    location.pathname === `/${link.slug}`
                      ? { background: "rgba(155,80,232,0.15)", border: "1px solid rgba(155,80,232,0.25)" }
                      : {}
                  }
                >
                  {link.title}
                </Link>
              ))}
              <div className="h-px my-2" style={{ background: "rgba(155,80,232,0.1)" }} />
              <a href="tel:+966532759488" className="text-sm text-white/35 px-4 py-2 flex items-center gap-2" dir="ltr">
                <Phone className="w-3.5 h-3.5" /> +966 532 759 488
              </a>
              <Link to="/form" onMouseEnter={prefetchForm}>
                <button
                  onClick={() => pushGTMEvent("cta_click", { button_name: "navbar_mobile_cta", location: "navbar_mobile" })}
                  className="w-full py-3.5 rounded-full font-black text-white text-base shadow-lg mt-2"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #9b50e8)" }}
                >
                  احجز استشارتك المجانية
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
