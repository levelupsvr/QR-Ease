import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
              scale: 1.08,
              boxShadow: '0 0 32px 8px rgba(216,96,114,0.25)',
            }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-secondary text-[hsl(var(--accent-foreground))] font-semibold shadow-lg overflow-visible focus:ring-2 focus:ring-accent transition-all duration-200"
            style={{ zIndex: 1 }}
          >
            <Github size={18} />
            <span className="hidden sm:inline drop-shadow-lg">View on GitHub</span>
            <ExternalLink size={15} />
            {/* Sparkles */}
            <span className="absolute -top-2 -left-2 animate-sparkle1 pointer-events-none">
              ✨
            </span>
            <span className="absolute -bottom-2 left-1/2 animate-sparkle2 pointer-events-none">
              ✨
            </span>
            <span className="absolute -top-3 right-2 animate-sparkle3 pointer-events-none">
              ✨
            </span>
            <span className="absolute bottom-0 right-0 animate-sparkle4 pointer-events-none">
              ✨
            </span>
          </motion.a>

          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
