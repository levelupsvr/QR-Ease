
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-raisin-black border-b-2 border-tan dark:border-rosy-brown p-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-tuscan-red to-rosy-brown flex items-center justify-center text-white font-bold text-xl">
            QR
          </div>
          <div>
            <h1 className="text-2xl font-bold text-raisin-black dark:text-silver-pink">
              QREase
            </h1>
            <p className="text-sm text-rosy-brown dark:text-tan">
              Professional QR Code Generator
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-tuscan-red text-white hover:bg-rosy-brown transition-colors"
          >
            <Github size={16} />
            <span className="hidden sm:inline">View on GitHub</span>
            <ExternalLink size={14} />
          </motion.a>
          
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
