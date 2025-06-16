
import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-raisin-black dark:bg-black text-silver-pink p-6 mt-auto"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span>Built with</span>
          <Heart size={16} className="text-tuscan-red" />
          <span>by</span>
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="font-semibold text-tuscan-red hover:text-rosy-brown transition-colors"
          >
            Siva SVR
          </motion.a>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <span>© 2025 QREase</span>
          <motion.a
            href="https://github.com/levelupsvr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 text-tan hover:text-silver-pink transition-colors"
          >
            <Github size={14} />
            @levelupsvr
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
