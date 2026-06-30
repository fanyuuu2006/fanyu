import { Variants } from "framer-motion";

export const fadeInItem: Variants = {
  hiddenBottom: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  hiddenTop: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  hiddenRight: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  hiddenLeft: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const staggerContainer: Variants = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
