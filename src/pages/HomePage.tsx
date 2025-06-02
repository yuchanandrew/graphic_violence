import Top from "../components/Top";
import "../App.css";
import Card from "../components/Card";

function HomePage() {
  return (
    <>
      <div className="relative z-40">
        <Top />
      </div>
      <main className="flex-1 min-h-screen">
        <section className="flex flex-col items-center justify-center">
          <div className="flex bg-white w-8/11 rounded-xl gap-10 items-center justify-center min-h-[350px]">
            <div className="flex flex-col gap-6">
              <h2 className="text-5xl font-bold -translate-x-20">
                Lorem Ipsum
              </h2>
              <h2 className="text-5xl text-green-600 font-bold translate-x-5">
                Lorem Ipsum
              </h2>
            </div>
            <div className="flex translate-x-20">
              <Card
                title="Camo Tee"
                description="A placeholder t-shirt. Lorem Ipsum."
                image="/camo_placeholder.jpeg"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
