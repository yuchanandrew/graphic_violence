import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut", damping: 25 }}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-gray-200 text-2xl font-semibold p-6 mt-2">
          Have Something to Say?
        </h2>
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default ContactPage;
