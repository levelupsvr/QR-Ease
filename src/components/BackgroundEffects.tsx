import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Animated blobs */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-[radial-gradient(hsl(var(--muted)/0.2),hsl(var(--background)/0.2))] rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-[radial-gradient(hsl(var(--primary)/0.15),hsl(var(--muted)/0.15))] rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-[radial-gradient(hsl(var(--accent)/0.1),hsl(var(--muted)/0.1))] rounded-full blur-2xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Soft radial layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,hsl(var(--background)/0.05),transparent)] opacity-50" />
    </div>
  );
};

export default BackgroundEffects;
