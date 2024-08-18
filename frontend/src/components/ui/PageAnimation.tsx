import { AnimatePresence, motion, transform, Variants, Transition } from "framer-motion";
import { FC } from "react";


type AnimationWrapperProps = {
  children: React.ReactNode,
  keyValue?: string,
  initial?: Variants,
  animate?: Variants,
  transition?: Transition,
  className?: string
}

const AnimationWrapper: FC<AnimationWrapperProps> = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
