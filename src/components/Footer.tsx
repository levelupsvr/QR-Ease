import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative mt-auto overflow-hidden bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--popover))] to-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-muted dark:from-accent dark:via-background dark:to-accent py-10 px-6 border-t border-[#fddedf] dark:border-[#333]"
    >
      {/* Animated Floating Circles */}
      <div className="absolute -top-10 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-40 h-40 bg-accent dark:bg-ring rounded-full blur-3xl left-10"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          className="absolute w-32 h-32 bg-destructive rounded-full blur-2xl right-10 top-20"
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Author */}
        <div className="flex items-center gap-2 text-base text-muted dark:text-zinc-200">
          <span>Crafted with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="text-pink-500"
          >
            <Heart size={18} />
          </motion.span>
          <span>by</span>
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            className="bg-gradient-to-r from-fuchsia-500 to-red-400 bg-clip-text text-transparent font-bold"
          >
            LevelUpSvr
          </motion.a>
        </div>

        {/* Socials */}
        <div className="flex gap-6 mt-1 text-zinc-500 dark:text-zinc-300">
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/sivanandana-r-pillai-86b0822b3/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/_level_up_svr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Instagram size={20} />
          </motion.a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted dark:text-zinc-500 mt-2">
          © 2025 QREase · A simple, fun, and powerful QR code generator.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

