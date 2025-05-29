import { motion } from "framer-motion";
import ContactCard from "../components/ContactCard";

const andrew_bio =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae consectetur eligendi, itaque provident expedita est nemo facere voluptates exercitationem distinctio dolor sit nesciunt in error magni optio suscipit dignissimos consequatur!";
const brett_bio =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, inventore.";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut", damping: 25 }}
    >
      {/*About Us Section*/}
      <div className="flex flex-col justify-center items-center">
        <div className="w-2/3 flex flex-col p-2">
          <h2 className="text-2xl text-gray-200 font-semibold p-6">About Us</h2>
          <div className="grid grid-cols-2 gap-4 items-start min-h-[600px]">
            <ContactCard
              title="Andrew"
              description="Developer"
              image="/asian_man.jpeg"
              url_git=""
              url_ig=""
              url_email=""
              bio={andrew_bio}
            />
            <ContactCard
              title="Brett"
              description="Business"
              image="/man.jpeg"
              url_git=""
              url_ig=""
              url_email=""
              bio={brett_bio}
            />
          </div>
        </div>
      </div>

      {/*Feature Artists Section*/}
      <div
        className="bg-fixed w-full flex flex-col"
        style={{ backgroundImage: "url('/graffiti.jpeg')" }}
      >
        <h2 className="text-2xl font-semibold p-6">Featuring Artists</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 items-start min-h-[500px]">
          <ContactCard
            title="Brogan"
            description="Artist"
            image="/curly_man.jpeg"
            url_git=""
            url_ig=""
            url_email=""
            bio="Hi I'm Brogan."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
