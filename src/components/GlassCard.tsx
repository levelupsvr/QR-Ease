
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={cn(
        "backdrop-blur-md bg-white/20 dark:bg-raisin-black/10",
        "border border-pale-rosewood/30 dark:border-rosy-brown/20",
        "shadow-lg shadow-fairy-tale-pink/5 dark:shadow-black/20",
        "rounded-lg overflow-hidden",
        "hover:shadow-xl hover:shadow-fairy-tale-pink/10 transition-all duration-300",
        "cursor-glow ripple",
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
