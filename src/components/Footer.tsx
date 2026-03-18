import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchSeoSettings, type SocialLink, type ContactInfo } from "@/services/seoService";
import { ICON_MAP } from "@/pages/SEOManagement";

// ── Fallback data (shown before API responds or on error) ─────────────────────
const DEFAULT_CONTACT: ContactInfo[] = [
  { icon: "phone",    label: "اتصل بنا", text: "+966532759488",    href: "tel:+966532759488"           },
  { icon: "whatsapp", label: "راسلنا",   text: "واتساب",           href: "https://wa.me/966532759488"  },
  { icon: "email",    label: "البريد",   text: "info@antlaqa.com", href: "mailto:info@antlaqa.com"     },
];

const DEFAULT_SOCIAL: SocialLink[] = [
  { icon: "tiktok",   url: "https://www.tiktok.com/@qualified.leads.ksa", label: "TikTok"   },
  { icon: "facebook", url: "https://www.facebook.com/share/1Vv4xzKZyu",   label: "Facebook" },
  { icon: "linkedin", url: "https://www.linkedin.com/company/intlakaa/",   label: "LinkedIn" },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Footer = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(DEFAULT_CONTACT);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL);

  useEffect(() => {
    fetchSeoSettings()
      .then(data => {
        if (data.contactInfo?.length) setContactInfo(data.contactInfo);
        if (data.socialLinks?.length) setSocialLinks(data.socialLinks);
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  // Only render social links that have a URL
  const activeSocials = socialLinks.filter(l => l.url?.trim());
  // Only render contact cards that have an href
  const activeContacts = contactInfo.filter(c => c.href?.trim());

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">لنبدأ معًا رحلة النجاح</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            تواصل معنا الآن واحصل على استشارة مجانية لمشروعك
          </p>
        </motion.div>

        {/* Contact Cards — dynamic from backend */}
        {activeContacts.length > 0 && (
          <div className={`grid gap-6 max-w-5xl mx-auto mb-12 ${
            activeContacts.length === 1 ? "md:grid-cols-1 max-w-sm" :
            activeContacts.length === 2 ? "md:grid-cols-2 max-w-2xl" :
            "md:grid-cols-3"
          }`}>
            {activeContacts.map((contact, index) => {
              const meta = ICON_MAP[contact.icon] ?? ICON_MAP["globe"];
              const IconComp = meta.Icon;
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all border border-white/20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-all"
                    >
                      <IconComp className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-sm opacity-75 mb-1">{contact.label}</p>
                      <p className="text-lg font-semibold">{contact.text}</p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}

        {/* Social Media Icons — dynamic from backend */}
        {activeSocials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-6">تابعنا على</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {activeSocials.map((social, index) => {
                const meta = ICON_MAP[social.icon] ?? ICON_MAP["globe"];
                const IconComp = meta.Icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-all border border-white/20"
                    title={social.label}
                  >
                    <IconComp className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg opacity-75">
            © {new Date().getFullYear()} انطلاقة. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
