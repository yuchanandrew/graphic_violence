import ContactCard from "../components/ContactCard";

const andrew_bio =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, culpa.";

const brett_bio =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, similique.";

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-6 mt-6">
        <h2 className="text-gray-300 text-2xl font-semibold">About Us</h2>
        <div className="grid grid-cols-2 gap-4 items-start">
          <ContactCard
            title="Andrew"
            description="Developer"
            image="/asian_man.jpeg"
            url_git=""
            url_ig=""
            url_email=""
            bio={andrew_bio}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
