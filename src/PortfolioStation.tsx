import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";

/**
 * PortfolioStation – PS‑style personal portfolio ribbon
 */
export default function PortfolioStation() {
  const projects = [
    {
      title: "UMacro – AI‑Powered Nutrition Scanner",
      href: "https://umacro.app",
      cover: "/images/umacro.jpg",
    },
    {
      title: "UBuddies – Campus Social Platform",
      href: "https://ubuddies.app",
      cover: "/images/ubuddies.jpg",
    },
    {
      title: "Crunch – Swipe‑to‑Order Food Prototype",
      href: "https://crunch-demo.vercel.app",
      cover: "/images/crunch.jpg",
    },
    {
      title: "LeaseIQ – CRE Analytics Dashboard",
      href: "/projects/leaseiq",
      cover: "/images/leaseiq.jpg",
    },
    {
      title: "PS4 Ribbon UI (this site)",
      href: "https://github.com/yourhandle/portfoliostation",
      cover: "/images/ps4.jpg",
    },
  ];

  const [active, setActive] = useState(0);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        setActive((i) =>
          e.key === "ArrowRight"
            ? (i + 1) % projects.length
            : (i - 1 + projects.length) % projects.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [projects.length]);

  useEffect(() => {
    const node = ribbonRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [active]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0e6cc4] text-white font-['Roboto_Condensed']">
      <AnimatePresence mode="wait">
        <motion.div
          key={projects[active].cover}
          className="pointer-events-none absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${projects[active].cover})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

      <header className="fixed top-0 left-0 z-50 flex h-12 w-full items-center gap-4 px-4 text-sm backdrop-blur-sm">
        <span className="font-semibold tracking-wide">PortfolioStation</span>
        <span className="ml-auto opacity-80" suppressHydrationWarning>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </header>

      <div
        ref={ribbonRef}
        className="relative z-10 mt-16 flex h-[13rem] w-full gap-6 overflow-x-auto px-8 pb-4 scrollbar-hide"
      >
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setActive(i)}
            className="flex-shrink-0 w-44 group focus:outline-none"
          >
            <Card
              className={`border-2 ${
                i === active ? "border-white" : "border-transparent"
              } bg-black/30 backdrop-blur-lg`}
            >
              <CardContent className="p-0 flex flex-col">
                <img src={p.cover} alt={p.title} className="h-32 w-full object-cover" />
                <div className="flex items-center justify-center h-10 bg-black/40 text-sm uppercase tracking-widest">
                  {i === active ? (
                    <>
                      <PlayIcon className="mr-1 h-4 w-4" /> Start
                    </>
                  ) : (
                    "▼"
                  )}
                </div>
              </CardContent>
            </Card>
            <p className="mt-2 text-center text-xs leading-tight group-hover:text-white/90">
              {p.title}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
