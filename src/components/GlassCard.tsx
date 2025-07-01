import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
  const Component = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Component
      className={cn(
        // Light mode styles (Cream card, dark text)
        "bg-popover text-[hsl(0, 0%, 15%)]", // Cream + dark text
        "backdrop-blur-md border border-[hsl(var(--muted)/0.2)]",
        "shadow-md shadow-[hsl(var(--primary)/0.07)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.12)]",

        // Dark mode styles (preserved)
        "dark:bg-raisin-black/10 dark:border-rosy-brown/20 dark:shadow-black/20 dark:text-silver-pink",

        // Shared styles with mobile optimizations
        "rounded-lg overflow-hidden transition-all duration-300 cursor-glow ripple",
        
        // Mobile optimizations
        "touch-manipulation", // Better touch response
        "active:scale-[0.98] active:shadow-sm", // Touch feedback
        "sm:active:scale-100", // Disable scale on larger screens
        "will-change-transform", // Optimize for animations
        
        // Mobile-specific hover states
        "sm:hover:shadow-lg sm:hover:shadow-[hsl(var(--primary)/0.12)]",
        "sm:dark:hover:shadow-black/30",
        
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default GlassCard;

