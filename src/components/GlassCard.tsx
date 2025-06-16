
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
        "backdrop-blur-md bg-white/10 dark:bg-raisin-black/10",
        "border border-white/20 dark:border-rosy-brown/20",
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
