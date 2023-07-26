import { AnimatePresence, motion } from "framer-motion";

const BackdropBlur = ({ onClose, isOpen }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={isOpen ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }}
        exit={{ opacity: 0, visibility: "hidden" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        onClick={onClose}
        className="fixed z-40 inset-0 overflow-hidden bg-gradient-to-r from-black/80 backdrop-blur"
      />
    </AnimatePresence>
  );
};

export default BackdropBlur;
