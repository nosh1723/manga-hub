import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "block",
  width: ".3rem",
  height: ".3rem",
  backgroundColor: "#e5e7ea",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "3rem",
  height: "1rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
    duration: 0.5,
    repeat: Infinity, // Lặp lại vô hạn
    repeatType: "reverse" as "reverse", // Yoyo hiệu ứng (lặp lại qua lại)
    ease: "easeInOut"
};

export default function Loading() {
  return (
    <div className="flex items-end justify-center w-full">
        <span>Loading</span>
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}
