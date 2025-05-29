import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut", damping: 25 }}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-gray-600 text-2xl font-semibold">Contact Page</h2>
      </div>
    </motion.div>
  );
};

export default ContactPage;
