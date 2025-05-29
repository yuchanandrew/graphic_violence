import { motion } from "framer-motion";
import { useState } from "react";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";

interface ContactCardProps {
  title: string;
  description: string;
  image: string;
  url_git: string;
  url_ig: string;
  url_email: string;
  bio: string;
}

function ContactCard(props: ContactCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="flex flex-col space-y-4 items-center justify-center bg-white rounded-xl w-full shadow-lg p-4 transition-all transform hover:scale-105 hover:-translate-y-1"
    >
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-auto object-cover rounded-md"
      />
      <motion.h2 className="text-lg text-gray-600 font-semibold mt-2">
        {props.title}
      </motion.h2>
      <motion.p className="text-gray-600 text-sm">{props.description}</motion.p>
      {isOpen && (
        <motion.div className="flex flex-col items-center justify-center space-y-6">
          <div>
            <p className="text-gray-600 text-left">{props.bio}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 justify-center items-center">
            <a href={props.url_git}>
              <AiOutlineGithub className="w-8 h-auto" />
            </a>
            <a href={props.url_ig}>
              <AiOutlineInstagram className="w-8 h-auto" />
            </a>
            <a href={props.url_email}>
              <AiOutlineMail className="w-8 h-auto" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ContactCard;
