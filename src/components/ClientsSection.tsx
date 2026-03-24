import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";

interface ClientVideo {
  id: number;
  src: string;
}

// List of available video IDs based on actual files
const clientVideos: ClientVideo[] = [1, 2, 3, 4, 6, 7, 13].map((id) => ({
  id,
  src: `/clients/${id}.mp4`,
}));

function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 768) setPerPage(1);
      else if (window.innerWidth <= 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

const ClientsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVideoSrc, setModalVideoSrc] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const perPage = usePerPage();
  const totalPages = Math.ceil(clientVideos.length / perPage);

  // Touch swipe state
  const touchStartX = useRef(0);
  const touchDiffX = useRef(0);

  const goNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  // Reset page on resize if out of bounds
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(Math.max(0, totalPages - 1));
  }, [totalPages, currentPage]);

  // Calculate translate offset
  const getTranslateX = () => {
    if (!trackRef.current || !trackRef.current.children[0]) return 0;
    const card = trackRef.current.children[0] as HTMLElement;
    const gap = 16;
    const cardWidth = card.offsetWidth + gap;
    return currentPage * cardWidth * perPage;
  };

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalVideoSrc(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalVideoSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalVideoSrc]);

  // Card width class based on perPage
  const cardFlexBasis =
    perPage === 1
      ? "flex-[0_0_88%]"
      : perPage === 2
        ? "flex-[0_0_calc((100%-16px)/2)]"
        : "flex-[0_0_calc((100%-32px)/3)]";

  return (
    <>
      <section className="py-20 px-4 bg-[#1a0540]" id="clients">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-[50px] h-[3px] bg-gradient-to-l from-[#9b50e8] to-[#6a2bc4] rounded-full mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.5] max-w-4xl mx-auto bg-gradient-to-bl from-white to-[#e0ccff] bg-clip-text text-transparent">
              آراء عملائنا
            </h2>
            <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
              استمع إلى تجارب عملائنا الحقيقية مع خدماتنا
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative mt-6">
            <div className="flex items-center gap-3">
              {/* Prev Button */}
              <button
                onClick={goPrev}
                className="hidden md:flex flex-shrink-0 w-11 h-11 items-center justify-center rounded-full bg-[#2b0862]/80 backdrop-blur-xl border border-[#9b50e8]/30 text-white hover:bg-[#9b50e8] transition-all"
                aria-label="السابق"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Track */}
              <div className="overflow-hidden flex-1 rounded-xl">
                <div
                  ref={trackRef}
                  className="flex gap-4 transition-transform duration-500"
                  style={{
                    transform: `translateX(${getTranslateX()}px)`,
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                  onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                    touchDiffX.current = 0;
                  }}
                  onTouchMove={(e) => {
                    touchDiffX.current =
                      e.touches[0].clientX - touchStartX.current;
                  }}
                  onTouchEnd={() => {
                    if (Math.abs(touchDiffX.current) > 40) {
                      if (touchDiffX.current > 0) goNext();
                      else goPrev();
                    }
                    touchDiffX.current = 0;
                  }}
                >
                  {clientVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={`${cardFlexBasis} bg-[#0a0a1a] border border-[#9b50e8]/20 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-[#9b50e8] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all group`}
                      onClick={() => setModalVideoSrc(video.src)}
                    >
                      {/* Video Thumbnail Container */}
                      <div className="relative w-full pt-[56.25%] flex-shrink-0 bg-[#0a0a1a]">
                        {/* Use video element as thumbnail - paused at first frame */}
                        <video
                          src={video.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                          onLoadedMetadata={(e) => {
                            // Seek to 0.5s to get a good thumbnail frame
                            (e.target as HTMLVideoElement).currentTime = 0.5;
                          }}
                        />
                        {/* Play Button */}
                        <button
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-600/85 rounded-2xl flex items-center justify-center z-[2] group-hover:scale-110 group-hover:bg-red-600 transition-all"
                          aria-label="تشغيل الفيديو"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalVideoSrc(video.src);
                          }}
                        >
                          <Play className="w-7 h-7 text-white fill-white ml-[-2px]" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={goNext}
                className="hidden md:flex flex-shrink-0 w-11 h-11 items-center justify-center rounded-full bg-[#2b0862]/80 backdrop-blur-xl border border-[#9b50e8]/30 text-white hover:bg-[#9b50e8] transition-all"
                aria-label="التالي"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage
                      ? "bg-[#9b50e8] scale-[1.3] shadow-[0_0_8px_rgba(155,80,232,0.6)]"
                      : "bg-[#9b50e8]/30"
                  }`}
                  aria-label={`صفحة ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {modalVideoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-5 bg-black/92"
            onClick={() => setModalVideoSrc(null)}
          >
            <div
              className="relative w-full max-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalVideoSrc(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/15 border border-white/30 rounded-full text-white text-xl flex items-center justify-center hover:bg-white/30 transition-colors z-[2]"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                ref={modalVideoRef}
                key={modalVideoSrc}
                src={modalVideoSrc}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                playsInline
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(ClientsSection);
