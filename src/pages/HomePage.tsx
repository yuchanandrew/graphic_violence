import Top from "../components/Top";
import Card from "../components/Card";

import { motion } from "framer-motion";

function HomePage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", damping: 25 }}
      >
        <div className="relative z-40">
          <Top />
        </div>
        <main className="flex-1 min-h-screen mt-8">
          <section className="flex flex-col items-center justify-center">
            <div className="flex bg-white w-8/11 rounded-xl gap-10 items-center justify-center min-h-[350px]">
              <div className="flex flex-col gap-6">
                <h2 className="text-5xl font-bold">Lorem Ipsum</h2>
                <h2 className="text-5xl text-green-600 font-bold">
                  Lorem Ipsum
                </h2>
              </div>
              <div className="flex">
                <Card
                  id={1}
                  title="Camo Tee"
                  description="A placeholder t-shirt. Lorem Ipsum."
                  image="/camo_placeholder.jpeg"
                  price="$20.99"
                />
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </>
  );
}

export default HomePage;
