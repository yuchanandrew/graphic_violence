// import Card from "../components/Card";
import { motion } from "framer-motion";
import Collection from "../components/Collection";

const FeaturedPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", damping: 25 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col p-6 mt-2">
          <h2 className="text-2xl font-semibold text-gray-200">
            Featured Items
          </h2>
        </div>
        <div className="flex">
          <Collection />
        </div>
      </motion.div>
    </>
  );
};

export default FeaturedPage;
