import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // Uses root variables for light mode; dark styles preserved
      className="bg-[var(--background)] border-b-2 border-[var(--destructive)] p-4 dark:bg-raisin-black dark:border-rosy-brown"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--secondary)] to-[var(--destructive)] flex items-center justify-center text-[var(--accent-foreground)] font-bold text-xl">
            QR
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-silver-pink">
              QREase
            </h1>
            <p className="text-sm text-[var(--destructive)] dark:text-tan">
              Professional QR Code Generator
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 relative">
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.07,
              boxShadow: "0 4px 32px 0 rgba(216,96,114,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="
      relative flex items-center gap-2 px-5 py-2 rounded-xl
      bg-gradient-to-r from-primary to-accent text-primary-foreground
      font-semibold shadow-lg overflow-visible
      focus:ring-2 focus:ring-accent
      transition-all duration-200 group
      dark:bg-gradient-to-r dark:from-destructive dark:to-border dark:text-[hsl(var(--muted-foreground))]
    "
            style={{ zIndex: 1 }}
          >
            {/* Flowing Glow */}
            <span
              className="
        absolute -inset-1 rounded-xl
        bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30
        blur-lg opacity-70 group-hover:opacity-100 animate-glow pointer-events-none
        dark:from-[hsl(var(--muted)/0.3)] dark:via-[hsl(var(--primary)/0.2)] dark:to-[hsl(var(--muted)/0.3)]
      "
            ></span>
            {/* Sparkle SVG */}
            <span className="absolute left-2 top-1/2 -translate-y-1/2 animate-sparkle pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g filter="url(#sparkle)">
                  <path
                    d="M9 2L10.09 6.26L14 7.27L10.91 9.74L12 14L9 11.27L6 14L7.09 9.74L4 7.27L7.91 6.26L9 2Z"
                    fill="#D86072"
                  />
                </g>
                <defs>
                  <filter
                    id="sparkle"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                    filterUnits="userSpaceOnUse"
                  >
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </span>
            <Github size={18} className="relative z-10" />
            <span className="hidden sm:inline drop-shadow-lg relative z-10">
              View on GitHub
            </span>
            <ExternalLink size={15} className="relative z-10" />
          </motion.a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
