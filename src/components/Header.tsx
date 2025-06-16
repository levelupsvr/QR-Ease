import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 16 }}
      className="bg-[var(--background)] border-b-2 border-[var(--destructive)] p-4 dark:bg-raisin-black dark:border-rosy-brown relative z-20"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Animated gradient logo */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center font-extrabold text-2xl text-[var(--accent-foreground)] bg-gradient-to-br from-[var(--secondary)] via-[var(--primary)] to-[var(--destructive)] bg-[length:200%_200%]"
          >
            QR
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-silver-pink">
              QREase
            </h1>
            <p className="text-sm text-[var(--destructive)] dark:text-tan">
              Professional QR Code Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative flex items-center gap-2 px-5 py-2 rounded-xl
              bg-gradient-to-r from-primary to-accent text-primary-foreground
              font-semibold shadow-lg overflow-visible
              focus:ring-2 focus:ring-accent
              transition-all duration-200 group
              dark:bg-gradient-to-r dark:from-destructive dark:to-border dark:text-[hsl(var(--muted-foreground))]
              border-2 border-transparent
              before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-accent before:to-primary before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 before:z-0
            "
            style={{ zIndex: 1 }}
          >
            {/* Shimmer on hover */}
            <span className="absolute left-0 top-0 w-full h-full rounded-xl pointer-events-none overflow-hidden z-0 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="block h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
              />
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
